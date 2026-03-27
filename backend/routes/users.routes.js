import { Router } from "express";
import { getAllUserProfile, getUserAndProfile, login, register, updateUserProfile, uploadProfilePicture } from "../controllers/user.controller.js";
import multer from "multer";

const router = Router();

//  multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

router.post("/update_profile_picture", upload.single("profile_picture"), uploadProfilePicture);
router.post("/register", register);
router.post("/login", login);
router.route("/user_update").post(updateUserProfile);
//update bio
router.route("/get_user_and_profile").get(getUserAndProfile);
router.route("/update_profile_data").get(updateUserProfile);
router.route("/get_all_users").get(getAllUserProfile);


export default router;