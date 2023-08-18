import React, { useContext, useState, useEffect } from "react";
import { ArtistContext } from "../../page";
import { getPreview } from "../../api/spotify";
import { Artist } from "../../types";
import ReactAudioPlayer from "react-audio-player";
import { parseSpotifyId } from "@/app/utilityFunctions";
import Image from "next/image";
import Loading from "@/app/loading";

const ArtistList = ({
  className,
  artistIds,
}: {
  className: string;
  artistIds: string[] | null;
}) => {
  const artistsData = useContext(ArtistContext);
  const [artistPreviews, setArtistPreviews] = useState<{
    [key: string]: {
      trackName: string | null;
      playbackUrl: string | null;
      imageUrl: string | null;
    };
  }>({});
  const [currentAudioElement, setCurrentAudioElement] =
    useState<HTMLAudioElement | null>(null);
  const audioPlayerRefs: { [key: string]: React.RefObject<ReactAudioPlayer> } =
    {};
  const [isPlaying, setIsPlaying] = useState<string | null>(null);

  const togglePlay = (artistId: string) => {
    const playerRef = audioPlayerRefs[artistId];

    if (playerRef && playerRef.current?.audioEl.current) {
      const audioElement = playerRef.current.audioEl.current;

      if (currentAudioElement && currentAudioElement !== audioElement) {
        currentAudioElement.pause();
      }
      if (isPlaying) {
        audioElement.pause();
        setIsPlaying(null);
      } else {
        audioElement.play();
        setIsPlaying(artistId);
      }

      setCurrentAudioElement(audioElement);
    }
  };

  useEffect(() => {
    const fetchArtistPreviews = async () => {
      if (artistsData) {
        for (const artist of artistsData) {
          try {
            const { trackName, playbackUrl, imageUrl } = await getPreview(
              parseSpotifyId(artist.spotifyId)
            );
            setArtistPreviews((prevPreviews) => ({
              ...prevPreviews,
              [artist.id]: { trackName, playbackUrl, imageUrl },
            }));
          } catch (error) {
            console.error(
              `Error fetching preview for artist ${artist.id}:`,
              error
            );
          }
        }
      }
    };

    fetchArtistPreviews();
  }, [artistsData]);

  return (
    <div
      className={
        className +
        " flex flex-1 flex-shrink flex-col overflow-auto px-2 mx-1 sm:mx-2 scroll-smooth scrollbar-thin scrollbar-thumb-zinc-200 scrollbar-track-transparent h-80"
      }
    >
      {artistsData
        ?.filter((artist: { id: string }) => artistIds?.includes(artist.id))
        .map((artist: Artist) => {
          const preview = artistPreviews[artist.id];
          audioPlayerRefs[artist.id] = React.createRef();

          const handleAudioEnd = () => {
            setIsPlaying(null);
          };

          // Preview data is not available yet
          if (!preview) {
            return <Loading key={artist.id}></Loading>;
          }

          // Artist Card
          return (
            <li
              key={artist.id}
              className={`flex h-20 shadow-sm shadow-white p-2 bg-white duration-700 transition mr-1 my-1  justify-between rounded-lg 
                            ${artist.id === isPlaying && "scale-105"} ${
                              !(artist.id === isPlaying) &&
                              isPlaying != null &&
                              "blur-sm"
                            }`}
            >
              <span className="flex">
                {/* Image */}
                <Image
                  className="rounded-lg"
                  src={preview.imageUrl ?? "/images/placeholder.png"}
                  alt="Artist Image"
                  loading="lazy"
                  width={60}
                  height={60}
                />

                {/* Text info */}
                <div className="flex w-44 flex-col justify-center mx-2 sm:ml-3">
                  <h3
                    className={`text-left ${
                      preview.playbackUrl ? " text-base sm:text-xl" : "text-2xl"
                    } `}
                  >
                    {artist.name}
                  </h3>
                  {preview.playbackUrl && (
                    <div className="flex overflow-hidden max-w-40 align-middle py-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className={`w-5 h-6 mb-1 mr-1 ${
                          artist.id === isPlaying && "animate-bounce"
                        } `}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
                        />
                      </svg>
                      <div className=" w-24 sm:w-44 wrapper">
                        {/* Determination of the animation based on the charlength of 25 is not elegent since it is indeterministic but it is used to reduce complexity */}
                        <span
                          className={`text-left text-sm sm:text-base  whitespace-nowrap  ${
                            preview.trackName &&
                            preview.trackName?.length >
                              (window.innerWidth < 640 ? 14 : 25) &&
                            "marquee"
                          }`}
                        >
                          <h4>{preview.trackName}</h4>
                          {/* non breaking space */}
                          {"\u00A0".repeat(1)}
                          <h4>{preview.trackName}</h4>
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </span>

              {/* Audio Player */}
              {preview.playbackUrl && (
                <ReactAudioPlayer
                  src={preview.playbackUrl}
                  autoPlay={false}
                  controls={false}
                  className="rounded-lg"
                  ref={audioPlayerRefs[artist.id]}
                  id={artist.id}
                  volume={0.5}
                  onEnded={handleAudioEnd}
                />
              )}
              <div className="flex justify-end">
                {preview.playbackUrl != null && (
                  <button
                    className="mr-1"
                    onClick={() => togglePlay(artist.id)}
                  >
                    {artist.id === isPlaying ? (
                      // Pause
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-11 h-11 hover:scale-110 active:scale-90 transition-transform"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 5.25v13.5m-7.5-13.5v13.5"
                        />
                      </svg>
                    ) : (
                      // Play Icon
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1}
                        stroke="currentColor"
                        className="w-11 h-11 hover:scale-110 transition-transform active:scale-90"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                        />
                      </svg>
                    )}
                  </button>
                )}
                {/* Spotify Logo */}
                <a
                  href={artist.spotifyId}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-center hover:scale-110 transition-transform active:scale-90"
                >
                  <svg
                    className="h-9 w-9"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.098 10.638c-3.868-2.297-10.248-2.508-13.941-1.387-.593.18-1.22-.155-1.399-.748-.18-.593.154-1.22.748-1.4 4.239-1.287 11.285-1.038 15.738 1.605.533.317.708 1.005.392 1.538-.316.533-1.005.709-1.538.392zm-.126 3.403c-.272.44-.847.578-1.287.308-3.225-1.982-8.142-2.557-11.958-1.399-.494.15-1.017-.129-1.167-.623-.149-.495.13-1.016.624-1.167 4.358-1.322 9.776-.682 13.48 1.595.44.27.578.847.308 1.286zm-1.469 3.267c-.215.354-.676.465-1.028.249-2.818-1.722-6.365-2.111-10.542-1.157-.402.092-.803-.16-.895-.562-.092-.403.159-.804.562-.896 4.571-1.045 8.492-.595 11.655 1.338.353.215.464.676.248 1.028zm-5.503-17.308c-6.627 0-12 5.373-12 12 0 6.628 5.373 12 12 12 6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12z" />
                  </svg>
                </a>
              </div>
            </li>
          );
        })}
    </div>
  );
};
export default ArtistList;
