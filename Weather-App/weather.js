

const inputField = document.querySelector(".input-box")
const btn = document.querySelector("button")

let image = document.querySelector(".weather-img")
const temperature = document.querySelector(".temperature")
const weatherType = document.querySelector(".description")
const humidity = document.querySelector("#humidity")
const windSpeed = document.getElementById("wind-speed")

const weatherBody = document.querySelector(".weather-body")
const errorDiv = document.querySelector(".Not-found")
const apiError = document.querySelector(".apiError")


btn.addEventListener("click" , function(event){
    const input = inputField.value
    // console.log(input);
    if (input == "") {
       return alert("Must required Input")
    }
    else{
        inputField.value = " "
        weatherApi(input)        
    }
},false)

inputField.addEventListener("keyup" , function (event) {
     const input = inputField.value
     
     if (event.key === "Enter") {
        if (!input) {
            return alert("Must required Input ")
        } else {
        inputField.value = "" 
        weatherApi(input)  
        } 
     }
},false)


 async function weatherApi(city){
    try {
         const apiKey = "c85445b1281da3818a09c714c42fc2d5"
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        const data = await fetch(url)
        const dataToJson = await data.json()
        
        //  console.log(dataToJson);

        if (dataToJson.cod === "404") {
            apiError.style.display = "none"
            weatherBody.style.display = "none"
            errorDiv.style.display = "flex"
        }
        else{
            apiError.style.display = "none"
            errorDiv.style.display = "none"
            weatherBody.style.display = "flex"
            inputField.value = city

            temperature.innerHTML = `${Math.round(dataToJson.main.temp -273.15)} <sup>°C</sup>`
            weatherType.innerHTML = dataToJson.weather[0].description
            humidity.innerHTML = `${dataToJson.main.humidity}%`
            windSpeed.innerHTML = `${Math.round(dataToJson.wind.speed)}Km/H`

            if(dataToJson.weather[0].id >= 200  && dataToJson.weather[0].id <= 232){
                image.src = "Weather-App/images/storm.png"
            }
            else if(dataToJson.weather[0].id >= 300  && dataToJson.weather[0].id <= 321){
                image.src = "Weather-App/images/rain.png"
            }
            else if(dataToJson.weather[0].id >= 500  && dataToJson.weather[0].id <= 531){
                image.src = "Weather-App/images/rain.png"
            }
            else if(dataToJson.weather[0].id >= 600  && dataToJson.weather[0].id <= 622){
                image.src = "Weather-App/images/snow.png"
            }
            else if(dataToJson.weather[0].id >= 701  && dataToJson.weather[0].id <= 781){
                image.src = "Weather-App/images/haze.png"
            }
            else if(dataToJson.weather[0].id == 800){
                image.src = "Weather-App/images/clear.png"
            }
            else if(dataToJson.weather[0].id >= 801  && dataToJson.weather[0].id <= 804){
                image.src = "Weather-App/images/cloud.png"
            }
        }
       
    } catch (error) {
        console.log(error);
        weatherBody.style.display = "none"
        errorDiv.style.display = "none"
        apiError.style.display = "flex"
    }

}
