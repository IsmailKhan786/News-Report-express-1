const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const axios = require("axios").default;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");
var names=[];
app.get("/",function(req,res){
     res.render("index",{name:names});
})
app.post("/",function(req,res){
    source = req.body.sources;
    const url = 'https://newsapi.org/v2/top-headlines?from=2022-02-03&sortBy=popularity&apiKey=01f06835c0af4e88ab9dd1c5988ae24f&sources=' + source ;
   
    axios.get(url)
    .then(response => {
        var test =response.data;
        // res.json(response.data)
       var name = test.articles[0].title;
        
        names.push(name);
        
        res.redirect("/")
    })
    .catch(error => {
        console.log(error);
        res.json(error)
    })
})





app.listen(process.env.PORT || 3000,function(){
    console.log("Server Started.")
})