import User from "../../../models/User"
import connectionDb from "../../../utils/connectionDb"

const bcrypt = require('bcryptjs')
connectionDb();

export default async (req, res) => {
    switch (req.method) {
        case 'GET': getUser(req, res);
          break;
        case "DELETE": deleteUser(req, res);
          break;
        case "PUT": updateUser(req, res);
          break;
      }
}

const getUser = async (req, res)  => {
    const {pid} = req.query;
    const user = await User.findOne({_id:pid});
    res.status(200).json(user);
}

const deleteUser = async (req, res)  => {
    const {pid} = req.query;
    const user = await User.findByIdAndDelete({_id:pid});
    res.status(200).json(user);
}

const updateUser = async (req, res)  => {
    const {pid} = req.query;
    let data = req.body;

    console.log("req.body", req.body);


    /*const user = await User.findByIdAndUpdate(pid, req.body);
    res.status(200).json(user);*/

    // password hash
    bcrypt.genSalt(10, (err, salt) => 
    bcrypt.hash(data.password, salt, async (err, hash) =>{
        if(err) throw err;
        // set password to hash
        data.password = hash;
        console.log("data => ", data);
        const user = await User.findByIdAndUpdate(pid, data);
        res.status(200).json(user);
})); 
}

