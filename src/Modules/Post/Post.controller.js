import { Router } from "express";
import {
  createPostService,
  deletePostService,
  getPostsDetailsService,
  getPostsWithCommentCountService,
} from "./Post.services.js";

const router = Router();

router.post("/", createPostService);
router.delete("/:postId", deletePostService);
router.get("/details", getPostsDetailsService);
router.get("/comment-count", getPostsWithCommentCountService);

export default router;