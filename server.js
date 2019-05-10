var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var PORT = process.env.port || 4444;

var products = [
    {
        id: 1,
        name: 'Tie',
    },
    {
        id: 2,
        name: 'Belt',
    }
];

var currentId = 2;


app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/products', function(req, res){
    res.send({products: products});
});

app.post('/products', function(req, res){
    currentId++;
    var newProductName = req.body.name;
    products.push({
        id: currentId,
        name: newProductName
    });
    res.send('Successfully Created a product');
});

app.put('/products/:id', function(req, res){
    var id = req.params.id;
    var newName = req.body.newName;
    var found = false;
    products.forEach(function(product, index){
        if(!found && product.id === Number(id)){
            found = true;
            product.name = newName;
        }
    });
    res.send('Successfully Updated a product');
});

app.delete('/products/:id', function(req, res){
    var id = req.params.id;
    var found = false;
    products.forEach(function(product, index){
        if(!found && product.id === Number(id)){
            found = true;
            products.splice(index, 1);
        }
    });
    res.send('Successfully Deleted a product');
});



app.listen(PORT, function(){
    console.log('Server is started on ' + PORT);
});