import { Router } from "express";
import { downloadProfile, getAllUserProfile, getUserAndProfile, login, register, updateUserProfile, uploadProfilePicture, sendConnectionRequest, getMyConnectionRequests, getUserGotConnectionRequest, acceptUserConnectionRequest } from "../controllers/user.controller.js";
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
router.route("/get_user_and_profile").get(getUserAndProfile);
router.route("/update_profile_data").get(updateUserProfile);
router.route("/get_all_users").get(getAllUserProfile);
router.route("/download_resume").get(downloadProfile);
router.route("/send_connection_request").post(sendConnectionRequest);
router.route("/getConnectionRequests").get(getMyConnectionRequests);
router.route("/user_connection_request").get(getUserGotConnectionRequest);
router.route("/accept_connection_request").post(acceptUserConnectionRequest);

export default router; 