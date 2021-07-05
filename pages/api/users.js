import User from "../../models/User"
import connectionDb from "../../utils/connectionDb"

connectionDb();

export default  (req, res) => {
    User.find().then((user)=>{
        res.status(200).json(user);
    })
  }
  
