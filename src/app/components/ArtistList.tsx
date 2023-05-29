import React, { Key, useContext, useState, useEffect, useRef } from "react";
import { ArtistsDataContext } from "../page";
import { getPreview } from '../api/spotify';
import { Artist } from '../types'
import ReactAudioPlayer from 'react-audio-player';

const parseSpotifyId = (spotifyUrl: string) => {
    const artistId = spotifyUrl.split('/artist/')[1]?.split('?')[0];
    return artistId;
};

const ArtistList = ({ artistIds }: { artistIds: string[] }) => {
    const artistsData = useContext(ArtistsDataContext);
    const [artistPreviews, setArtistPreviews] = useState<{ [key: string]: { trackName: string | null; playbackUrl: string | null; imageUrl: string | null } }>({});
    const [currentAudioElement, setCurrentAudioElement] = useState<HTMLAudioElement | null>(null);
    const audioPlayerRefs: { [key: string]: React.RefObject<ReactAudioPlayer> } = {};
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = (artistId: string) => {
        const playerRef = audioPlayerRefs[artistId];

        if (playerRef && playerRef.current?.audioEl.current) {
            const audioElement = playerRef.current.audioEl.current;

            if (currentAudioElement && currentAudioElement !== audioElement) {
                currentAudioElement.pause();
            }

            if (isPlaying) {
                audioElement.pause();
            } else {
                audioElement.play();
            }

            setCurrentAudioElement(audioElement);
            setIsPlaying(!isPlaying);
        }
    };

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




    return (
        <div className="flex flex-col overflow-auto scroll-smooth scrollbar-hide h-80">
            {artistsData.filter((artist: { id: string }) => artistIds.includes(artist.id)).map((artist: { name: string; spotifyId: string; id: string; }) => {
                const preview = artistPreviews[artist.id];
                audioPlayerRefs[artist.id] = React.createRef();
                const isArtistPlaying = currentAudioElement === audioPlayerRefs[artist.id]?.current;

                if (!preview) {
                    // Preview data is not available yet
                    return null;
                }

                return (
                    <li key={artist.id} className="flex h-20 p-2 bg-red my-1 justify-between rounded-lg">
                        <span className="flex">
                            {/* Image */}
                            {preview.imageUrl && <img src={preview.imageUrl} width={50} height={50} className="rounded-full" alt={artist.name}></img>}

                            {/* Text info */}
                            <div className="flex flex-col mx-4">
                                <h3 className="text-left text-xl">{artist.name}</h3>
                                <span className="flex w-64 overflow-hidden align-middle py-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-6 mr-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                                    </svg>
                                    <span className="text-container w-40 overflow-hidden">
                                                {/* Determination of the animation based on the charlength of 25 is not elegent since it is indeterministic but it is used to reduce complexity */}
                                    <h4 className={`text-left text-content whitespace-nowrap  ${ preview.trackName && preview.trackName?.length > 25 && 'animate-scrolling-text'}`}>{preview.trackName}</h4>
                                    </span>

                                </span>
                            </div>

                        </span>


                        {/* Audio Player */}
                        {preview.playbackUrl &&
                            <ReactAudioPlayer
                                src={preview.playbackUrl || undefined}
                                autoPlay={false}
                                controls={false}
                                className="rounded-lg"
                                ref={audioPlayerRefs[artist.id]}
                                id={artist.id}
                            />
                        }
                        <div className="flex mr-1">
                            {preview.playbackUrl != null &&
                                <button className="m-1" onClick={() => togglePlay(artist.id)}>
                                    {isArtistPlaying && isPlaying ?
                                        // Pause
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-11 h-11">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                                        </svg>
                                        :
                                        // Play
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-11 h-11">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                                        </svg>
                                    }
                                </button>
                            }
                            {/* Spotify Logo */}
                            <a href={artist.spotifyId} target="_blank" rel="noopener noreferrer" className=" self-center">
                                <svg className="h-9 w-9" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" >
                                    <path d="M19.098 10.638c-3.868-2.297-10.248-2.508-13.941-1.387-.593.18-1.22-.155-1.399-.748-.18-.593.154-1.22.748-1.4 4.239-1.287 11.285-1.038 15.738 1.605.533.317.708 1.005.392 1.538-.316.533-1.005.709-1.538.392zm-.126 3.403c-.272.44-.847.578-1.287.308-3.225-1.982-8.142-2.557-11.958-1.399-.494.15-1.017-.129-1.167-.623-.149-.495.13-1.016.624-1.167 4.358-1.322 9.776-.682 13.48 1.595.44.27.578.847.308 1.286zm-1.469 3.267c-.215.354-.676.465-1.028.249-2.818-1.722-6.365-2.111-10.542-1.157-.402.092-.803-.16-.895-.562-.092-.403.159-.804.562-.896 4.571-1.045 8.492-.595 11.655 1.338.353.215.464.676.248 1.028zm-5.503-17.308c-6.627 0-12 5.373-12 12 0 6.628 5.373 12 12 12 6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12z" />
                                </svg>
                            </a>

                        </div>

                    </li>
                );
            })}
        </div>
    );
}

export default ArtistList;
