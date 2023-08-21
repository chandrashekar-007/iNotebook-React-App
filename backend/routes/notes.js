const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchuser");
const { validationResult, body } = require("express-validator");
const Notes = require("../modules/Notes");

// Endpoint 1 - Fetching all the notes with 'GET' request-"/api/notes/fetchnotes"
router.get("/fetchnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal error occurred" });
  }
});

// Endpoint 2 - Adding the notes with 'GET' request-"/api/notes/addnotes"
router.post(
  "/addnotes",
  fetchUser,
  [
    body("title", "Please enter appropriate title").isLength({ min: 4 }),
    body("description", "Please enter appropriate description").isLength({
      min: 4
    })
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    try {
      // Using destructuring method
      const { title, description, tag } = req.body;
      // Creating a new note
      const notes = new Notes({
        title,
        description,
        tag,
        user: req.user.id
      });
      const data = await notes.save();
      res.json(data);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal error occurred" });
    }
  }
);

// Endpoint 3 - Updating the notes with 'PUT' request-"/api/notes/updatenotes"
router.put("/updatenotes/:id", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;

  // Create a newNote object
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }

  try {
    // Find the note needed to be updated and update it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      res.status(404).send("Not found");
    }
    if (note.user.toString() !== req.user.id) {
      res.status(401).send("Access Denied");
    }
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal error occurred" });
  }
});

// Endpoint 4 - Deleting the notes with 'DELETE' request-"/api/notes/deletenotes"
router.delete("/deletenotes/:id",fetchUser, async (req,res)=>{
  try {
    // Finding the notes with user id to be deleted
  let note = await Notes.findById(req.params.id);
  if(!note){
    res.status(404).send("Not Found");
  }
  if(note.user.toString() !== req.user.id){
    res.status(401).send('Access Denied');
  }
  
  // Deleting the notes
  note = await Notes.findByIdAndDelete(req.params.id);
  res.json("Notes deleted Successfully");
    
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal error occurred" });
  }
  
});

module.exports = router;
