import { Op } from "sequelize";
import { Comment } from "../../DB/models/comment.model.js";
import { User } from "../../DB/models/user.model.js";
import { Post } from "../../DB/models/post.model.js";

export const createBulkCommentsService = async (req, res) => {
  try {
    const commentsData = req.body.comments || req.body;

    await Comment.bulkCreate(commentsData);

    return res.status(201).json({ message: "comments created." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateCommentService = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { userId, content } = req.body;

    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({ message: "comment not found." });
    }

    if (comment.userId !== Number(userId)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this comment" });
    }

    comment.content = content;
    await comment.save();

    return res.status(200).json({ message: "Comment updated." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const findOrCreateCommentService = async (req, res) => {
  try {
    const { postId, userId, content } = req.body;

    const [comment, created] = await Comment.findOrCreate({
      where: { postId, userId, content },
      defaults: { postId, userId, content },
    });

    return res.status(200).json({ comment, created });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const searchCommentsService = async (req, res) => {
  try {
    const { word } = req.query;

    const { count, rows: comments } = await Comment.findAndCountAll({
      where: {
        content: {
          [Op.like]: `%${word}%`,
        },
      },
    });

    if (count === 0) {
      return res.status(404).json({ message: "no comments found." });
    }

    return res.status(200).json({ count, comments });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getNewestCommentsService = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.findAll({
      where: { postId },
      order: [["createdAt", "DESC"]],
      limit: 3,
    });

    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCommentDetailsService = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findByPk(id, {
      attributes: ["content"],
      include: [
        {
          model: User,
          attributes: ["name", "email"],
        },
        {
          model: Post,
          attributes: ["title", "content"],
        },
      ],
    });

    if (!comment) {
      return res.status(404).json({ message: "no comment found" });
    }

    return res.status(200).json(comment);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};