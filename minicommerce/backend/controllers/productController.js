const productModel =require('../models/productModel')

// get products api -/api/v1/product
exports.getProducts = async (req, res ,next) => {
    const query=req.query.keyword?{ name :{
    $regex : req.query.keyword,
    $options: 'i'
 }}: {}
   const products=await productModel.find(query);
    res.json({
        sucess: true,
        products
    })
}
// get products api -/api/v1/product/:id  
exports.getSingleProducts = async (req, res ,next) => {
    try{
   const product=await productModel.findById(req.params.id);
    res.json({
        sucess: true,
        product
    })
}catch(error){
    res.status(404).json({
        sucess: false,
        message: 'Unable to grt Product with that ID'
    })
}
}