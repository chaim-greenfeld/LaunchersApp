import { ObjectId } from "mongodb"


export async function getAllLaunchers(req, res) {
    try {

        const collection = req.mongoConn.collection('launcher')
        const launchers = await collection.find().toArray()
        if (launchers.length === 0) {
            return res.status(200).json({ msg: "not data in launchers"})
        }
        return res.status(200).json({ msg: "success", launchers: launchers })
    } catch (err) {
        return res.status(500).json({err: err.message})
    }

}

export async function getLauncherByID(req, res) {
    const collection = req.mongoConn.collection('launcher')
    const { id } = req.params
    try {
        if (!ObjectId.isValid(id)) {
            throw new Error('Invalid ObjectId format')
        }
        const launcher = await collection.findOne({ _id: new ObjectId(id) })
        if (!launcher) {
            return res.status(401).json({ msg: "not exist" })
        }
        return res.status(200).json({ msg: "exist", launcher })
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

export async function createLauncher(req, res) {
    try{

        const collection = req.mongoConn.collection('launcher')
        const { city, rocketType, latitude, longitude, name } = req.body
        if (!city || !rocketType || !latitude || !longitude || !name) {
            return res.status(401).json({msg: "one of parameters is not found"})
        }
        if(latitude <=0 || longitude<=0){
            return res.status(401).json({msg: "Both must be a number and greater than zero."})
        }
        const result = await collection.insertOne({
            city,
            rocketType,
            latitude: Number(latitude),
            longitude: Number(longitude),
            name
        })
        return res.status(201).json({msg: "created success", resultID: result.insertedId})
    }catch(err){
         return res.status(500).json({err: err.message})
    }
}

export async function deleteByID(req, res) {
    const collection = req.mongoConn.collection('launcher')
    const { id } = req.params
    try{
        if (!ObjectId.isValid(id)) {
            throw new Error('Invalid ObjectId format')
        }
        const launcher = await collection.findOne({ _id: new ObjectId(id) })
        if (!launcher) {
            return res.status(401).json({ msg: "not exist" })
        }
        const result = await collection.deleteOne({_id: new ObjectId(id)})
        return res.status(200).json({ msg: "deleted", launcher, count: result.deletedCount })
    }catch(err){
         return res.status(500).json({err: err.message})
    }
}