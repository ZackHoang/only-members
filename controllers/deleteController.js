const { getAllPosts, deletePost } = require("../db/queries")

exports.deletePost = async (req, res, next) => {
    await deletePost(req.params.id);
    res.redirect("/home", {posts: await getAllPosts()});
}