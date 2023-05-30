import { useContext, useState } from 'react';
import { FestivalDataContext } from '../page';
import Fire from '../assets/images/Fire.svg'
import HourGlass from '../assets/images/HourGlass.svg'
import { Festival } from '../types';

const UpcomingFestivalsBar = () => {
    const festivalData = useContext(FestivalDataContext);
    const [isExpanded, setIsExpanded] = useState(false);


    return (
        <div className='flex justify-end align-bottom flex-col '>
            <div className={`flex transition-all w-80 duration-300 flex-col-reverse p-2 bg-gray m-10
                  rounded-xl shadow-md ${isExpanded ? 'h-96' : 'h-14'}`}>
                <div className='flex my-1 items-center'>
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
                                className="w-6 h-6 self-center hover:stroke-red motion-safe:animate-bounce">
                                <path strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                            </svg>
                        }
                    </button>
                    <h3 className={`text-xl mx-10 my-1 transition-opacity ${isExpanded ? 'opacity-0' : 'opacity-100'}`}>Tulevat Festivaalit</h3>
                </div>
                <ol className='flex flex-1 flex-col overflow-y-auto scroll-smooth scrollbar-hide'>
                    {festivalData?.map((festival: Festival) => {
                        let startDate = new Date(festival.startDate).getTime();
                        let currentDate = Date.now();
                        let timeDifference;
                        let Icon;

                        // if the festival has already started. Use the endDate instead and the Icon is changed accordingly.
                        if (currentDate > startDate) {
                            let endDate = new Date(festival.endDate).getTime();
                            timeDifference = endDate - currentDate;
                            Icon = Fire
                        } else {
                            Icon = HourGlass
                            timeDifference = startDate - currentDate;
                        }
                        const daysRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

                        return (

                            <li className='flex h-16 bg-white rounded-md shadow-md border-b-1 my-1 px-2 py-1'
                                key={festival.id}>
                                <div className='flex flex-col w-46 overflow-hidden'>
                                    <span className='text-lg truncate text-left'>{festival.name}</span>
                                    <span className='text-slate-400 text-left'>{festival.location} </span>
                                </div>
                                <div className='flex flex-1 justify-end mx-2'>
                                    <Icon width="38" />
                                    <span className='text-xl text-right w-10 self-center' >{daysRemaining}</span>
                                </div>

                            </li>)
                    })}

                </ol>
            </div>
        </div>
    );
}

export default UpcomingFestivalsBar;