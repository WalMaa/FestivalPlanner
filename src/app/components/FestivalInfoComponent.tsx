import { Key, useContext, useState, useEffect, useRef, MutableRefObject } from "react";
import { FestivalDataContext, ArtistsDataContext } from "../page";
import { getPreview } from '../api/spotify';
import { Artist } from '../types'
import ReactAudioPlayer from 'react-audio-player';


const convertDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const formattedDate = `${day}/${month}`;
    return formattedDate;
};


const parseSpotifyId = (spotifyUrl: string) => {
    const artistId = spotifyUrl.split('/artist/')[1]?.split('?')[0];
    return artistId;
};


const FestivalInfoComponent = ({ city }: { city: string }) => {
    const festivalData = useContext(FestivalDataContext);
    const artistsData = useContext(ArtistsDataContext);
    const festivalsAtLocation = festivalData.filter((festival: { location: string }) => festival.location === city);
    const [selectedFestival, setSelectedFestival] = useState(festivalsAtLocation.length > 0 ? festivalsAtLocation[0].name : null);
    const [artistPreviews, setArtistPreviews] = useState<{ [key: string]: { trackName: string | null; playbackUrl: string | null; imageUrl: string | null } }>({});


    useEffect(() => {
        const fetchArtistPreviews = async () => {
            const previews: { [key: string]: { trackName: string | null; playbackUrl: string | null; imageUrl: string | null } } = {};

            await Promise.all(
                artistsData.map(async (artist: Artist) => {
                    const { trackName, playbackUrl, imageUrl } = await getPreview(parseSpotifyId(artist.spotifyId));
                    previews[artist.id] = { trackName, playbackUrl, imageUrl };
                })
            );

            setArtistPreviews(previews);
        };

        fetchArtistPreviews();
    }, [artistsData]);

    const renderArtist = (artistIds: string[]) => {
        const artistsInFestival = artistsData
            .filter((artist: { id: string }) => artistIds.includes(artist.id))
            .map((artist: { name: string; spotifyId: string; id: string; }) => {
                const preview = artistPreviews[artist.id];

                if (!preview) {
                    // Preview data is not available yet
                    return null;
                }

                return (
                    <div key={artist.id} className="flex flex-1 h-20 p-2 bg-red my-1 rounded-lg">
                        {/* Image */}
                        {preview.imageUrl && <img src={preview.imageUrl} width={50} height={50} className="rounded-full" alt={artist.name}></img>}

                        {/* Text info */}
                        <div className="flex flex-col mx-4">
                            <h2 className="text-left text-xl">{artist.name}</h2>
                            <h3 className="text-eft">{preview.trackName}</h3>
                        </div>
                        {/* Audio Player */}
                        {preview.playbackUrl &&
                            <ReactAudioPlayer
                                src={preview.playbackUrl || undefined}
                                autoPlay={false}
                                controls
                            />
                        }

                        {/* <button onClick={() =>}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                        </svg>
                    </button> */}
                        {/* Spotify Logo */}
                        <a href={artist.spotifyId} target="_blank" rel="noopener noreferrer" className="h-10 w-10 self-end">
                            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.098 10.638c-3.868-2.297-10.248-2.508-13.941-1.387-.593.18-1.22-.155-1.399-.748-.18-.593.154-1.22.748-1.4 4.239-1.287 11.285-1.038 15.738 1.605.533.317.708 1.005.392 1.538-.316.533-1.005.709-1.538.392zm-.126 3.403c-.272.44-.847.578-1.287.308-3.225-1.982-8.142-2.557-11.958-1.399-.494.15-1.017-.129-1.167-.623-.149-.495.13-1.016.624-1.167 4.358-1.322 9.776-.682 13.48 1.595.44.27.578.847.308 1.286zm-1.469 3.267c-.215.354-.676.465-1.028.249-2.818-1.722-6.365-2.111-10.542-1.157-.402.092-.803-.16-.895-.562-.092-.403.159-.804.562-.896 4.571-1.045 8.492-.595 11.655 1.338.353.215.464.676.248 1.028zm-5.503-17.308c-6.627 0-12 5.373-12 12 0 6.628 5.373 12 12 12 6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12z" /></svg>
                        </a>
                    </div >
                );
            });

        return artistsInFestival;
    };


    const renderFestivalInfo = (festival: { id: Key; name: string; startDate: string; endDate: string; artists: string[] }) => {

        return (
            <div>
                <div key={festival.id} className="tabs h-10 justify-center tabs-boxed">
                    <a onClick={() => setSelectedFestival(festival.name)} className={`tab ${selectedFestival === festival.name && 'tab-active'}`}>{festival.name}</a>
                </div>

                {/* Festival Info */}
                <div className={`flex flex-1 flex-col m-2 bg-white rounded-md `}>
                    <div>
                        <span className="py-1 ml-1">{convertDate(festival.startDate)} -</span>
                        <span className="py-1 ml-1">{convertDate(festival.endDate)}</span>
                    </div>
                    <div className="flex flex-col overflow-auto h-80">{renderArtist(festival.artists)}</div>
                </div>
            </div>
        );
    }


    return (
        <div className="absolute top-1/3 h-3/5 w-1/4 right-1/2 flex bg-gray rounded-lg p-2 z-20">
            {festivalsAtLocation.map((festival: { id: Key; name: string; startDate: string; endDate: string; artists: string[] }) => {
                return renderFestivalInfo(festival);
            })}
        </div>
    );
}

export default FestivalInfoComponent;
