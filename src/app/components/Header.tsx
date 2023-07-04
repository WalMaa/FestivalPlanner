import { useState } from "react";

const Header = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative z-10">

      <header className={`absolute top-0 left-0 right-0 flex flex-col md:h-20 md:flex-row align-middle transition-width duration-500 from-orange-800 via-orange-700 h-screen to-orange-800  px-3 ${isExpanded ? 'w-3/4 md:w-fit md:bg-transparent bg-orange-800 shadow-orange-800' : 'w-20 md:w-full rounded-br-lg'}`}>
        <div className="flex items-center">
          <button aria-label="toggle sidebar" className={` h-20 items-center justify-center mr-2`} onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ?
              <svg xmlns="http://www.w3.org/2000/svg" aria-label="Close Menu" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="md:hidden hover:stroke-white w-10 h-10 hover:-translate-x-1 transition-all duration-300 hover:scale-110">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              :
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" aria-label="Open Menu" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="md:hidden w-10 h-10 hover:stroke-red-600 md:hover:stroke-white hover:-skew-x-6 transition-all duration-300 hover:scale-110">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>

            }
          </button>
          <h1 className={`text-3xl text-center font-semibold line-clamp-1 ${!isExpanded && 'text-transparent md:text-current'}`}>
            Mis Festarit?
          </h1>
        </div>

        <>
          <ul className={`flex flex-col md:flex-row md:gap-24 py-6 gap-4 overflow-hidden mx-2 flex-1 md:px-16 md:items-center justify-start ${!isExpanded && 'w-0'} `}>
            <li>
              <a
                href="#"
                className="md:hover:text-red-600 hover:text-white transition-colors md:text-2xl text-3xl truncate"
              >
                Tietoa
              </a>
            </li>
            <li>
              <a
                href="#"
                className="md:text-2xl text-3xl transition-colors md:hover:text-red-600 hover:text-white truncate"
              >
                Yhteistiedot
              </a>
            </li>
            <li>
              <a
                href="#"
                className="md:text-2xl text-3xl truncate transition-colors md:hover:text-red-600 hover:text-white"
              >
                Palaute
              </a>
            </li>
          </ul>
        </>
      </header>
    </div>
  )

}

export default Header;