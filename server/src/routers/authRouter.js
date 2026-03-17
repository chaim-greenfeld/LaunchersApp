import { Router } from "express"
import { createUser, deleteUser, getAllUsers, getUser, login, updateUser } from "../controllers/authControllers.js"
import { allowRoles, verifyToken } from "../midleware/authMidleware.js"

const router = Router()

router.post('/register/create',verifyToken, allowRoles("admin"), createUser)
router.put('/register/update', verifyToken, allowRoles("admin"), updateUser)
router.delete('/register/delete/:id', verifyToken,allowRoles("admin"), deleteUser)
router.post('/login', login)
router.get('/getuser', verifyToken, getUser)


router.get('/getall', verifyToken, allowRoles("admin"), getAllUsers)
export default router