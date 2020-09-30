class Weather {
    constructor() {
        this.clientID = '3bce9d3db3ccdaff5ab710ae7a7d2d8c';
        this.location = '';
    }

    // Setting location to location variable
    setLocation = (location) => {
        this.location = location;
        return this.location;
    }

    // Fetching the weather details
    async getWeather() {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.location}&appid=${this.clientID}`);
        const weatherData = await response.json();
        return weatherData;
    }
}