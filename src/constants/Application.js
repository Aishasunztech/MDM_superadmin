let hostName = window.location.hostname


let URL = 'http://localhost:8042/api/v1/';
let TITLE = "SuperAdmin";

switch (hostName) {
    case "localhost":
        break;

    // Meshguard Live
    case "meshguard.co":
        URL = "https://api.meshguard.co/api/v1/"
        break;

    case "www.meshguard.co":
        URL = "https://api.meshguard.co/api/v1/"
        break;
    case "http://www.meshguard.co":
        URL = "https://api.meshguard.co/api/v1/"
        break;
    case "https://www.meshguard.co":
        URL = "https://api.meshguard.co/api/v1/"
        break;
    
    // Meshguard Dev
    case "dev.meshguard.co":
        URL = "https://devapi.meshguard.co/api/v1/"
        break;
    default:
        break;
}

let USER_URI = URL + 'users/';

export const BASE_URL = URL;

export const APP_TITLE = TITLE;

export const USER_URL = USER_URI