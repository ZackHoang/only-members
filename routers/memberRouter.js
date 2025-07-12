const { Router } = require("express");
const { displayMemberForm, validateMember } = require("../controllers/memberController");
const memberRouter = Router();

memberRouter.get("/", displayMemberForm);
memberRouter.post("/", validateMember);

module.exports = memberRouter;