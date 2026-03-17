import { Router } from "express"
import { createUser, deleteUser, getAllUsers, getUser, login, updateUser } from "../controllers/authControllers.js"
import { verifyAdmin, verifyToken } from "../midleware/authMidleware.js"

const router = Router()

router.post('/register/create',verifyToken, verifyAdmin, createUser)
router.put('/register/update', verifyToken, verifyAdmin, updateUser)
router.delete('/register/delete/:id', verifyToken,verifyAdmin, deleteUser)
router.post('/login', login)
router.get('/getuser', verifyToken, getUser)
router.get('/', getAllUsers)
export default router