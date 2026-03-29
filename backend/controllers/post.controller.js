import Post from "../models/post.models.js";
import User from "../models/users.model.js";

export const activeCheck = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Server is running"
  });
};

export const createPost = async (req, res) => {
  const { token } = req.body;

  try {
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const post = new Post({
      userId: user._id,
      body: req.body.body,
      media: req.file ? req.file.filename : "",
      fileType: req.file ? req.file.mimetype.split("/")[1] : ""
    });

    await post.save();
    return res.status(200).json({ message: "Post Created" });

  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllPost = async (req, res) => {
  try {

    const posts = await Post.find().populate('userId', 'name username email profilePicture');
    return res.json({ posts });

  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

export const deletePost = async (req, res) => {

  const { token, post_id } = req.body;

  try {
    const user = await User.findOne({ token: token }).select(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const post = await Post.findOne({ _id: post_id });
    if (!post) {
      return res.status(404).json({ message: "Post not found!" });
    }

    if (post.userId.toString() !== user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await Post.deletePost({ _id: post_id });
    return res.json({ message: "Post Deleted !" });


  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }


}

export const commentPost = async (req, res) => {
  const { token, post_id, commentBody } = req.body;
  try {

    const user = await User.findOne({ token: token }).select(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    };

    const post = await Post.findOne({
      _id: post_id
    });
    if (!post) {
      return res.status(404).json({ message: "Post not found!" });
    }

    const comment = new Comment({
      userId: user._id,
      postId: post_id,
      comment: commentBody
    });
    await comment.save();
    return res.status(200).json({ message: "Comment Added" })

  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

export const get_comments_by_post = async (req, res) => {
  const { post_id } = req.body;

  try {
    const post = await Post.findById(post_id);
    if (!post) {
      return res.status(404).json({ message: "Post not Found!" });
    }

    const comments = await Comment.find({ postId: post_id });

    return res.json({ comments });

  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const delete_comment_by_user = async (req, res) => {
  const { token, comment_id } = req.body;
  try {

    const user = await User.findOne({ token: token }).select(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    };

    const comment = await Comment.findOne({ "_id": comment_id })
    if (!comment) {
      return res.status(404).json({ message: "Comment not found!" });
    }

    if (comment.userId.toString() !== user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized" })
    };

    await Comment.deleteOne({ "_id": comment_id });

    return res.json({ message: "Comment Delete!" })

  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const increment_likes = async (req, res) => {
  const { post_id } = req.body;
  try {
    const post = await Post.findOne({ _id: post_id });
    if (!post) {
      return res.status(404).json({ message: "Post not found." })
    }

    post.likes = post.likes + 1;
    await post.save();

    return res.json({ message: "Likes Incremented" })
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}