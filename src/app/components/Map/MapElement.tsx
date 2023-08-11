import { useState } from 'react';
import FestivalInfoComponent from './FestivalInfoComponent';
import MapImage from '@/../public/images/MapFinland.svg'
import React from 'react';

const locations = [
    { city: "Rovaniemi", value: { right: "250px", top: "265px" } },
    { city: "Oulu", value: { right: "265px", top: "330px" } },
    { city: "Helsinki", value: { right: "280px", top: "620px" } },
    { city: "Turku", value: { right: "370px", top: "610px" } },
    { city: "Tampere", value: { right: "320px", top: "555px" } },
    { city: "Hyvinkää", value: { right: "290px", top: "585px" } },
];

const getLocationStyle = (location: string) => {
    const foundLocation = locations.find((loc) => loc.city === location);
    return foundLocation ? foundLocation.value : {};
};


const LocationButton = () => {

    const [expandedLocation, setExpandedLocation] = useState<null | string>(null);

    const toggleExpansion = (location: string) => {
        const newExpandedLocation = expandedLocation === location ? null : location;
        setExpandedLocation(newExpandedLocation);
    };

    const selectFestival = (festival: string) => {
        setExpandedLocation(festival);
    };

    const MemoizedFestivalInfoComponent = React.memo(FestivalInfoComponent);

    return (
        <div className="flex justify-center flex-1">
            <MapImage
                strokeWidth="1.5"
                className="stroke-black fill-none "
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
                            className="z-0 relative w-7 h-7 bg-red-500 rounded-full shadow-md flex items-center group transition-all justify-center hover:scale-125"
                        >
                            <span className="z-0 relative w-5 h-5 bg-red-500 rounded-full flex items-center hover:animate-ping transition-all justify-center hover:scale-125"></span>
                        </button>
                        {
                            isExpanded
                                ? <div className={`duration-500 ${isExpanded ? 'visible opacity-100' : 'invisible opacity-0'}`}>
                                    <MemoizedFestivalInfoComponent city={location.city} setExpandedLocation={setExpandedLocation} />
                                </div>
                                : undefined
                        }
                    </span>
                );
            })}
        </div>
    );
};


export default LocationButton;
