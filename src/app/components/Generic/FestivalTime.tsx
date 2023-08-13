import React from 'react'

export default function FestivalTime({startDate, endDate, className}: {startDate: string, endDate: string, className: string}) {
    const startDateParsed = new Date(startDate).getTime();
    const currentDate = Date.now();
    let timeDifference: number;
    let onGoing: boolean = false;
    let text: string = 'Pv jäljellä';

    // if the festival has already started. Use the endDate instead.
    if (currentDate > startDateParsed) {
        onGoing = true;
        let endDateParsed = new Date(endDate).getTime();
        timeDifference = endDateParsed - currentDate;
        text = 'Pv Käynnissä';
        if (currentDate > endDateParsed) {
            text = 'Pv sitten';
        }
    } else {
        timeDifference = startDateParsed - currentDate;
    }
    const daysRemaining = Math.ceil(Math.abs(timeDifference / (1000 * 60 * 60 * 24)));

  return (
    <span className={className}>
    <h3 >{Math.abs(daysRemaining) + ' ' + text}</h3>
    </span>
  )
}
