import {Router} from 'express'
import { createLauncher, deleteByID, getAllLaunchers, getLauncherByID } from '../controllers/launchersControll.js'
import { verifyToken, allowRoles } from '../midleware/authMidleware.js'
const router = Router()

router.get('/:id',verifyToken, allowRoles("admin", "intelligence"), getLauncherByID)
router.get('/',verifyToken, allowRoles("admin", "intelligence", "airforce"), getAllLaunchers)
router.post('/',verifyToken, allowRoles("admin", "intelligence"), createLauncher)
router.delete('/:id',verifyToken, allowRoles("admin", "intelligence"), deleteByID)

export default router