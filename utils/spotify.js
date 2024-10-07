const dotenv = require('dotenv');
dotenv.config();

const getToken = async () => {    
    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(process.env.CLIENT_ID + ':' + process.env.SECRET)
        },
        body: 'grant_type=client_credentials'
    });

    const data = await result.json();
    return data.access_token;
};

module.exports = {
    getToken
};