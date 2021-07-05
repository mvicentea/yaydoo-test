import Product from "../../../models/Product"
import connectionDb from "../../../utils/connectionDb"
connectionDb();

export default  function (req, res) {
	try {
		const {name, price, quantity, available, sku, description, mediaUrl} = req.body;
		// validation passed
        Product.findOne({sku: sku}).then( product =>{
				if(product){
					return res.status(403).json('Product is already exits');
				}else{
					const newProduct = new Product({name, price, quantity, available, sku, description, mediaUrl});
                    
                    console.log("newProduct => ", newProduct);
                    newProduct.save().then(() => {
                        res.status(200).json('Product has been registered');
                    }).catch(err=>console.log(err));
                   
                }

            }); 
  } catch (error) {
    res.status(500).end(error.message)
  }
}
