import { Buffer } from 'buffer';
import axios from 'axios';

var client_id = process.env.SPOTIFY_CLIENT_ID;
var client_secret = process.env.SPOTIFY_CLIENT_SECRET;

const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
    },
    data: {
      grant_type: 'client_credentials'
    }
  };


axios(authOptions)
  .then(response => {
    if (response.status === 200) {
      const token = response.data.access_token;
      // Use the token for authenticated requests
      // Your code here
    }
  })
  .catch(error => {
    console.error('Error requesting access token:', error);
  });