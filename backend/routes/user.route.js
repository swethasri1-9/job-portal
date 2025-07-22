import express from "express";
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload, multiUpload } from "../middlewares/mutler.js"; // ✅ Add this

const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.post("/profile/update", multiUpload, isAuthenticated, updateProfile);
router.get("/me", isAuthenticated, async (req, res) => {
  const user = await User.findById(req.id);
  res.status(200).json({ success: true, user });
});

export default router;

