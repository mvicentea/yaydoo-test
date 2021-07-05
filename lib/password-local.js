// import Local from 'passport-local'
const Strategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

import connectionDb from "../utils/connectionDb"
import User from '../models/User'
connectionDb();

export const localStrategy = new Strategy({usernameField: 'email'}, (email, password, done) => {
  // Match User
  User.findOne({email:email})
  .then(user =>{
      if(!user) done(new Error('That email is not registered'));
      // Match Password
      bcrypt.compare(password, user.password, (err, isMatch)=> {
          if(err) done(new Error(err))
    
          if(isMatch){
               done(null, user);
          }else{
              done(new Error('Password incorrect'));
          }
      });
  })
  .catch(error => done(error))
})
