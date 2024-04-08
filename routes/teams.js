const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Users = require("../models/User");
const Teams = require('../models/Teams');


router.post('/', async (req, res) => {
    try {
      const { userIds } = req.body;
  
      const users = await Users.find({ id: { $in: userIds } });
      const lastTeam = await Teams.findOne().sort({ _id: -1 });

      console.log(lastTeam.id);

      let nextId;
      if (lastTeam) {
        // If there is a last team, increment its id by 1
        nextId = lastTeam.id + 1;
      } else {
        // If there are no teams, start the id from 1
        nextId = 1;
      }
      
      const newTeam = new Teams({
        users:users,
      });
  
      await newTeam.save();
  
      res.status(201).json(newTeam);
    } catch (error) {
      console.error('Error creating team:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
  
  module.exports = router;
  