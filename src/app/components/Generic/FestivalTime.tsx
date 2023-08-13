import React from 'react'

export default function FestivalTime({ startDate, endDate, className }: { startDate: string, endDate: string, className: string }) {
  const startDateParsed = new Date(startDate).getTime();
  const currentDate = Date.now();
  let timeDifference: number;
  let festivalStatus: ('ongoing' | 'upcoming' | 'past') = 'upcoming';
  let text: string = 'Pv jäljellä';

  // if the festival has already started. Use the endDate instead.
  if (currentDate > startDateParsed) {
    let endDateParsed = new Date(endDate).getTime();
    timeDifference = endDateParsed - currentDate;
    text = 'Pv Käynnissä';
    festivalStatus = 'ongoing';
    if (currentDate > endDateParsed) {
      text = 'Pv sitten';
      festivalStatus = 'past';
    }
  } else {
    timeDifference = startDateParsed - currentDate;
  }
  const daysRemaining = Math.ceil(Math.abs(timeDifference / (1000 * 60 * 60 * 24)));

  return (
    <span className={className + ' flex items-center gap-1'}>
      <h3 >{Math.abs(daysRemaining) + ' ' + text}</h3>
      {festivalStatus === 'ongoing' ?
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="red" className="w-8 h-8">
          <path d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
          <path d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
        </svg>
        : festivalStatus === 'past' ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
        </svg>
          :
          <svg className='h-8 w-8' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6,2H18V8H18V8L14,12L18,16V16H18V22H6V16H6V16L10,12L6,8V8H6V2M16,16.5L12,12.5L8,16.5V20H16V16.5M12,11.5L16,7.5V4H8V7.5L12,11.5M10,6H14V6.75L12,8.75L10,6.75V6Z" /></svg>
      }
    </span>
  )
}
