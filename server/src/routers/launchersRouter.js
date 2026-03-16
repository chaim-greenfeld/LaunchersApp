import {Router} from 'express'
import { createLauncher, deleteByID, getAllLaunchers, getLauncherByID } from '../controllers/launchersControll.js'

const router = Router()

router.get('/:id', getLauncherByID)
router.get('/', getAllLaunchers)
router.post('/', createLauncher)
router.delete('/:id', deleteByID)

export default router