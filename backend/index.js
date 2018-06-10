// Set-up
const express = require('express');
const app = express();
const http = require('http').Server(app)
app.set('port', process.env.PORT || 8080);
const axios = require('axios');
const cors = require('cors');
app.use(cors());
const secret = require('./secrets.js').apiKey
const recipeSearchUrl = `http://food2fork.com/api/search?key=${secret}&q=`
//

// Main get route --> returns JSON object of recipe search results
app.get('/findRecipe', (req, res) => {
    console.log('get route hit)')
    console.log(req.query.items.split(',').join('&'))
    axios.get(recipeSearchUrl+(req.query.items.split(',').join('&')))
    .then(response => {
        console.log(response.data);
        res.json(response.data);
    })
    .catch(error => {
        console.log(error);
        res.send(error)
    })
})

app.listen(process.env.PORT || 8080, () => {
    console.log(`running on ${process.env.PORT ? process.env.PORT : 8080}`)
});

