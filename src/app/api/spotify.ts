import axios from 'axios';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

let accessToken = '';
let tokenExpirationTime = 0;

const getAccessToken = async () => {
  try {
    if (accessToken && tokenExpirationTime > Date.now()) {
      // Use the existing access token if it's still valid
      return accessToken;
    }

    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64')
      },
      data: 'grant_type=client_credentials'
    };

    const response = await axios(authOptions);
    if (response.status === 200) {
      const token = response.data.access_token;
      const expiresIn = response.data.expires_in;
      // Sets the new access token and its expiration time
      accessToken = token;
      tokenExpirationTime = Date.now() + expiresIn * 1000;

      return token;
    }
  } catch (error) {
    console.error('Error requesting access token:', error);
    return null;
  }
};

const getPreview = async (artistId: string) => {
  try {
    const token = await getAccessToken(); // Await the token retrieval
    const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        country: 'FI',
      },
    });

    const track = response.data.tracks[0];

    const trackName: string | null = track.name;
    const playbackUrl: string | null = track.preview_url;
    const imageUrl: string | null = track.album.images[0]?.url || null;

    return { trackName, playbackUrl, imageUrl };
  } catch (error) {
    console.error(error);
    return { trackName: null, playbackUrl: null, imageUrl: null };
  }
};

export { getPreview };
