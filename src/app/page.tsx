"use client"

import React, { createContext, useEffect, useState } from 'react';
import Header from './components/Header';
import MapImage from "./images/MapFinland.svg"
import Search from './components/Search';
import FilterBar from './components/FilterBar';
import { getArtists, getFestivals } from './api/pocketBase';
import UpcomingFestivalsBar from './components/UpcomingFestivalsBar';

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
                <div className=" flex flex-1 justify-center hover:scale-105 delay-100 transition-transform group">
                  <MapImage width="500" strokeWidth="1.5" className="stroke-black dark:stroke-white  fill-none" />

                    {/* Oulu */ }
                  <button style={{ right: "265px", top: "325px" }} className="relative w-7 h-7 bg-red rounded-full flex items-center transition-all justify-center hover:scale-125">
                    <span className="relative w-5 h-5 bg-red rounded-full flex items-center hover:animate-ping transition-all justify-center hover:scale-125"></span>
                    {/* Add your button content here */}
                  </button>

                    {/* Helsinki */}
                  <button style={{ right: "310px", top: "615px" }} className="relative w-7 h-7 bg-red rounded-full flex items-center transition-all justify-center hover:scale-125">
                    <span className="relative w-5 h-5 bg-red rounded-full flex items-center hover:animate-ping transition-all justify-center hover:scale-125"></span>
                    {/* Add your button content here */}
                  </button>

                    {/* Turku */}
                  <button style={{ right: "425px", top: "600px" }} className="relative w-7 h-7 bg-red rounded-full flex items-center transition-all justify-center hover:scale-125">
                    <span className="relative w-5 h-5 bg-red rounded-full flex items-center hover:animate-ping transition-all justify-center hover:scale-125"></span>
                    {/* Add your button content here */}
                  </button>


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