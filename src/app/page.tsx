"use client"

import React from 'react';
import SideBar from './components/SideBar';
import MapImage from "./images/MapFinland.svg"
import Search from './components/Search';
import FilterBar from './components/FilterBar';
import { festivals } from './festivals/festivalData'

export default function Home() {

  function handleClick() {
    console.log("Clicked");
  }





  return (
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
        <div className=" p-4">
          <div className="flex-col flex-1 w-full px-4 py-6 sm:px-0 text-center">

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
      <div className='flex flex-1 justify-end align-bottom flex-col'>
        <div className='flex p-2 bg-yellow m-10 h-96 rounded-xl shadow-md align-bottom'>
          <ol className='flex flex-1 flex-col-reverse'>
            {festivals.map(festival => {
              let startDate = new Date(festival.startDate).getTime();
              let currentDate = Date.now();
              let timeDifference = startDate - currentDate
              const daysRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

              return (
                <li className='bg-red rounded-md border-b-1 my-1 p-1'
                  key={festival.id}>
                    <div>
                  <span className='text-lg'>{festival.name}</span> 
                  <span className='text-right'>{daysRemaining}</span>
                    </div>
                  <span className='text-slate-400'>{festival.location} </span> 

                </li>
              )
            })}

          </ol>
        </div>
      </div>


    </div>
  );
}