import { useState } from "react";


const Header = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex relative">

      <header className={`flex align-middle transition-all duration-500 bg-orange h-20 px-4 ${isExpanded ? 'w-full' : 'w-24 rounded-br-lg'}`}>
        <button className={` items-center justify-center ${isExpanded ? undefined : 'flex flex-1'}`} onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ?
            <svg xmlns="http://www.w3.org/2000/svg" aria-label="Close Menu" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/>
            </svg>
            :
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" aria-label="Open Menu" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
            </svg>

          }
        </button>
        {isExpanded && (
          //  Expanded View
          <ul className="flex overflow-hidden flex-1 justify-evenly px-4 py-1 max-h-14 ">
            <li className="flex align-middle">
              <a
                href="#"
                className=" p-4 text-gray-800 text-3xl hover:bg-gray-200 rounded-xl"
              >
                Tietoa
              </a>
            </li>
            <li className="flex align-middle">
              <a
                href="#"
                className=" p-4 overflow text-gray-800 text-3xl hover:bg-gray-200 rounded-xl"
              >
                Pimeä Tila
              </a>
            </li>
            <li className="flex align-middle">
              <a
                href="#"
                className=" p-4 text-gray-800 text-3xl hover:bg-gray-200 rounded-xl"
              >
                Yhteistiedot
              </a>
            </li>
            <li className="flex align-middle">
              <a
                href="#"
                className=" p-4 text-gray-800 text-3xl hover:bg-gray-200 rounded-xl"
              >
                Palaute
              </a>
            </li>
          </ul>
        )
        }

        <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
          <h1 className={`text-3xl font-bold text-black m-auto transition-opacity duration-300 ${isExpanded ? 'opacity-0' : 'opacity-100'}`}>
            Mis Festarit?
          </h1>
        </div>
      </header>
    </div>
  )

}

export default Header;