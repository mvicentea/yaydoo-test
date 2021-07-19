import Product from "../../../models/Product"
import connectionDb from "../../../utils/connectionDb"

connectionDb();

export default  (req, res) => {
    Product.find().then((products)=>{
        res.status(200).json(products);
    })
  }
  
