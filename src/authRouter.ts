import {Router} from 'express';
import { createNewUser, signin } from "./handlers/user";

const router = Router();

// TODO: add validations
router.post('/user', createNewUser)
router.post('/signin', signin)

export default router