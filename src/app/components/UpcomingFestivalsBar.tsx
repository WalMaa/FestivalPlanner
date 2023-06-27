import { useContext, useState } from 'react';
import { FestivalDataContext } from '../page';
import Fire from '@/../public/images/Fire.svg'
import { Festival } from '../types';
import { festivalCountdown } from '../utilityFunctions';



const UpcomingFestivalsBar = () => {
    const festivalData = useContext(FestivalDataContext);
    const [isExpanded, setIsExpanded] = useState(false);


    return (
        <div className='flex md:justify-end self-end h-14 flex-1 flex-col z-20 '>
            <div className={`flex transition-all w-80 duration-300 flex-col-reverse p-2 bg-gradient-to-r from-orange-800 via-30% via-orange-700 to-orange-800 m-10
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
                        const daysRemaining = festivalCountdown(festival.startDate, festival.endDate);
                        let hasStarted = false;
                        if (new Date(festival.startDate).getTime() < Date.now()) {
                            hasStarted = true;
                        }

                        return (
                            <li className={`flex h-16 rounded-md shadow-md border-b-1 my-1 px-2 py-1 ${daysRemaining < 0 ? 'bg-gray' : 'bg-white'}`}
                                key={festival.id}>
                                <div className='flex flex-col w-46 overflow-hidden'>
                                    <span className='text-lg truncate text-left'>{festival.name}</span>
                                    <span className='text-slate-400 text-left'>{festival.location} </span>
                                </div>
                                <div className='flex flex-1 items-center justify-end mx-2'>
                                    {hasStarted ? 
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="red" className="w-10 h-10">
                                        <path d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                                        <path d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
                                      </svg>
                                        :
                                        <svg className='h-10 w-10' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6,2H18V8H18V8L14,12L18,16V16H18V22H6V16H6V16L10,12L6,8V8H6V2M16,16.5L12,12.5L8,16.5V20H16V16.5M12,11.5L16,7.5V4H8V7.5L12,11.5M10,6H14V6.75L12,8.75L10,6.75V6Z" /></svg>
                                    }
                                    <span className='text-xl text-right w-8 self-center' >{daysRemaining}</span>
                                </div>

                            </li>)
                    })}

                </ol>
            </div>
        </div>
    );
}

export default UpcomingFestivalsBar;