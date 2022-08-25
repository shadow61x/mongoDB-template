const http = require('http');
const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const ejs = require("ejs");
const app = express();

//models 
const test = require('./models/test.js')




//mongoDB panel ayarları 

//mongoDBurl yazan kısma mongoDB panl linkinizi yazın 
// ör : const dbURL = 'mongodb+srv://757:75575.juzwe.mongodb.net/7557?retryWrites=true&w=majority'

const dbURL = 'mongodb+srv:`mongodb url`
mongoose.connect(dbURL , {useNewUrlParser : true , useUnifiedTopology: true})
.then((result) =>{
    app.listen(3000)
     console.log('mongoDB Bağlantı kuruldu')
})
.catch((err) => console.log(err))

//mongoDB panel ayarları bitti




app.set('view engine' , 'ejs')



app.use(morgan('tiny'))


//anasayfa
app.get('/' , (req,res) =>{
    res.render('index')
})

//db Veri kaydetme 
app.get('/add' , (req,res) =>{
    const Test = new test({
        title: "test baslik"
    })

    Test.save()
    .then((result) =>{
        res.send(result)
    })
    .catch((err) =>{
        console.log(err)
    })
})


//db Veri çekme 
app.get('/veri' , (req,res) =>{
test.find()
.then((result) =>{
    res.render('./veri/index.ejs' , {
        test:result
    })


})
.catch((err) =>{
    console.log(err)
})
})



// 404 sayfay hatası ( Bu kodun altına sayfa yerleştirirseniz o sayfaya gitmez ve sürekli 404 verir)
app.use( ( req,res) =>{
    res.status(404).render('./404/404.ejs')
})
