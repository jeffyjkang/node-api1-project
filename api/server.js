// BUILD YOUR SERVER HERE
const express = require('express');
const { insert, find, findById, remove, update } = require('./users/model');

const server = express();
server.use(express.json());

server.get("/", (req,res) => {
  res.json({message: "hello world"})
})

server.post("/api/users", async (req,res) => {
  const { name, bio } = req.body
  if (!name || !bio) {
    return res.status(400).json({ message: "Please provide name and bio for the user" })
  }
  try {
    // throw new Error()
    const newUser = await insert({name, bio})
    res.status(201).json(newUser)
  }
  catch (err) {
    res.status(500).json({ message: "There was an error while saving the user to the database"})
  }
})

server.get("/api/users", async (req,res) => {
  try {
    // throw new Error()
    const users = await find()
    res.json(users)
  }
  catch (err) {
    res.status(500).json({ message: "The users information could not be retrieved"})
  }
})

server.get("/api/users/:id", async (req, res) => {
  const { id } = req.params
  try {
    const user = await findById(id)
    if (!user) {
      res.status(404).json({ message: "The user with the specified ID does not exist"})
    }
    else {
      // throw new Error()
      res.json(user)
    }
  }
  catch (err) {
    res.status(500).json({ message: "The user information could not be retrieved"})
  }
})

server.delete("/api/users/:id", async (req,res) => {
  const { id } = req.params
  try {
    const deletedUser = await remove(id)
    if (!deletedUser) {
      res.status(404).json({ message: "The user with the specified ID does not exists" })
    }
    else {
      // throw new Error()
      res.json(deletedUser)
    }
  }
  catch (err) {
    res.status(500).json( { message: "The user could not be removed" })
  }
})

server.put("/api/users/:id", async (req,res) => {
  const { id } = req.params
  const { name, bio } = req.body
  if (!name || !bio) {
    return res.status(400).json({ message: "Please provide name and bio for the user" })
  }
  try {
    const updatedUser = await update(id, { name, bio })
    if (!updatedUser) {
      res.status(404).json({ message: "The user with the specified ID does not exist"})
    }
    else {
      // throw new Error()
      res.json(updatedUser)
    }
  }
  catch (err) {
    res.status(500).json({ message: "The user information could not be modified" })
  }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}

