const express = require("express");
const router = express.Router();
const {createNote,updateNote,deleteNote,getNote} = require("../controllers/notesController");
const {protect} = require("../middlewares/auth")
 


router.get("/",protect,getNote)
router.post("/create",protect,createNote);
router.put("/update/:id",protect,updateNote);
router.delete("/delete/:id",protect,deleteNote);


module.exports = router;