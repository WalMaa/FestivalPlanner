import { useContext, useState, useEffect, Suspense } from "react";
import { FestivalDataContext } from "../../page";
import React from "react";
import { Festival } from '../../types'
import { convertDate, festivalCountdown } from "@/app/utilityFunctions";
import ArtistList from "./ArtistList";
import ReactDom from "react-dom";


const FestivalInfoComponent = ({ city, setExpandedLocation }: { city: string, setExpandedLocation: React.Dispatch<React.SetStateAction<string | null>> }) => {
    const festivalData = useContext(FestivalDataContext);
    const festivalsAtLocation: Festival[] = festivalData?.filter((festival) => festival.location === city) ?? [];
    const initialFestival = festivalsAtLocation.length > 0 ? festivalsAtLocation[0].id : null;
    const [selectedFestival, setSelectedFestival] = useState(initialFestival);
    const modalRef = React.useRef<HTMLDivElement>(null);

    // since festivalinfocomponents are prerendered this assigns the initialvalue for the selected festival once the components have loaded
    useEffect(() => {
        if (festivalsAtLocation && festivalsAtLocation.length > 0) {
            setSelectedFestival(festivalsAtLocation[0].id);
        }
        // this ensures that it happens only from null -> non-null i.e. not when user input happens
    }, [festivalsAtLocation && festivalsAtLocation.length]);

    const closeLocation = () => {
        setExpandedLocation(null);
    }

    // Close modal on click outside
    useEffect(() => {
        const handleOutsideClick = (event:Event) => {
          if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            closeLocation();
          }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
          document.removeEventListener('mousedown', handleOutsideClick);
        };
      }, []);

    // No festivals at location
    if (festivalsAtLocation.length === 0) {
        return <div className="absolute top-1/3 right-1/2 w-64 bg-white shadow-md rounded-lg p-2 z-20 ">
            <span className="flex justify-end">
                <button onClick={() => closeLocation()} aria-label='Close festival menu'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" w-8 h-8 hover:scale-110 transition-transform duration-300 hover:stroke-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </span>
            <h2 className="text-xl">No festivals available for {city}</h2>
        </div>;

    }
    // Festivals at location
    return ReactDom.createPortal(
        <>
        <div className=" fixed top-0 left-0 w-full h-full z-10 backdrop-blur-sm">
            <div ref={modalRef} className="absolute top-1/3 right-1/2 translate-x-1/2 bg-teal-100 shadow-md rounded-lg p-2 z-20 ">
                <div className="flex flex-col">
                    <div className="flex justify-center items-center">
                        <h3 className="text-2xl pt-1 font-medium text-center mb-2">{city}</h3>
                        {/* Close Button */}
                        <button onClick={() => closeLocation()} aria-label='Close festival menu' className="absolute right-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" w-8 h-8 hover:scale-110 transition-transform duration-300 hover:stroke-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex justify-evenly">
                        {festivalsAtLocation.map((festival: { id: string; name: string; }) => (
                            <div key={festival.id}>
                                <button
                                    className={`p-2 rounded-lg hover:scale-110 transition-transform shadow-sm  duration-150
                                 ${selectedFestival === festival.id ? 'bg-gray border-2 border-red-600 scale-105' : 'bg-gray'}`}
                                    onClick={() => setSelectedFestival(festival.id)}
                                >
                                    <h2>{festival.name}</h2>
                                </button>
                            </div>
                        ))}
                    </div>
                    <div>
                        {festivalsAtLocation.map((festival: Festival) => (
                            <div key={festival.id} className={`${selectedFestival === festival.id ? 'block' : 'hidden'} bg-gray shadow-md mt-2 rounded-lg p-4`}>
                                <a className="flex items-center" rel="noopener" target="_blank" href={festival.url}
                                >
                                    <span className="flex justify-around items-center">
                                        <h2 className="text-2xl text-center">{festival.name}</h2>
                                    </span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 m-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                                    </svg>
                                </a>

                                <h3 className="text-lg text-left">{convertDate(festival.startDate)} - {convertDate(festival.endDate)}</h3>
                                <h3>{festivalCountdown(festival.startDate, festival.endDate)}</h3>
                                <ArtistList artistIds={festival.artists} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </>
        , document.getElementById('portal')!
    );
}

export default FestivalInfoComponent;
