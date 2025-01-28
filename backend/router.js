import { Router } from "express";
import * as rh from "./request.handler.js"

const router = Router();

router.route("/adduser").post(rh.addUser)
router.route("/getuser").get(rh.getUser)
router.route("/deleteuser/:_id").delete(rh.deleteUser)
router.route("/updateuser/:_id").put(rh.updateUser)

export default router;