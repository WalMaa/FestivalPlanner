"use client"

import React, { createContext, useEffect, useState } from 'react';
import Header from './components/Header';
import Search from './components/Search';
import FilterBar from './components/FilterBar';
import { getArtists, getFestivals } from './api/pocketBase';
import UpcomingFestivalsBar from './components/UpcomingFestivalsBar';
import MapElement from './components/MapElement';

const FestivalDataContext = createContext<any>(null);
const ArtistsDataContext = createContext<any>(null);

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
        <div className=" flex flex-1 bg-white dark:bg-black h-screen">

          <div className='flex-1 flex flex-col  '>

            <Header />

            {/* Middle Content */}
            <div className="flex-col shrink-0 flex-1 w-full px-2 py-6 text-center">

              {/* Filter Bar */}
              <FilterBar />

              <div className='flex flex-1 justify-center'>
                <div className='flex flex-1'>

                </div>

                {/* Map */}
                <div className=" flex flex-1 justify-center">
                  <MapElement />
                </div>
                {/* Search */}
                <Search />

                {/* Right Side */}
                <div className='flex flex-1 justify-end'>
                  <UpcomingFestivalsBar />
                </div>
              </div>
            </div>

          </div>
        </div>

      </ArtistsDataContext.Provider>
    </FestivalDataContext.Provider>
  );
}
export { FestivalDataContext, ArtistsDataContext }