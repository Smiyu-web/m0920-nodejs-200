const Product = require('../models/Products')

exports.getAddProducts = (req,res,next) => {
    res.render('add-product', {
        pageTitle: 'Add a product'
    })
}

exports.postAddProduct = (req,res,next) => {
    const product = new Product(req.body.name, addZeroes(req.body.price))
    product.save()
    res.redirect('/')
}

exports.getProducts = (req,res,next) => {
    //create our own callback process
    Product.fetchAll((fetchedProducts) => {
        console.log('fetched: ',fetchedProducts)
        res.render('shop', {
            pageTitle: 'Shop Page',
            products: fetchedProducts
        })
    })

    // res.render('shop', {
    //     pageTitle: 'Shop Page',
    //     //products object
    // })

    
}

exports.getOneProductById = (req,res,next) => {
    //get prodId then render
}


exports.deleteProduct = (req,res,next) => {
    ///get prodId then delete
}

function addZeroes(num) {
    const dec = num.split('.')[1]
    const len = dec && dec.length > 2 ? dec.length : 2
    return Number(num).toFixed(len)
}