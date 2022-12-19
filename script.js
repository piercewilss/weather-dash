console.log("this works")

var cityName = document.querySelector("#city")
var weatherBtn = document.querySelector("#weatherBtn")
var apiKey = "4418483a230e6c5bedde65de8bd724fb"
let forecastDiv = document.querySelector(".forecast")
// let lat;
// let lon;

// function weatherSearch(event) {
function weatherSearch(lat, lon) {
    // event.preventDefault()
    // let selectedCity = cityName.value
    fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + apiKey)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)

            //
            for (let i = 0; i < data.list.length; i++) {
                if (data.list[i].dt_txt.includes('12:00:00')) {
                    // console.log(data.list[i])
                    let div = document.createElement("div")
                    div.classList.add("card")

                    let cardBody = `
                    <div class="card-body">
                    <h5 class="card-title">${data.city.name}</h5>
                    <img src="" class="card-img-top" alt="">
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">Temp: ${data.list[i].main.temp}</li>
                  <li class="list-group-item">Humid: ${data.list[i].main.humidity}</li>
                  <li class="list-group-item">Wind: ${data.list[i].wind.speed}</li>
                </ul>
              </div>
                    `
                    //this puts the cardbody content into the div
                    div.innerHTML = cardBody

                    //this puts div element into the forecastDiv
                    forecastDiv.appendChild(div)

                }
            }

        });
    // console.log(selectedCity)

}

function latLon(event) {
     event.preventDefault();

    let selectedCity = cityName.value
    console.log(selectedCity)

    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + selectedCity + '&appid=' + apiKey)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            let lat = data[0].lat;
            let lon = data[0].lon;

            weatherSearch(lat, lon)
            currentWeather(lat, lon)
        });

}

function currentWeather(lat, lon) {
    fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        //this function is getting days weather. then i will pit this into the current div
        var current = document.querySelector(".current")
        
        let cardBody = `
        <div class="card-body">
        <h5 class="card-title">${}</h5>
        <img src="" class="card-img-top" alt="">
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Temp: ${}</li>
      <li class="list-group-item">Humid: ${}</li>
      <li class="list-group-item">Wind: ${}</li>
    </ul>
  </div>`



    });
}





weatherBtn.addEventListener("click", latLon);
