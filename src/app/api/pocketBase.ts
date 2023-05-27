import PocketBase from 'pocketbase';

const pb = new PocketBase(process.env.PB_URL);

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
  