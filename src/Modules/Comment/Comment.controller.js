import { Router } from "express";
import {
    createBulkCommentsService,
    updateCommentService,
    findOrCreateCommentService,
    searchCommentsService,
    getNewestCommentsService,
    getCommentDetailsService,
} from "./Comment.services.js";

const router = Router();

router.post("/", createBulkCommentsService);
router.patch("/:commentId", updateCommentService);
router.post("/find-or-create", findOrCreateCommentService);
router.get("/search", searchCommentsService);
router.get("/newest/:postId", getNewestCommentsService);
router.get("/details/:id", getCommentDetailsService);

export default router;