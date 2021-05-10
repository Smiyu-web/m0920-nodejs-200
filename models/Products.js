const fs = require('fs')
const path = require('path')

const rootDirectory = require('../util/path')

const dataPath = path.join(__dirname, '..', 'data', 'Products.json')

module.exports = class Product{
  constructor(name, price){
    this.id = Math.random()
    this.name = name
    this.price = price
  }

  save(){
    fs.readFile(dataPath, (err, data) => {
      let tempProducts = []
      if(!err){
        tempProducts = JSON.parse(data)
      }

      tempProducts.push(this)
      fs.writeFile(dataPath, JSON.stringify(tempProducts, null, 2), err => {
        if(err) throw err
      })
    })
  }

  static fetchAll(callback) {
    //this is asynchronous
    fs.readFile(dataPath, (err, data) => {
      if(err){
        callback([])
      } else{
        callback(JSON.parse(data))
      }
    } )
  }

  //alternative way of fetching all
  static fetchAllSync() {
    return JSON.parse(fs.readFileSync(dataPath))
  }


}


// let products = [
//     {
//       id: 1,
//       name: "Book",
//       price: "4.00"
//     },
//     {
//       id: 2,
//       name: "Cup Noodles",
//       price: "1.00"
//     },
//     {
//       id: 3,
//       name: "Phone",
//       price: "50.00"
//     },
//   ];
  
//   module.exports = products;