const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const app = express();
const server = http.createServer(app);
const cors = require('cors');
const mongoose = require('mongoose')
require('dotenv').config()
const productRoute = require('./routes/product-route')
// const brandRoute = require('./routes/brand-route')
const categoryRoute = require('./routes/category-route')
// const authRoute = require('./routes/auth-route')
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));



app.get('/', (req, res) => {
  // res.send('Hello, Express!');
});
app.use('/api/products' , productRoute)
// app.use('/api/brand' , brandRoute)
app.use('/api/category' , categoryRoute)
// app.use('/api/vendor' , vendorRoute)
// app.use('/api/auth' , authRoute)



const PORT = process.env.PORT || 4000;
mongoose
.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Database connection successful");
})
.catch((err) => {
  console.log(err)
  console.error("Database connection error");
});
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
