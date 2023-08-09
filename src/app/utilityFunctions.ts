export const convertDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const formattedDate = `${day}/${month}`;
    return formattedDate;
};

export const parseSpotifyId = (spotifyUrl: string) => {
    const artistId = spotifyUrl.split('/artist/')[1]?.split('?')[0];
    return artistId;
};

export const festivalCountdown = (startDate: string, endDate: string): number => {
    const startDateParsed = new Date(startDate).getTime();
    const currentDate = Date.now();
    let timeDifference;

    // if the festival has already started. Use the endDate instead.
    if (currentDate > startDateParsed) {
        let endDateParsed = new Date(endDate).getTime();
        timeDifference = endDateParsed - currentDate;
    } else {
        timeDifference = startDateParsed - currentDate;
    }
    const daysRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return daysRemaining;
};