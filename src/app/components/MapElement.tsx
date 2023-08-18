import { useEffect, useState } from 'react';
import FestivalInfoComponent from './FestivalComponent/FestivalInfoComponent';
import MapImage from '@/../public/images/MapFinland.svg'
import React from 'react';

export const MemoizedFestivalInfoComponent = React.memo(FestivalInfoComponent);

const locations = [
    { city: "Rovaniemi", value: { right: "15.625rem", top: "16.563rem" } },
    { city: "Oulu", value: { right: "16.563rem", top: "20.625rem" } },
    { city: "Helsinki", value: { right: "17.5rem", top: "38.75rem" } },
    { city: "Turku", value: { right: "23.125rem", top: "38.125rem" } },
    { city: "Tampere", value: { right: "20rem", top: "34.688rem" } },
    { city: "Hyvinkää", value: { right: "18.125rem", top: "36.563rem" } },
];

const getLocationStyle = (location: string) => {
    const foundLocation = locations.find((loc) => loc.city === location);
    return foundLocation ? foundLocation.value : {};
};

const LocationButton = () => {

    const [expandedLocation, setExpandedLocation] = useState<string | null>(null);

    const toggleExpansion = (location: string) => {
        const newExpandedLocation = expandedLocation === location ? null : location;
        setExpandedLocation(newExpandedLocation);
    };

    return (
        <div className="flex justify-center flex-1">
            <MapImage
                strokeWidth="0.5"
                className="stroke-black absolute fill-white overflow-hidden"
                width="500"
            />

            {locations.map((location) => {
                const locationStyle = getLocationStyle(location.city);
                const isExpanded = expandedLocation === location.city;

                return (
                    // Location buttons
                    <span key={location.city} className='w-0 h-0'>
                        <button
                            onClick={() => toggleExpansion(location.city)}
                            style={locationStyle}
                            aria-roledescription='button'
                            aria-label={location.city}
                            className="z-0 relative translate-x-[15rem] w-7 h-7 bg-red-400 bg-opacity-95 drop-shadow-lg hover:bg-red-700 hover:border-2 border-red-400 hover:skew-x-0 active:scale-90 -skew-x-[4deg] rounded-full flex items-center group transition-all justify-center hover:scale-125"
                        >
                            <span className="z-0 relative w-6 h-6 bg-red-700 hover:blur-[1px] rounded-full flex items-center hover:skew-x-0 -skew-x-[4deg] hover:animate-ping transition-all justify-center hover:scale-125"></span>
                        </button>
                        {
                            isExpanded
                            && <div className={`duration-500 transition-all ${isExpanded ? 'visible opacity-100' : 'invisible opacity-0'}`}>
                                <MemoizedFestivalInfoComponent location={location.city} setExpandedLocation={setExpandedLocation} />
                            </div>
                        }
                    </span>
                );
            })}
        </div>
    );
};

export default LocationButton;