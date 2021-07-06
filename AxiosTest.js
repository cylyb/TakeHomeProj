
const axios = require('axios');

//Add prompt sync to have have user input
const prompt = require('prompt-sync')();

//for the enviroment varaible file
require('dotenv').config();

//console.log('Test')

//Turn the keys from env file into variables
const requestID = process.env.REQUEST_ID;
const apiID = process.env.API_KEY;
const secretKey = process.env.API_SECRET;

(async () => {
  //const supplierID = prompt('What is your supplier ID? ');
  //SupplierID was given via documentation 
  const supplierID = 'fc49b925-6942-4df8-954b-ed7df10adf7e';

  //const productID = prompt('What is your product ID? ');
  //ProductID was given via documentation 
  const productID = '02f0c6cb-77ae-4fcc-8f4d-99bc0c3bee18';

  //Asking user for start time input
  //const startTime = prompt('What is your start time  (Future date - EX:2021-07-21T21:00:00Z)? ');
  //const endTime = prompt('What is your end time? ');
  const startTime = '2021-07-21T21:00:00Z';
  const endTime = '2021-07-29T21:00:00Z';

  try {
    //Make URL end points variables with interchangable supplier, product, start, and end time variables
    const supplierUrl = `https://booking.sandbox.redeam.io/v1.2/suppliers/${supplierID}`;
    const productUrl = `https://booking.sandbox.redeam.io/v1.2/suppliers/${supplierID}/products/${productID}`;
    const availabilitiesUrl = `https://booking.sandbox.redeam.io/v1.2/suppliers/${supplierID}/products/${productID}/availabilities?end=${endTime}&start=${startTime}`;
    const headers = {
      //Getting the headers from the variable 
      headers: {
        'X-Request-ID': requestID,
        'X-API-Key': apiID,
        'X-API-Secret': secretKey
      }
    };
    //For testing purposes I wanted to display the headers
    //console.log('headers', headers)

    //Get all the data for each varaible. 
    const supplier = axios.get(supplierUrl, headers);
    const product = axios.get(productUrl, headers);
    const availabilities = axios.get(availabilitiesUrl, headers);

    //Take all the promises and put them together to display as ONE output on the screen
    Promise.all([supplier, product, availabilities])
      .then(function (values) {
        const supplierData = values[0].data;
        const productData = values[1].data;
        const availabilitiesData = values[2].data;
        console.log(supplierData);
        console.log(productData);
        console.log(availabilitiesData);
      }).catch(error => console.error(JSON.stringify(error)))
    
    //First test below.Simple request
  
    //const url = `https://booking.sandbox.redeam.io/v1.2/suppliers/${supplierID}/products/${productID}/availabilities?end=${endTime}&start=${startTime}`;
    //const url = `ttps://booking.sandbox.redeam.io/v1.2/suppliers/${supplierID}`;
    // const response = await axios.get(url, headers{
    //   headers: {
    //     'X-Request-ID': '###',
    //     'X-API-Key': 'key-csecc-v8djx910vjcn85lcz8c7',
    //     'X-API-Secret': 'secret-csecc-jf8c7h5n9v7cxf39z0fh'
    //   }
    // })

  } catch (error) {
    console.log(error.response);
  }
})();

