const Note = require("../models/notesModel");
const asyncHandler = require("express-async-handler");

const createNote = asyncHandler (async (req,res) => {
 
    
    if(!req.body.tittle){
        res.status(400);
        throw new Error("please enter all the fields");
    }
    const {tittle,desc,text} = req.body;
    const note = await Note.create({
        tittle,
        desc,
        text,
        user:req.user.id,
    });
    res.status(201).send(note)
});
const getNote = asyncHandler(async(req,res) => {
    const note = await Note.find({user:req.user.id});
    res.status(200).send(note)
});
const updateNote = asyncHandler (async(req,res) => {
    const note = await Note.findById(req.params.id);
    if(!note){
        res.status(400);
        throw new Error("note not found")
    }
    if(!req.user){
        res.status(401);
        throw new Error("User not found")
    }
    if(note.user.toString() !== req.user.id){
        res.status(401);
        throw new Error("User not authorized")
    }
    const updateNote = await Note.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(200).send(updateNote)
});
const deleteNote = asyncHandler(async(req,res) => {
    const note = await Note.findById(req.params.id);
    if(!note){
        res.status(400);
        throw new Error("note not found")
    }
    if(!req.user){
        res.status(401);
        throw new Error("User not found")
    }
    if(note.user.toString() !== req.user.id){
        res.status(401);
        throw new Error("User not authorized")
    }
    const deletedNote = await Note.deleteOne({_id:req.params.id});
    res.status(200).send({id:req.params.id})
})

module.exports = {createNote,updateNote,deleteNote,getNote}