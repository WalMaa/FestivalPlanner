import PocketBase from 'pocketbase';
import { Festival, Artist } from '../types';
const pb = new PocketBase('https://festivalplanner.hop.sh');

export async function getFestivals() {
    try {
        const festivalData: Festival [] | null = await pb.collection('festivals').getFullList({
            sort: '-startDate',
        });
        return festivalData;

    } catch (error) {
      console.error('Error fetching festivals:', error);
    }
}

export async function getArtists() {
    try {
        
        const artistsData: Artist [] | null = await pb.collection('artists').getFullList({
            sort: '-name',
        });
        return artistsData;
    } catch (error) {
        console.error('Error fetching artists:', error);
    }
}