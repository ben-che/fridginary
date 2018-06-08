// Set-up
const express = require('express');
const app = express();
app.set('port', process.env.PORT || 8080);
const axios = require('axios');
const secret = require('./secrets.js').apiKey
const recipeSearchUrl = `http://food2fork.com/api/search?key=${secret}&q=`
//

app.get('/findRecipe', (req, res) => {
    console.log(req.query.items.split(',').join('&'))
    axios.get(recipeSearchUrl+(req.query.items.split(',').join('&')))
    .then(response => {
        console.log(response.data);
        res.status(200).send('a-okay, ben')
    })

})

app.listen(process.env.PORT || 8080, () => {
    console.log(`running on ${process.env.PORT ? process.env.PORT : 8080}`)
});

