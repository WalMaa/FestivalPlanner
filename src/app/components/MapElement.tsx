import { useState } from 'react';
import FestivalInfoComponent from './FestivalInfoComponent';
import MapImage from "../images/MapFinland.svg";

const locations = [
    { city: "Oulu", value: { right: "265px", top: "325px" } },
    { city: "Helsinki", value: { right: "310px", top: "615px" } },
    { city: "Turku", value: { right: "425px", top: "600px" } },
    { city: "Tampere", value: { right: "410px", top: "540px" } },
];

const getLocationStyle = (location: string) => {
    const foundLocation = locations.find((loc) => loc.city === location);
    return foundLocation ? foundLocation.value : {};
};

const LocationButton = () => {

    const [expandedLocation, setExpandedLocation] = useState<null | string>(null);

    const toggleExpansion = (location: string) => {
        setExpandedLocation((prevLocation) => (prevLocation === location ? null : location));
    };

    return (
        <span className="flex">
            <MapImage width="500" strokeWidth="1.5" className="stroke-black dark:stroke-white fill-none" />
            {locations.map((location, index) => {
                const locationStyle = getLocationStyle(location.city);
                const isExpanded = expandedLocation === location.city;

                return (
                    <div key={location.city}>
                        <button
                            onClick={() => toggleExpansion(location.city)}
                            style={locationStyle}
                            className="relative w-7 h-7 bg-red rounded-full flex items-center transition-all justify-center hover:scale-125 z-10"
                        >
                            <span className="relative w-5 h-5 bg-red rounded-full flex items-center hover:animate-ping transition-all justify-center hover:scale-125"></span>
                        </button>
                        <div className={isExpanded ? 'block' : 'hidden'}>
                            <FestivalInfoComponent city={location.city} />
                        </div>
                    </div>
                );
            })}
        </span>
    );
};

export default LocationButton;
