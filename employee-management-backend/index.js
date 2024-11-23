const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./routes/AuthRouter');
const ProductRouter = require('./routes/ProductRouter');
const EmployeeRoutes = require("./routes/EmployeeRoute");
require('dotenv').config();
require('./models/db');
const PORT = process.env.PORT || 8080;



app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
// app.use('/products', ProductRouter);
app.use('/details', EmployeeRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})