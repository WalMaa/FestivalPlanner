import { useEffect, useState } from 'react';
import MemoizedFestivalInfoComponent from './FestivalComponent/FestivalInfoComponent';
import React from 'react';
import Image from 'next/image';

const locations = [
    { city: "Rovaniemi", value: { right: -20, top: 265 } },
    { city: "Oulu", value: { right: 5, top: 328 } },
    { city: "Helsinki", value: { right: 25, top: 620 } },
    { city: "Turku", value: { right: 110, top: 610 } },
    { city: "Tampere", value: { right: 60, top: 555 } },
    { city: "Hyvinkää", value: { right: 45, top: 585 } },
];

const getLocationStyle = (location: string) => {
    const locationStyle = locations.find((loc) => loc.city === location)?.value;
    return locationStyle;
};

const LocationButton = () => {

    const imageRef = React.useRef<HTMLImageElement>(null);
    const [imageDimensions, setImageDimensions] = useState({ width: 500, height: 707 });

    useEffect(() => {
        function handleResize() {
            if (imageRef.current) {
                const { width, height } = imageRef.current.getBoundingClientRect();
                setImageDimensions({ width: width, height: height });
            }
        }
        window.addEventListener('resize', handleResize);
    
        return () => window.removeEventListener('resize', handleResize);
    }   , [imageRef]);

    const [expandedLocation, setExpandedLocation] = useState<string | null>(null);

    const handleExpansionClick = (location: string) => {
        setExpandedLocation(location);
    };

    return (
        <div className="flex justify-center flex-1">
            <Image
                className="absolute"
                src="/images/mapfinland.svg"
                alt="Map of Finland"
                ref={imageRef}
                width={500}
                height={707}
            />
            {locations.map((location) => {
                const isExpanded = expandedLocation === location.city;
                const { right, top } = getLocationStyle(location.city) || {};

                const x = right! * imageDimensions.width / 500;
                const y = top! * imageDimensions.height / 707;
                
                return (
                    // Location buttons
                    <span key={location.city} className='absolute'>
                        <button
                            onClick={() => handleExpansionClick(location.city)}
                            style={{ right: `${x}px`, top: `${y}px` }}
                            aria-roledescription='button'
                            aria-label={location.city}
                            className="z-0 relative w-6 h-6 sm:w-7 sm:h-7 bg-red-400 bg-opacity-95 drop-shadow-lg hover:bg-red-700 hover:border-2 border-red-400 hover:skew-x-0 active:scale-90 -skew-x-[4deg] rounded-full flex items-center group transition-all justify-center hover:scale-125"
                        >
                            <span className="z-0 relative w-5 h-5 sm:w-6 sm:h-6 bg-red-700 hover:blur-[1px] rounded-full flex items-center hover:skew-x-0 -skew-x-[4deg] hover:animate-ping transition-all justify-center hover:scale-125"></span>
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