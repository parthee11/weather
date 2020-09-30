function UI() {

}

// Getting location input
UI.prototype.getLocation = () => {
    let loc = document.querySelector('#loc-input').value;
    return loc;
}

// Clearing location input field
UI.prototype.clearLocField = () => {
    document.querySelector('#loc-input').value = '';
}

// Populating the UI
UI.prototype.setWeatherUI = () => {
    let output = 'Getting Latest Weather';
    document.querySelector('.card-body').innerHTML = `
        <p class="loader">${output}</p>
    `;
    const weatherUI = weather.getWeather()
        .then(data => {
            let day = new Date().getDay();
            // Switch case to return the day
            switch(day) {
                case 0:
                    day = 'Sunday';
                    break;
                case 1:
                    day = 'Monday';
                    break;
                case 2:
                    day = 'Tuesday';
                    break;
                case 3:
                    day = 'Wednesday';
                    break;
                case 4:
                    day = 'Thursday';
                    break;
                case 5:
                    day = 'Friday';
                    break;
                case 6:
                    day = 'Saturday';
                    break;
            }
            // Function return two digits
            function twoDigitSet(n) {
                if(n < 9) {
                    return `0${n}`
                } else {
                    return n;
                }
            }
            let dateHr = new Date().getHours();
            let dateMin = twoDigitSet(new Date().getMinutes());
            // Converting Kelvin to Celsius
            let temparature = (data.main.temp - 273.15).toFixed(0);
            let feelsLike = (data.main.feels_like - 273.15).toFixed(0);
            let weatherDesc = (data.weather[0].description);
            let weatherDescCap = weatherDesc.charAt(0).toUpperCase() + weatherDesc.slice(1);
            // Setting the output variable
            output = `
                <p class="location">${data.name}<span>, ${data.sys.country}</span></p>
                <p class="day-date">${day}, ${dateHr}:${dateMin} (IST)</p>
                <div class="weather">
                    <div class="temp">${temparature}&deg; C</div>
                    <div class="icon">
                        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
                    </div>
                    <p class="description">${weatherDescCap}</p>
                </div>
                <hr>
                <div class="main">
                    <p id="pressure">Pressure : ${data.main.pressure} hPa</p>
                    <p id="humidity">Humidity : ${data.main.humidity}%</p>
                    <p id="feels-like">Feels Like : ${feelsLike}&deg; C</p>
                    <p id="wind">Wind : ${data.wind.speed} m/s</p>
                </div>
            `;

            // Appending the output vaiable to card body 
            document.querySelector('.card-body').innerHTML = output;
        })
        .catch(err => {
            let output = 'City Not Found';
            document.querySelector('.card-body').innerHTML = `
                <p class="loader">${output}</p>
            `;
            document.querySelector('.cl-popup').style.display = 'block';
            document.querySelector('#change-location').textContent = 'Set Location';
        })
}

UI.prototype.validateInput = () => {
    if(!document.querySelector('.input-err')) {
        const errLabel = document.createElement('label');
        errLabel.className = 'input-err';
        errLabel.appendChild(document.createTextNode('Please enter a city name'));
        console.log(errLabel);
        const popUp = document.querySelector('.cl-popup');
        const btns = document.querySelector('.btns');
        popUp.insertBefore(errLabel, btns);    
        setTimeout(() => {
            if(document.querySelector('.input-err')) {
                document.querySelector('.input-err').remove();
            }
        }, 2000);
    }
}