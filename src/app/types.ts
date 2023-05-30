export interface Festival {
    id: string;
    name: string;
    location: string;
    startDate: string;
    endDate: string;
    url: string;
    artists: string [];
}

export interface Artist {
    id: string;
    name: string;
    spotifyId: string;
  }