import { Router } from "express";
import usersController from "../controllers/users.controller";

const router = Router();

router.get("/", (req, res) => {
  usersController.getUsers(req, res);
});

router.get("/:id", usersController.getUser);
router.post("/create", usersController.createUser);
router.delete("/:id", usersController.deleteUser);
router.put("/:id", usersController.updateUser);

export default router;
