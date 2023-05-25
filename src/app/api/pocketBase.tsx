import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');


export async function authPB() {
    console.log('Authenticating.');
    try {
        const authData = await pb.admins.authWithPassword('wmaatta@gmail.com', 'festivaladmin');
        console.log(pb.authStore.isValid);
        console.log(pb.authStore.token);
    } catch (error) {
        console.error('Error authenticating.');
    }
}

export async function getFestivals() {
    console.log('Fetching festival data...')
    try {
        const festivalData = await pb.collection('festivals').getFullList({
            sort: '-startDate',
        });
        return festivalData;

    } catch (error) {
      console.error('Error fetching festivals:', error);
    }
  }

export async function getArtists() {
    console.log('Fetching artist data...');

    try {
        
        const artistsData = await pb.collection('artists').getFullList({
            sort: '-name',
        });
        return artistsData;
    } catch (error) {
        console.error('Error fetching artists:', error);
    }
    
}
  