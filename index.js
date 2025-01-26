const express = require('express');

const app = express();
const routes=require('./router/book')
const PORT=5000;
app.use(express.json());

app.use("/books", routes);

app.listen(PORT,()=>console.log("Server is running",PORT));



