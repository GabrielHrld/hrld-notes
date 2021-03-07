const router = require("express").Router();
const connectMongo = require("connect-mongo");
const Note = require("../models/Note");
const {isAuthenticate} = require('../helpers/auth');

router.get("/notes/add", isAuthenticate,(req, res) => {
  res.render("notes/new-note.hbs");
});

router.post("/notes/new-note", isAuthenticate, async (req, res) => {
  const { title, description } = req.body;
  const errors = [];
  if (!title) {
    errors.push({ text: "Please write a Title" });
  }
  if (!description) {
    errors.push({ text: "Please write a Description" });
  }
  if (errors.length > 0) {
    res.render("notes/new-note", {
      errors,
      title,
      description,
    });
  } else {
    const newNote = new Note({ title, description });
    await newNote.save();
    req.flash('success_msg', 'Note added successfully')
    res.redirect("/notes");
  }
});

router.get("/notes", isAuthenticate, async (req, res) => {
  const notes = await Note.find().lean().sort({ date: "desc" });
  res.render("notes/all-notes.hbs", { notes });
});

router.get("/notes/edit/:id", isAuthenticate, async (req, res) => {
  const note = await Note.findById(req.params.id).lean();
  res.render("notes/edit-notes.hbs", { note });
});

router.put("/notes/edit-note/:id",isAuthenticate, async (req, res) => {
  const { title, description } = req.body;
  await Note.findByIdAndUpdate(req.params.id, { title, description });
  req.flash('success_msg', 'Note updated successfully')
  res.redirect("/notes");
});

router.delete("/notes/delete/:id", isAuthenticate, async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Note deleted successfully')

  res.redirect("/notes");
});

module.exports = router;
