import { Router } from "express";
import RootHandler from "../Controllers/root.controller.js";

const router = Router();

router.route("/route").get(RootHandler)

export default router;