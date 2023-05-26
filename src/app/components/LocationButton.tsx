import { useContext, useState } from 'react';
import { FestivalDataContext } from '../page';
import FestivalInfoComponent from './FestivalInfoComponent';

const locations = [
    { city: "Oulu", value: { right: "265px", top: "325px" } },
    { city: "Helsinki", value: { right: "310px", top: "615px" } },
    { city: "Turku", value: { right: "425px", top: "600px" } },
    { city: "Tampere", value: { right: "410px", top: "540px" } },
]

const getLocationStyle = (location: string) => {
    const foundLocation = locations.find((loc) => loc.city === location);
    return foundLocation ? foundLocation.value : {};
};

const LocationButton = () => {

    const festivalData = useContext(FestivalDataContext);

    {/* The expansion state of all the individual buttons */ }
    const [expandedStates, setExpandedStates] = useState(
        locations.map(() => false)
    );
    const [hoveredIndex, setHoveredIndex] = useState<null | number>(null);

    const toggleExpansion = (index: number) => {
        const updatedStates = [...expandedStates];
        updatedStates[index] = !updatedStates[index];
        setExpandedStates(updatedStates);
    };

    const handleMouseEnter = (index: number) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    return (

        <span className="flex">
            {locations.map((location, index) => {
                const locationStyle = getLocationStyle(location.city);
                const isExpanded = expandedStates[index];
                const isHovered = hoveredIndex === index;

                return (
                    <button
                        key={location.city}
                        onClick={() => toggleExpansion(index)}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                        style={locationStyle}
                        className='relative w-7 h-7 bg-red rounded-full flex items-center transition-all justify-center hover:scale-125'>

                        <span className="relative w-5 h-5 bg-red rounded-full flex items-center hover:animate-ping transition-all justify-center hover:scale-125"></span>
                        {isExpanded && (
                            <FestivalInfoComponent city={location.city} />
                        )}
                        {isHovered && (
                            <span className="absolute top-6" aria-hidden={!isHovered}>
                                {location.city}
                            </span>
                        )}
                    </button>
                )
            })}
        </span>
    );
};

export default LocationButton;