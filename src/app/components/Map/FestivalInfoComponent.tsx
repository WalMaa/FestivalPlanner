import { useContext, useState, useEffect } from "react";
import { FestivalDataContext } from "../../page";
import React from "react";
import ArtistList from "./ArtistList";
import { Festival } from '../../types'
const convertDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const formattedDate = `${day}/${month}`;
    return formattedDate;
};


const FestivalInfoComponent = ({ city, expansionState }: { city: string, expansionState: boolean }) => {
    const festivalData = useContext(FestivalDataContext);
    const festivalsAtLocation: Festival[] = festivalData?.filter((festival) => festival.location === city) ?? [];
    const initialFestival = festivalsAtLocation.length > 0 ? festivalsAtLocation[0].id : null;
    const [selectedFestival, setSelectedFestival] = useState(initialFestival);

    // since festivalinfocomponents are prerendered this assigns the initialvalue for the selected festival once the components have loaded
    useEffect(() => {
        if (festivalsAtLocation && festivalsAtLocation.length > 0) {
            setSelectedFestival(festivalsAtLocation[0].id);
        }
        // this ensures that it happens only from null -> non-null i.e. not when user input happens
    }, [festivalsAtLocation && festivalsAtLocation.length]);


    if (festivalsAtLocation.length === 0) {
        return <div>No festivals available for {city}</div>;
    }

    return (
        <div className="absolute top-1/3 right-1/2 bg-white shadow-md rounded-lg p-2 z-10">
            <div className="flex flex-col">
                <div className="flex">
                    {festivalsAtLocation.map((festival: { id: string; name: string; }) => (
                        <div className="flex-1" key={festival.id}>
                            <button
                                className={`p-2 rounded-lg hover:scale-110 transition-transform shadow-sm  duration-150 ${selectedFestival === festival.id ? 'bg-red shadow-red' : 'bg-gray'
                                    }`}
                                onClick={() => setSelectedFestival(festival.id)}
                            >
                                <h2>{festival.name}</h2>
                            </button>
                        </div>
                    ))}
                    {/* Close Button */}
                    <span className="relative top-1 right-7 h-0 w-0">
                        <button onClick={() => expansionState = !expansionState} aria-label='Close festival menu'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </span>
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
                            <ArtistList artistIds={festival.artists} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FestivalInfoComponent;
