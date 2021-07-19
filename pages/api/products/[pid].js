import Product from "../../../models/Product"
import connectionDb from "../../../utils/connectionDb"
connectionDb();

export default async (req, res) => {
    switch (req.method) {
        case 'GET': getProduct(req, res);
          break;
        case "DELETE": deleteProduct(req, res);
          break;
        case "PUT": updateProduct(req, res);
          break;
      }
}

const getProduct = async (req, res)  => {
    const {pid} = req.query;
    const product = await Product.findOne({_id:pid});
    res.status(200).json(product);
}

const deleteProduct = async (req, res)  => {
    const {pid} = req.query;
    const product = await Product.findByIdAndDelete({_id:pid});
    res.status(200).json(product);
}

const updateProduct = async (req, res)  => {
    const {pid} = req.query;
    const product = await Product.findByIdAndUpdate(pid, req.body);
    res.status(200).json(product);
}

