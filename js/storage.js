class Storage{
    // Checking anything available in LS
    getFromLs = () => {
        let location = '';
        if(localStorage.getItem('location') === null) {
            location = '';
        } else {
            location = JSON.parse(localStorage.getItem('location'))
        }
        return location;
    }

    // Setting location to LS
    setLocToLs = (location) => {
        this.getFromLs();
        localStorage.setItem('location', JSON.stringify(location));
    }
}