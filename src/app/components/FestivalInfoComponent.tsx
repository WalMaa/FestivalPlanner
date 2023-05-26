import { Key, useContext } from "react";
import { FestivalDataContext } from "../page";


const FestivalInfoComponent = ({ city }: { city: string }) => {

    const festivalData = useContext(FestivalDataContext);

    return (
        //  location == name of the city in the festivalData
        <div className="flex flex-1 bg-red rounded-lg p-2 z-10 pointer-events-none">
            {festivalData
                .filter((festival: { location: string; }) => festival.location === city)
                .map((festival: { id: Key; name: string; startDate: string }) => {
                    return (
                        <span key={festival.id} className="mx-4">
                            <h1>{festival.name}</h1>
                            <h2>{festival.startDate}</h2>
                        </span>
                    );
                }
                )}
        </div>
    );
}

export default FestivalInfoComponent;