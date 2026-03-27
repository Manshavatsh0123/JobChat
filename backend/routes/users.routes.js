import { Router } from "express";
import { login, register, uploadProfilePicture } from "../controllers/user.controller.js";
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

export default router;