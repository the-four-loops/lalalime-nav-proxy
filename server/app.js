const express = require('express');
const proxy = require('http-proxy-middleware');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const port = 3000;

const navbar = proxy({
  target: 'http://localhost:3001'
});

const mainProduct = proxy({
  target: 'http://localhost:3002'
});

const similarProducts = proxy({
  target: 'http://localhost:3003'
});

const reviews = proxy({
  target: 'http://localhost:3004'
});

// const options = {
//   target: 'http://localhost:3000', 
//   router: {
//     'navbar' : 'http://localhost:3001',
//     'main-product' : 'http://localhost:3002',
//     'similar-products' : 'http://localhost:3003',
//     'reviews' : 'http://localhost:3004'
//   }
// };

const app = express();
// const apiProxy = proxy(options);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
// app.use(
//   '/',
//   proxy({ target: 'http://localhost:3000/' })
// );
// app.use('/', apiProxy); 
app.use('/api/search', navbar);
  // app.use('/main-product', mainProduct);
  // app.use('/similar-products', similarProducts);
  // app.use('/reviews', reviews);
app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(port, () => console.log(`app is listening on port ${port}`));