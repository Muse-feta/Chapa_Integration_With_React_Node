const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
require('dotenv').config()
const axios = require("axios");
const PORT = 5000
const CHAPA_AUTH_KEY = process.env.CHAPA_AUTH_KEY //Put Your Chapa Secret Key 



app.post("/accept-payment", async (req, res) => {
  const {
    amount,
    currency,
    email,
    first_name,
    last_name,
    phone_number,
    tx_ref,
  } = req.body;

 try {
   const header = {
     headers: {
       Authorization: `Bearer ${CHAPA_AUTH_KEY}`,
       "Content-Type": "application/json",
     },
   };
   const body = {
     amount: amount,
     currency: currency,
     email: email,
     first_name: first_name,
     last_name: last_name,
     phone_number: phone_number,
     tx_ref: tx_ref,
     return_url: "http://localhost:5173/",
   }
   let resp = "";
   await axios
     .post("https://api.chapa.co/v1/transaction/initialize", body, header)
     .then((response) => {
       resp = response;
     })
     .catch((error) => {
       console.log(error.response.data); // Prints the error response data
       console.log(error.response.status); // Prints the status code of the error response
       console.log(error.response.headers); // Prints the headers of the error response
       res.status(400).json({
         message: error,
       });
     });
   res.status(200).json(resp.data);
 } catch (e) {
   res.status(400).json({
     error_code: e.code,
     message: e.message,
   });
 }
});

    

 app.listen(PORT, () => {
   console.log(`server running on port ${PORT}`);
 });



