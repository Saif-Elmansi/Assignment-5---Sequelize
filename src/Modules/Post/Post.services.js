import { Post } from "../../DB/models/post.model.js";
import { User } from "../../DB/models/user.model.js";
import { Comment } from "../../DB/models/comment.model.js";
import { sequelize } from "../../DB/connection.js";

// 1. Create new Post (using new instance and save)
export const createPostService = async (req, res) => {
    try {
        const { title, content, userId } = req.body;

        const post = new Post({ title, content, userId });
        await post.save();

        return res.status(201).json({ message: "Post created successfully." });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// 2. Delete a post by its id (Ensure only owner can delete)
export const deletePostService = async (req, res) => {
    try {
        const { postId } = req.params;
        const { userId } = req.body;

        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }

        if (post.userId !== Number(userId)) {
            return res
                .status(403)
                .json({ message: "You are not authorized to delete this post." });
        }

        // هنا هيمسح Soft Delete تلقائياً لأن paranoid: true شغالة
        await post.destroy();

        return res.status(200).json({ message: "Post deleted." });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// 3. Retrieve all posts with user details and comments
export const getPostsDetailsService = async (req, res) => {
    try {
        const posts = await Post.findAll({
            attributes: ["id", "title"],
            include: [
                {
                    model: User,
                    attributes: ["id", "name"],
                },
                {
                    model: Comment,
                    attributes: ["id", "content"],
                },
            ],
        });

        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// 4. Retrieve all posts and count comments
export const getPostsWithCommentCountService = async (req, res) => {
    try {
        const posts = await Post.findAll({
            attributes: [
                "id",
                "title",
                [
                    sequelize.fn("COUNT", sequelize.col("Comments.id")),
                    "commentCount",
                ],
            ],
            include: [
                {
                    model: Comment,
                    attributes: [],
                },
            ],
            group: ["Post.id"],
        });

        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};