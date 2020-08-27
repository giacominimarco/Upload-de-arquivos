const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("./config/multer");

const Post = require("./models/Post");

// Lista os posts
routes.get("/posts", async (req, res) => {
  const posts = await Post.find();

  return res.json(posts);
});

// cria um post
routes.post("/posts", multer(multerConfig).single("file"), async (req, res) => {
  const { 
    originalname: name, 
    size, 
    filename: key, 
    location: url = "" 
  } = req.file;

  const post = await Post.create({
    name,
    size,
    key,
    url
  });

  return res.json(post);
});

// deleta um post
routes.delete("/posts/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);

  await post.remove();

  return res.send();
});

module.exports = routes;