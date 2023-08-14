import { useContext, useState } from 'react';
import { FestivalContext } from '../page';
import { Festival } from '../types';
import { festivalCountdown } from '../utilityFunctions';
import FestivalTime from './Generic/FestivalTime';
import { MemoizedFestivalInfoComponent } from './Map/MapElement';

const UpcomingFestivalsBar = () => {
    const festivalData = useContext(FestivalContext);
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedFestival, setSelectedFestival] = useState<string | null>(null);

    const handleFestivalClick = (location: string) => {
        if (location) {
            setSelectedFestival(location);
        };
    }


    return (
        <div className='absolute left-1/2 -translate-x-1/2 bottom-10 lg:bottom-28 lg:left-[80%] flex-1 flex-col '>
            <div className={`flex transition-all w-80 duration-300 px-2 flex-col-reverse  bg-gradient-to-r from-orange-800 via-30% via-orange-700 to-orange-800
                  rounded-xl shadow-md ${isExpanded ? 'h-96 pt-3' : 'h-1 sm:h-14'}`}>
                <div className='flex my-1 sm:p-2 justify-center sm:justify-normal items-center'>
                    <button className='h-4 hover:scale-110 transition-all  duration-300' onClick={() => setIsExpanded(!isExpanded)}>
                        {isExpanded ?
                            // Expanded
                            <svg xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                aria-label='Minimize incoming festivals menu'
                                className="w-6 h-6 self-center hover:stroke-red">
                                <path strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                            //  Minimized
                            :
                            <svg xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                aria-label='Open incoming festivals menu'
                                className=" w-8 h-8 sm:w-6 sm:h-6 sm: self-center hover:stroke-red motion-safe:animate-bounce">
                                <path strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                            </svg>
                        }
                    </button>
                    <h3 className={` hidden text-xl sm:block mx-10 my-1 transition-opacity ${isExpanded ? 'opacity-0' : 'opacity-100'}`}>Tulevat Festivaalit</h3>
                </div>
                <ol className='flex flex-1 rounded-md flex-col overflow-y-auto scroll-smooth scrollbar-hide'>
                    {festivalData?.map((festival: Festival) => {
                        const daysRemaining = festivalCountdown(festival.startDate, festival.endDate);

                        return (
                            <li className={`flex h-16 rounded-md active:scale-95 hover:brightness-75 duration-300 transition-[scale, brightness] shadow-md border-b-1 my-1 px-2 py-1 ${daysRemaining < 0 ? 'bg-gray' : 'bg-white'}`}
                                key={festival.id}>
                                <button className='flex flex-1' onClick={() => handleFestivalClick(festival.location)}>
                                    <div className='flex flex-col w-46 overflow-hidden'>
                                        <h4 className='text-lg truncate text-left'>{festival.name}</h4>
                                        <h4 className='text-slate-400 text-left'>{festival.location} </h4>
                                    </div>
                                    <div className='flex flex-1 items-center justify-end gap-2 mr-1'>
                                        <FestivalTime className='' startDate={festival.startDate} endDate={festival.endDate} />
                                    </div>
                                </button>
                            </li>
                        );
                    })}
                </ol>
            </div>
            { selectedFestival && 
                <MemoizedFestivalInfoComponent city={selectedFestival} setExpandedLocation={setSelectedFestival} />
            }
        </div>
    );
}

export default UpcomingFestivalsBar;