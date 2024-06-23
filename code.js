// first day
var cityname = document.querySelector('#city')
var day = document.querySelector('#day')
var dataday = document.querySelector('#data')
var month = document.querySelector('#month')
var degre = document.querySelector('#degry')
var icon = document.querySelector('#icon')
var wethertext = document.querySelector('#wethertext')
var humi = document.querySelector('#humidity')
var wind_kph = document.querySelector('#wind_kph')
var wind_dir = document.querySelector('#wind_dir')

// next day
var net_day_degre = document.querySelectorAll('#next-day-degre')
var nex_day = document.querySelectorAll('#nex-day')
var next_main_degre = document.querySelectorAll('#next-main-degre')
var next_icon = document.querySelectorAll('#next-icon')
var next_wethertext = document.querySelectorAll('#next-wethertext')

// SEARCH

var serach = document.querySelector('#serach')

async function getweather(city ="cairo"){
    var weatherapii = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=c26cf76dab074def9e8160413242206&q=${city}&days=3`);
    var weatherdata = await weatherapii.json()
    return weatherdata
}

function displaythedaye(data){
    var today = new Date()
    day.innerHTML = today.toLocaleDateString("en-US",{weekday:'long'})
    cityname.innerHTML = data.location.name;
    dataday.innerHTML = today.getDate();
    month.innerHTML = today.toLocaleDateString("en-US",{month:'long'});
    degre.innerHTML = data.current.temp_c;
    icon.innerHTML = data.current.condition.icon;
    wethertext.innerHTML = data.current.condition.text;
    humi.innerHTML = data.current.humidity+"%";
    wind_kph.innerHTML = data.current.wind_kph+"km/h";
    wind_dir.innerHTML = data.current.wind_dir;
} 

function displaynextday(data){
    var forecastdata = data.forecast.forecastday
    for (let i = 0; i < 2; i++) {
        var nextday = new Date(forecastdata[i+1].date);
        nex_day[i].innerHTML = nextday.toLocaleDateString("en-US",{weekday:'long'});
        net_day_degre[i].innerHTML = forecastdata[i+1].day.maxtemp_c;
        next_main_degre[i].innerHTML = forecastdata[i+1].day.mintemp_c;
        next_icon[i].innerHTML = forecastdata[i+1].day.condition.icon;
        next_wethertext[i].innerHTML = forecastdata[i+1].day.condition.text;
    }

}

async function startapp(city){
    var weatherdata = await getweather(city)
    displaythedaye(weatherdata)
    displaynextday(weatherdata)
}
startapp()


serach.addEventListener('input',function(){
    startapp(serach.value)
})