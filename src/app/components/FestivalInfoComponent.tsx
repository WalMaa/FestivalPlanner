import { Key, useContext, useState } from "react";
import { FestivalDataContext } from "../page";
import React from "react";
import ArtistList from "./ArtistList";
import Cross from '../images/Cross.svg';


const convertDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const formattedDate = `${day}/${month}`;
    return formattedDate;
};


const FestivalInfoComponent = ({ city }: { city: string }) => {
    const festivalData = useContext(FestivalDataContext);
    const festivalsAtLocation = festivalData.filter((festival: { location: string }) => festival.location === city);
    const initialFestival = festivalsAtLocation.length > 0 ? festivalsAtLocation[0].id : null;
    const [selectedFestival, setSelectedFestival] = useState(initialFestival);

    if (festivalsAtLocation.length === 0) {
        return <div>No festivals available for {city}</div>;
    }

    return (
        <div className="absolute top-1/3 right-1/2 bg-lime-500 rounded-lg p-2 z-20">
            <div className="flex flex-col">
                <div className="flex">
                    {festivalsAtLocation.map((festival: { id: Key; name: string; }) => (
                        <div className="flex-grow" key={festival.id}>
                            <button
                                className={`p-2 border ${selectedFestival === festival.id ? 'bg-red' : ''
                                    }`}
                                onClick={() => setSelectedFestival(festival.id)}
                            >
                                <h2>{festival.name}</h2>
                            </button>
                        </div>
                    ))}
                </div>
                <div>
                    {festivalsAtLocation.map((festival: { id: Key; name: string; artists: string[]; startDate: string; endDate: string; url: string; }) => (
                        <div key={festival.id} className={`${selectedFestival === festival.id ? 'block' : 'hidden'} bg-orange mt-2 rounded-lg p-4`}>
                            <span className="flex justify-center items-center">
                                <h2 className="text-2xl">{festival.name}</h2>
                                <a rel="noopener" target="_blank" href={festival.url}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 m-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                                </svg>
                                </a>

                            </span>

                            <h3>{convertDate(festival.startDate)} - {convertDate(festival.endDate)}</h3>
                            <ArtistList artistIds={festival.artists} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FestivalInfoComponent;
