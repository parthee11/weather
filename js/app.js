// Instantiating Classes
const storage = new Storage;
const weather = new Weather;
const ui = new UI;

// Get weather details event
document.getElementById('getWeather').addEventListener('click', () => {
    // Setting the location
    const location = ui.getLocation();
    // Validation
    if(location === null || location === '') {
        ui.validateInput();
    } else {
        document.querySelector('#getWeather').textContent = 'Save Changes';
        document.querySelector('#change-location').textContent = 'Change Location';
        // Set location to ls
        storage.setLocToLs(location);
        // Set location to location variable in Weather class
        weather.setLocation(location);
        // Populate ui
        ui.setWeatherUI();
        document.querySelector('.cl-popup').style.display = 'none';
        // Clear input field
        ui.clearLocField();
    }
})

// DOM Content Load event
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#change-location').textContent = 'Set Location';
    // Get location from ls
    let location = storage.getFromLs();
    // Validation
    if(location === null || location === '') {
        document.querySelector('.cl-popup').style.display = 'block';
        document.querySelector('#getWeather').textContent = 'Save Location';
    } else {
        weather.setLocation(location);
        ui.setWeatherUI();
    }
})

// Change location event
document.querySelector('#change-location').addEventListener('click', () => {
    document.querySelector('.cl-popup').style.display = 'block';
})

// Cancel change location event
document.querySelector('#cancel').addEventListener('click', () => {
    document.querySelector('.cl-popup').style.display = 'none';
    ui.clearLocField();
})