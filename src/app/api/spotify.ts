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

    // Otherwise, request a new access token
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      body: 'grant_type=client_credentials&client_id=' + client_id + '&client_secret=' + client_secret,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    if (response.status === 200) {
      const responseJSON = await response.json();
      const token = responseJSON.access_token;
      const expiresIn = responseJSON.expires_in;
      // Sets the new access token and its expiration time
      accessToken = token;
      tokenExpirationTime = Date.now() + expiresIn * 1000;

      return token;
    } else {
      throw new Error('Error retrieving access token');
    }
  } catch (error) {
    console.error('Error requesting access token:', error);
    return null;
  }
};

const getGenres = async (artistId: string) => {
  try {
    const token = await getAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (response.status === 200) {
      const responseJSON = await response.json();
      const genres = responseJSON.genres;
      return genres;
    } else {
      throw new Error('Error retrieving artist genres');
    }
  } catch (error) {
    console.error('Error retrieving artist genres:', error);
    return null;
  }
};

const getPreview = async (artistId: string) => {
  try {
    const token = await getAccessToken(); // Awaits the token retrieval
    const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=FI`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      const responseJSON = await response.json();
      // Checks if the provided artistId is the primary artist
      const tracks = responseJSON.tracks.filter((track: any) => {
        return track.artists[0].id === artistId;
      });

      const track = tracks[0];
      const trackName: string | null = track.name;
      const playbackUrl: string | null = track.preview_url;
      const imageUrl: string | null = track.album.images[0]?.url || null;

      return { trackName, playbackUrl, imageUrl };

    } else {
      throw new Error('Error retrieving preview');
    }
  } catch (error) {
    console.error(error);
    return { trackName: null, playbackUrl: null, imageUrl: null };
  }
};

export { getPreview, getGenres };
