import {Router} from 'express'
const router = Router()
import * as UserController from '../controllers/usuarios.controller'
import { authJwt } from '../middlewares'
router.get('/', UserController.getUsers)

router.get("/:userId", UserController.getUserById);

router.post(
  "/",[authJwt.verifyToken,authJwt.isModerator],
  UserController.createUser
);

router.put(
  "/:userId",[authJwt.verifyToken,authJwt.isModerator],
  UserController.updateUserById
);

router.delete(
  "/:userId",[authJwt.verifyToken,authJwt.isModerator],
  UserController.deleteUserById
);

export default router