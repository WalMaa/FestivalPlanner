import {useState } from 'react';
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
    const [selectedFestival, setSelectedFestival] = useState<null | string>(null);
    
    const MemoizedFestivalInfoComponent = React.memo(FestivalInfoComponent);
    
    const toggleExpansion = (location: string) => {
        const newExpandedLocation = expandedLocation === location ? null : location;
        setExpandedLocation(newExpandedLocation);
    };
    
    return (
        <div className="flex justify-center flex-1">
            <MapImage
                strokeWidth="1.5"
                className="stroke-black fill-none"
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
                            className="z-0 relative w-7 h-7 bg-red-400 bg-opacity-95 drop-shadow-lg hover:bg-red-700 hover:border-2 border-red-400 hover:skew-x-0 active:scale-90 -skew-x-[4deg] rounded-full flex items-center group transition-all justify-center hover:scale-125"
                        >
                          <span className="z-0 relative w-6 h-6 bg-red-700 hover:blur-[1px] rounded-full flex items-center hover:skew-x-0 -skew-x-[4deg] hover:animate-ping transition-all justify-center hover:scale-125"></span>
                        </button>
                        {
                            isExpanded
                                && <div className={`duration-500 transition-[opacity] ${isExpanded ? 'visible opacity-100' : 'invisible opacity-0'}`}>
                                    <MemoizedFestivalInfoComponent city={location.city} festival={selectedFestival} setExpandedLocation={setExpandedLocation}/>
                                </div>
                        }
                    </span>
                );
            })}
        </div>
    );
};

export default LocationButton;