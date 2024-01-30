import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import env from "dotenv";

const app=express();
env.config()
const api_Key =process.env.API_KEY
const api_Url=process.env.API_URL

console.log()

app.use(express.static("public"))

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/",async(req,res)=>{
    try {
        const response =await axios.get(api_Url+`/data/2.5/weather?lat=28.6517&lon=77.2219&units=metric&appid=${api_Key}`);

        res.render("index.ejs",{
            name : response.data.name,
            icon : response.data.weather[0].icon,
            temp : response.data.main.temp,
            description : response.data.weather[0].description,
            humidity: response.data.main.humidity,
            wind: response.data.wind.speed,

        })
    } catch (error) {
        
    }
   
})
app.post("/",async(req,res)=>{
    try {
    const result = await axios.get(api_Url+`geo/1.0/direct?q=${req.body["area"]}&appid=${api_Key}`);
    const lat = result.data[0].lat;
    const lon = result.data[0].lon;
    const response =await axios.get(api_Url+`/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_Key}`)
    res.render("index.ejs",{
        name : response.data.name,
        icon : response.data.weather[0].icon,
        temp : response.data.main.temp,
        description : response.data.weather[0].description,
        humidity: response.data.main.humidity,
        wind: response.data.wind.speed,

    })
} catch (error) {
    error : "Sorry, Currently not avaiable",
    console.error("Failed to make request:", error.message)
    }

})
app.listen("3000",()=>{
console.log("running at port 3000")
})