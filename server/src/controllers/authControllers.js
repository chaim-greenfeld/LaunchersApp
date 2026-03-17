import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { ObjectId } from 'mongodb'
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET

export async function login(req, res) {
    try {
        console.log("BODY:", req.body);
        const { username, password } = req.body
        if (!username || !password) {
            return res.status(422).json({ msg: "one of params is empty" })
        }
        const userCollection = req.mongoConn.collection('users')
        const user = await userCollection.findOne({ username })
        if (!user) {
            return res.status(401).json({ msg: "user is not found" })
        }
        await userCollection.updateOne(
            { username },
            { $set: { last_login: new Date() } }
        )
        const token = jwt.sign({
            id: user._id,
            username,
            email: user.email,
            user_type: user.user_type,
            last_login: user.last_login
        }, JWT_SECRET, { expiresIn: "10m" })

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 10
        })
        return res.status(200).json({ msg: "login success", user })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }

}

export async function createUser(req, res) {
    try {
        const { username, password, email, user_type } = req.body
        if (!username || !password || !email || !user_type) {
            return res.status(422).json({ msg: "one of params is empty" })
        }

        const userCollection = req.mongoConn.collection('users')
        const user = await userCollection.findOne({ username })
        if (user) {
            return res.status(401).json({ msg: "user is exist" })
        }
        const type_exist = await userCollection.findOne({ user_type })
        if (type_exist) {
            return res.status(401).json({ msg: "user_type is exist" })
        }
        const result = await userCollection.insertOne({
            username,
            password,
            email,
            user_type,
            last_login: null
        })
        console.log(result)
        return res.status(201).json({ msg: "created successfuly" })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export async function updateUser(req, res) {
    try {

        const allowedFields = ["username", "passsword", "email", "user_type"]
        const isValid = Object.keys(req.body).some(key => allowedFields.includes(key))
        if (!isValid || !req.body.username) {
            return res.status(422).json({ msg: "bad request" })
        }
        const userCollection = req.mongoConn.collection('users')
        const result = await userCollection.updateOne(
            { username: req.body.username },
            { $set: req.body }
        )
        return res.json({ msg: result.modifiedCount })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }

}

export async function deleteUser(req, res) {
    try {

        const { id } = req.params
        const userCollection = req.mongoConn.collection('users')
        const result = await userCollection.deleteOne({ _id: new ObjectId(id) })

        if (!result.deletedCount === 0) {
            return res.status(422).json({ msg: "id is not found" })
        }
        return res.status(200).json({ msg: `${result.deletedCount}, is deleted ` })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export async function getUser(req, res) {
    try {

        const username = req.user.username
        const userCollection = req.mongoConn.collection('users')
        const user = await userCollection.findOne({ username })
        if (!user) {
            res.clearCookie("token")
            return res.status(403).json({ msg: "no authorized" })
        }
        return res.json(user)
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export async function getAllUsers(req, res) {
    try {

        const collection = req.mongoConn.collection('users')
        const users = await collection.find().toArray()
        if (users.length === 0) {
            return res.status(200).json({ msg: "not data in users" })
        }
        return res.status(200).json({ msg: "success", users: users })
    } catch (err) {
        return res.status(500).json({ err: err.message })
    }

}