"use client"

import React, { createContext, useEffect, useState } from 'react';
import Header from './components/Header';
import Search from './components/Search';
import FilterBar from './components/FilterBar';
import { getArtists, getFestivals } from './api/pocketBase';
import UpcomingFestivalsBar from './components/UpcomingFestivalsBar';
import MapElement from './components/Map/MapElement';
import { Festival, Artist } from './types'

const FestivalContext = React.createContext<Festival [] | null>(null);
const ArtistContext = React.createContext<Artist [] | null>(null);

const Home = () => {

  const [festivalData, setFestivalData] = useState<Festival [] | null>(null);
  const [artistsData, setArtistsData] = useState<Artist [] | null>(null);


  const loadFestivals = async () => {
    try {
      const response: Festival[] | null = await getFestivals() ?? null;
      setFestivalData(response);
    } catch (error) {
      // Handle error
      console.error("Error loading festivals:", error);
    }
  };
  
  const loadArtists = async () => {
    try {
      const response: Artist[] | null = await getArtists() ?? null;
      setArtistsData(response);
    } catch (error) {
      // Handle error
      console.error("Error loading artists:", error);
    }
  }
  
  useEffect(() => {
    // Load artists and festivals concurrently
    Promise.all([loadArtists(), loadFestivals()])
      .then(() => {
        // Both data sets loaded successfully
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      });
  }, []);

  return (
    <FestivalContext.Provider value={festivalData}>
      <ArtistContext.Provider value={artistsData}>
        <div className="flex flex-1 flex-col">
            <Header />

            {/* Middle Content */}

              {/* Filter Bar */}
              <FilterBar />

              <div className='md:flex flex-1 justify-center'>
                {/* Map */}
                  <MapElement />
                {/* Search */}
                <Search />


                {/* Right Side */}
                  <UpcomingFestivalsBar />
              </div>

        </div>
        <div id='portal'></div>
      </ArtistContext.Provider>
    </FestivalContext.Provider>
  );
}
export { Home as default, FestivalContext, ArtistContext }