import connectionDb from "../../utils/connectionDb"
import User from '../../models/User'
const bcrypt = require('bcryptjs')
connectionDb();

export default  function signup(req, res) {
	try {
		const {name, lastName, email, password} = req.body;
		// validation passed
			User.findOne({email: email}).then( user =>{
				if(user){
					return res.status(403).json('Email is already resgistered');
				}else{
					// password hash
					const userRegister = new User({name, lastName, email, password});
					bcrypt.genSalt(10, (err, salt) => 
					bcrypt.hash(userRegister.password, salt, (err, hash)=>{
						if(err) throw err;
						// set password to hash
						userRegister.password = hash;
						// save user
						userRegister.save().then(user => {
								res.status(200).json('Registered');
						}).catch(err=>console.log(err));
				})); 
				res.status(200).send({ done: true })
			}

			});
  } catch (error) {
    res.status(500).end(error.message)
  }
}
