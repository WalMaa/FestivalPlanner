"use client"

import React, { createContext, useEffect, useState } from 'react';
import SideBar from './components/SideBar';
import MapImage from "./images/MapFinland.svg"
import Search from './components/Search';
import FilterBar from './components/FilterBar';
import { getFestivals } from './api/pocketBase';
import UpcomingFestivalsBar from './components/UpcomingFestivalsBar';

const FestivalDataContext = createContext<any>(null)

export default function Home() {

  const [festivalData, setFestivalData] = useState<any>([]);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getFestivals();
        setFestivalData(data);
      } catch (error) {
        console.error('Error fetching festival data:', error);
      }
    }
    
    fetchData();
  }, []);
  
  return (
    <FestivalDataContext.Provider value={festivalData}>

    <div className=" flex flex-1 bg-white dark:bg-black h-screen">


      <SideBar />

      {/* Main Content */}
      <div className='flex-grow flex flex-col  '>

        {/* Header */}
        <div className="px-4 flex items-center justify-center h-20">
          <div className="flex-shrink-1 flex items-center">
          </div>
          <div className="ml-6 flex">
            <h1 className="text-3xl font-bold text-black mx-auto">
              Mis Festarit?
            </h1>
          </div>
        </div>


        {/* Middle Content */}
        <div className="flex p-4">
          <div className="flex-col shrink-0 flex-1 w-full px-4 py-6 text-center">

            {/* Filter Bar */}
            <FilterBar />

            <div className='flex flex-1 justify-center'>
              {/* Map */}
              <div className="justify-center flex flex-1 align-middle min-w-0 ">
                <MapImage width="500" strokeWidth='1.5' className={"stroke-black dark:stroke-white hover:scale-105 delay-100 transition-transform fill-none"} />
              </div>
              {/* Search */}
              <Search />
            </div>
          </div>
        </div>

      </div>

      {/* Right Side */}
      <UpcomingFestivalsBar/>



    </div>
    </FestivalDataContext.Provider>
  );
}
export { FestivalDataContext }