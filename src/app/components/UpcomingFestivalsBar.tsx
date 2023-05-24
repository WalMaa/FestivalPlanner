import { useContext, useState } from 'react';
import { FestivalDataContext } from '../page';
import Fire from '../images/Fire.svg'
import HourGlass from '../images/HourGlass.svg'

const UpcomingFestivalsBar = () => {
    const festivalData = useContext(FestivalDataContext);
    const [isExpanded, setIsExpanded] = useState(false);


    return (
        <div className='flex flex-1 justify-end align-bottom flex-col '>
                <div className={`transition-all  duration-300 flex flex-col-reverse p-2 bg-yellow m-10
                  rounded-xl shadow-md max-w-sm ${isExpanded ? 'h-96' : 'h-14'}`}>
                    <button onClick={() => setIsExpanded(!isExpanded)}>
                        {isExpanded ?
                            // Expanded
                            <svg xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 self-center">
                                <path strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                            //  Minimized
                            : <div className='flex'>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 self-center">
                                <path strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                            </svg>
                            <div className='flex align-middle justify-center'>
                            <h3 className='text-lg mx-10 my-1'>Tulevat Festivaalit</h3>
                            </div>
                                </div>
                            }
                    </button>
                    <ol className='flex flex-1 flex-col overflow-y-auto scrollbar-hide'>
                        {festivalData.map((festival: any) => {
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

                                <li className='flex h-16 bg-red rounded-md border-b-1 my-1 px-2 py-1'
                                    key={festival.id}>
                                    <div className='flex flex-col w-46 overflow-hidden'>
                                        <span className='text-lg truncate'>{festival.name}</span>
                                        <span className='text-slate-400'>{festival.location} </span>
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