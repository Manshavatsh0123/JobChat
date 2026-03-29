import { Router } from "express";
import { activeCheck, commentPost, createPost, delete_comment_by_user, deletePost, get_comments_by_post, getAllPost, increment_likes } from "../controllers/post.controller.js";
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

router.route("/").get(activeCheck);
router.route("/post").post(upload.single('media'),createPost);
router.route("/posts").get(getAllPost);
router.route("/delete_post").post(deletePost);
router.route("/comment").post(commentPost);
router.route("/get_comment").get(get_comments_by_post);
router.route("/delete_comment").get(delete_comment_by_user);
router.route("/increment_post_like").post(increment_likes);

export default router;