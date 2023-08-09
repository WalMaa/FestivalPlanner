"use client"

import React, { createContext, useEffect, useState } from 'react';
import Header from './components/Header';
import Search from './components/Search';
import FilterBar from './components/FilterBar';
import { getArtists, getFestivals } from './api/pocketBase';
import UpcomingFestivalsBar from './components/UpcomingFestivalsBar';
import MapElement from './components/Map/MapElement';
import { Festival, Artist } from './types'

const FestivalDataContext = createContext< Festival [] | null>(null);
const ArtistsDataContext = createContext< Artist [] | null>(null);

export default function Home() {


  const [festivalData, setFestivalData] = useState<any>([]);
  const [artistsData, setArtistsData] = useState<any>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const dataFestival = await getFestivals();
        setFestivalData(dataFestival);
        const dataArtists = await getArtists();
        setArtistsData(dataArtists);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <FestivalDataContext.Provider value={festivalData}>
      <ArtistsDataContext.Provider value={artistsData}>
        <div className="flex flex-1 flex-col ">

            <Header />

            {/* Middle Content */}

              {/* Filter Bar */}
              <FilterBar />

              <div className='md:flex flex-1 justify-center'>
                  <div className='sm:flex sm:flex-1'></div>
                {/* Map */}
                  <MapElement />
                {/* Search */}
                <Search />


                {/* Right Side */}
                  <UpcomingFestivalsBar />
              </div>

        </div>
        <div id='portal'></div>

      </ArtistsDataContext.Provider>
    </FestivalDataContext.Provider>
  );
}
export { FestivalDataContext, ArtistsDataContext }