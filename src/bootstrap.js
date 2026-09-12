import express from "express";
import { checkDB } from "./DB/connection.js";


import userRouter from "./Modules/User/User.controller.js";
import postRouter from "./Modules/Post/Post.controller.js";
import commentRouter from "./Modules/Comment/Comment.controller.js";

const bootstrap = async (app) => {
  // 1. Parsing Middleware
  app.use(express.json());

  // 2. فحص ومزامنة الداتابيز
  await checkDB();


  app.use("/users", userRouter);
  app.use("/posts", postRouter);
  app.use("/comments", commentRouter);

  app.use((req, res) => {
    res.status(404).json({ message: "Route Not Found" });
  });
};

export default bootstrap;