import { useContext, useState, useEffect, useMemo } from "react";
import { FestivalContext } from "../../page";
import React from "react";
import { Festival } from "../../types";
import { convertDate } from "@/app/utilityFunctions";
import ArtistList from "./ArtistList";
import ReactDom from "react-dom";
import FestivalTime from "../Generic/FestivalTime";

const FestivalInfoComponent = ({
  location: city,
  festival: festivalId,
  setExpandedLocation,
}: {
  location: string;
  festival?: string | null;
  setExpandedLocation: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const festivalData = useContext(FestivalContext);
  const festivalsAtLocation = useMemo(() => {
    return festivalData?.filter((festival) => festival.location === city) ?? [];
  }, [festivalData, city]);
  const initialFestival =
    festivalsAtLocation.length > 0 ? festivalsAtLocation[0].id : null;
  const [selectedFestival, setSelectedFestival] = useState(initialFestival);
  const modalRef = React.useRef<HTMLDivElement>(null);

  //this assigns the initialvalue for the selected festival once the component has loaded
  useEffect(() => {
    if (festivalsAtLocation && festivalsAtLocation.length > 0) {
      setSelectedFestival(festivalsAtLocation[0].id);
    }
    //if festival exists set it as selected
    if (festivalId) {
      setSelectedFestival(festivalId);
    }
    // this ensures that it happens only from null -> non-null i.e. not when user input happens
  }, [festivalsAtLocation, festivalId]);

  // this prevents background scrolling on mobile when the location is expanded
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const closeLocation = () => {
    if (setExpandedLocation) {
      setExpandedLocation(null);
    }
  };

  // Close modal on click outside event
  useEffect(() => {
    const handleOutsideClick = (event: Event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeLocation();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  // No festivals at location
  if (festivalsAtLocation.length === 0) {
    return (
      <div className="fixed animate-jump-in animate-ease-out top-0 left-0 w-full h-full z-10 backdrop-blur-sm">
        <div
          ref={modalRef}
          className="absolute top-1/3 right-1/2 translate-x-1/2 w-64 shadow-md rounded-lg p-2 z-20 "
        >
          <span className="flex justify-end">
            <button
              onClick={() => closeLocation()}
              aria-label="Close festival menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className=" w-8 h-8 active:scale-90 hover:scale-110 transition-transform duration-300 hover:stroke-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </span>
          <h2 className="text-xl text-center">
            No festivals available for {city}
          </h2>
        </div>
        ;
      </div>
    );
  }

  // Festival at location
  return ReactDom.createPortal(
    <>
      <div className="fixed animate-jump-in animate-ease-out top-0 left-0 w-full h-full z-10 backdrop-blur-sm">
        <div
          ref={modalRef}
          className="absolute top-1/4 right-1/2 max-w-sm sm:max-w-fit duration-700 translate-x-1/2 backdrop-blur bg-opacity-10 bg-gray shadow-md rounded-lg p-2 z-20 "
        >
          <div className="flex flex-col">
            <div className="flex justify-center items-center">
              <h3 className="text-2xl pt-1 font-medium text-center mb-2">
                {city}
              </h3>
              {/* Close Button */}
              <button
                onClick={() => closeLocation()}
                aria-label="Close festival menu"
                className="absolute right-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className=" w-8 h-8 hover:scale-110 transition-transform duration-300 active:scale-90 hover:stroke-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex justify-evenly">
              {festivalsAtLocation.map(
                (festival: { id: string; name: string }) => (
                  <div key={festival.id}>
                    <button
                      className={`p-2 rounded-lg hover:scale-105 hover:text-red-600 transition drop-shadow-md duration-500
                                 ${
                                   selectedFestival === festival.id
                                     ? " animate-fade animate-ease-out bg-gradient-to-b from-white to-gray rounded-b-none scale-105"
                                     : ""
                                 }`}
                      onClick={() => setSelectedFestival(festival.id)}
                    >
                      <h2>{festival.name}</h2>
                    </button>
                  </div>
                )
              )}
            </div>
            <div>
              {festivalsAtLocation.map((festival: Festival) => (
                <div
                  key={festival.id}
                  className={`${
                    selectedFestival === festival.id ? "block" : "hidden"
                  } flex-col flex-1 bg-gradient-to-t from-gray  via-white to-gray backdrop-blur-xl drop-shadow-xl rounded-lg`}
                >
                  <div
                    className={`flex w-80 sm:w-96 pl-4 pr-5 py-2 ${
                      festival ==
                      festivalsAtLocation[festivalsAtLocation.length - 1]
                        ? "animate-fade-left"
                        : "animate-fade-right"
                    }`}
                  >
                    <div className="flex flex-col">
                      <a
                        className="flex items-center"
                        rel="noopener"
                        target="_blank"
                        href={festival.url}
                      >
                        <span className="flex justify-around items-center">
                          <h2 className="text-2xl text-center">
                            {festival.name}
                          </h2>
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-7 h-7 m-1 transition-transform hover:scale-110 active:scale-90"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                          />
                        </svg>
                      </a>
                      <h3 className="text-lg text-left">
                        {convertDate(festival.startDate)} -{" "}
                        {convertDate(festival.endDate)}
                      </h3>
                    </div>
                    <div className="flex flex-1 justify-end items-end">
                      <FestivalTime
                        className="sm:text-lg"
                        startDate={festival.startDate}
                        endDate={festival.endDate}
                      />
                    </div>
                  </div>
                  <ArtistList
                    className={`${
                      festival ==
                      festivalsAtLocation[festivalsAtLocation.length - 1]
                        ? "animate-fade-left"
                        : "animate-fade-right"
                    }`}
                    artistIds={festival.artists}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")!
  );
};

export const MemoizedFestivalInfoComponent = React.memo(FestivalInfoComponent);

export default FestivalInfoComponent;
