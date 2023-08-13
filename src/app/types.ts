export interface Festival {
    id: string;
    name: string;
    location: string;
    startDate: string;
    endDate: string;
    url: string;
    artists: string [] | null;
}

export interface Artist {
    id: string;
    name: string;
    spotifyId: string;
  }