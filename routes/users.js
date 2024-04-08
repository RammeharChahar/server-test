const express = require("express");
const router = express.Router();
const Users = require("../models/User");
const Teams = require('../models/Teams');

// Get all users
router.get("/", async (req, res) => {
  try {
    const posts = await Users.find({});
    res.send(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});


router.get("/search", async (req, res) => {
  let string = req.query.string;
  try {
    const query = { first_name: { $regex: string, $options: 'i' } };
    const users = await Users.find(query).exec();
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/filter", async (req, res) => {
  try {
    // Extract query parameters
    const {domain} = req.query;
    const users = await Users.find({domain}).exec();
    res.send(users);

    // Construct the filter object based on provided query parameters
    // const filter = {};
    // if (domain) filter.domain = domain;
    // if (gender) filter.gender = gender;
    // if (available) filter.available = available === 'true';

    // // Find users from the database based on the constructed filter
    // const users = await Users.find(filter).exec();
    // res.send(users);
  } catch (err) {
    console.error('Error filtering users:', err);
    res.status(500).json({ message: "Server Error" });
  }
});

// router.get("/:id", async (req, res) => {
//   var id = req.params.id;
//   try {
//     const posts = await Users.findOne({ id: id });
//     res.send(posts);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server Error" });
//   }
// });


router.post("/", async (req, res) => {
  const { id, firstName, lastName, email, gender, domain, available } =
    req.body;
  try {
    const newPost = new Users({
      id: id,
      first_name: firstName,
      last_name: lastName,
      email: email,
      gender: gender,
      domain: domain,
      available: available,
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  res.end();
  // try {
  //   const posts = await Users.findOneAndDelete({ id: id });
  //   res.json({message:`Successfully deleted user with ID ${id}`});
  // } catch (err) {
  //   console.error(err);
  //   res.status(500).json({ message: "Server Error" });
  // }
});
router.post('/api/team', async (req, res) => {
  console.log("hii");
  try {
    const {userIds } = req.body;
    // Fetch users based on the received user IDs
    const users = await Users.find({ id: { $in: userIds } });

    console.log(users);
    res.end();

    // Create a new team with the provided name and users array
    const newTeam = new Teams({
      id: Users.length+1,
      users: users.map(user => user._id), // Save only the user IDs in the team
    });

    // Save the new team to the database
    await newTeam.save();

    res.status(201).json(newTeam);
  } catch (error) {
    console.error('Error creating team:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = router;
