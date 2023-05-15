"use client"

import React from 'react';
import SideBar from './SideBar';
import MapImage from "./images/MapFinland.svg"
import Search from './Search';

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
              Kuukaudet
            </h1>
          </div>
        </div>


        {/* Middle Content */}
        <div className=" p-4">
          <div className="flex-col flex-1 w-full px-4 py-6 sm:px-0 text-center">

            {/* Filter Bar */}
            <div className='flex bg-red mx-auto justify-around p-4'>
              <li>Text</li>
              <li>Text</li><li>Text</li><li>Text</li>
            </div>

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
      <div className='flex flex-1 bg-black'>

      </div>


    </div>
  );
}