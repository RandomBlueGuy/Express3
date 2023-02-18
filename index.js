const express= require('express');
const app = express();
const port= 8080;
const about= require('./about.json')
let apiProducts= require('./api-products.json');
////////////////////////
//MORGAN STUFF
const morgan = require('morgan');
app.use(morgan('tiny'));
app.use(express.json());
////////////////////////
app.get('/api/products', (req, res) => {
    res.status(200).json(apiProducts)
});

app.get('/info', (req, res) => {
    const date=new Date();
    res.send(`<h2>Our Store has info for ${apiProducts.length} products</h2>
    <h2>${date}</h2>
    `);
});

app.get('/about', (req, res) => {
  res.status(200).json(about);
});

app.get('/api/products/:apiProducts', (req, res) => {
  const productId = req.params.apiProducts;

  const result = apiProducts.find((product) => {
    return product.id == productId
  })
  if (result !== undefined) {
    res.status(200).json(result);
  } else {
    res.status(404).send(
      `<h1>ERROR 404 Product doesn't exist!</h1>`    
    );
  }
});

app.delete('/api/products/:apiProducts', (req, res) => {
  const productId = Number(req.params.apiProducts);
  apiProducts = apiProducts.filter(product => product.id !== productId);
  res.status(200).send(apiProducts);

});


app.post('/api/products', (req, res) => {
    req.body.id = Number((Math.random() * 10000).toFixed(0));
    let idFound = false;
    /*
    if (apiProducts.map(item => item.id === req.body.id)){
      console.log(`There's another product with the same id`);
      idFound = true;
    }*/
    if(!req.body.title){
      console.log(`NewProduct has no TITLE`);
    } 
    if (!req.body.price) {
      console.log(`NewProduct has no PRICE`) 
    } 
    if (req.body.title && req.body.price && idFound === false){
      apiProducts.push(req.body)
    }
  res.status(200).json(apiProducts)
});

//conditions: title / price / already exist
//check with a for

app.listen(port, () => console.log(`Listening on Port ${port}`));