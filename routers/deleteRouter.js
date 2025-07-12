const { Router } = require("express");
const { deletePost } = require("../controllers/deleteController");
const deleteRouter = Router();

deleteRouter.get("/:id", deletePost);

module.exports = deleteRouter;