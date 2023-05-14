import Image from 'next/image';
import mapImage from './images/MapFinland.svg';
import SideBar from './SideBar';

export default function Home() {
  return (
    <div className=" flex flex-1 bg-gray-100 h-screen">


      <SideBar />

      {/* Main Content */}
      <div className='flex-grow flex flex-col  '>

        {/* Header */}
        <nav className="px-4 flex items-center justify-around h-20">
          <div>
            <div className="flex-shrink-1 flex items-center">
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <h1 className="text-3xl font-bold text-gray-800 mx-auto">
                Kuukaudet
              </h1>
            </div>
          </div>
        </nav>


        {/* Middle Content */}
        <div className="flex-grow bg-gray-100 p-4 overflow-hidden">
          <div className="flex-col flex-1 w-full px-4 py-6 sm:px-0 text-center">

            {/* Filter Bar */}
            <div className='flex bg-red mx-auto justify-around p-4'>
              <li>Text</li>
              <li>Text</li><li>Text</li><li>Text</li>
            </div>

            <div className='flex flex-1 justify-center'>
              {/* Map */}
            <div className="justify-center align-middle min-w-0">
              <Image width={500} className='hover:scale-105 transition-transform fill-none delay-100' src={mapImage} alt="map of finland" />
            </div>

            {/* Search */}
            <div className='flex self-end relative mb-10'>
              <label className='flex-1'>
                <input
                  className='placeholder:italic placeholder:text-slate-400 block bg-white w-full border
                border-slate-300 rounded-full py-2 pl-9 pr-3 shadow-md transition ease-in-out delay-150 hover:-translate-y-0.5 hover:scale-110 focus:outline-none focus:border-sky-200
                focus:ring-sky-200 focus:ring-1 sm:text h-14 '
                  type='text'
                  placeholder='Search'
                  name="search"/>
              </label>
              <div className='absolute inset right-0 bg-slate-300 shadow-lg  h-14 w-14 rounded-full py-2 pl-9 pr-3 bg-gradient-to-br from-slate-200 to-slate-300'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="absolute inset right-2  w-10 h-10 text-slate-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              </div>
            </div>
            </div>

          </div>
        </div>

      </div>



    </div>
  );
}