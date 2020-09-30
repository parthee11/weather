class Weather {
    constructor() {
        this.clientID = // <appid> // ;
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
