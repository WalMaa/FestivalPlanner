import { useState } from "react";

const Header = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative z-10">

      <header className={`absolute top-0 left-0 right-0 flex flex-col md:h-20 md:flex-row align-middle transition-width  duration-500 md:bg-gradient-to-r from-orange-800 via-orange-700 h-screen md:shadow-sm md:shadow-orange-800 to-orange-800  px-4 ${isExpanded ? 'w-3/4 md:w-full bg-orange-800 shadow-orange-800' : 'w-20 rounded-br-lg'}`}>
        <button className={` h-20 items-center justify-center`} onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ?
            <svg xmlns="http://www.w3.org/2000/svg" aria-label="Close Menu" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" hover:stroke-white w-10 h-10 hover:-translate-x-1 transition-all duration-300 hover:scale-110">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            :
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" aria-label="Open Menu" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 hover:stroke-red-600 md:hover:stroke-white hover:-skew-x-6 transition-all duration-300 hover:scale-110">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

          }
        </button>
        {isExpanded && (
          //  Expanded View
          <ul className="flex flex-col md:flex-row overflow-hidden flex-1 md:justify-evenly justify-start px-4 py-1 ">
            <li className="flex align-middle ">
              <a
                href="#"
                className=" p-4 hover:text-white transition-colors text-3xl truncate"
              >
                Tietoa
              </a>
            </li>
            <li className="flex align-middle">
              <a
                href="#"
                className=" p-4 hover:text-white transition-colors text-3xl truncate "
              >
                Pimeä Tila
              </a>
            </li>
            <li className="flex align-middle">
              <a
                href="#"
                className=" p-4  text-3xl transition-colors hover:text-white truncate"
              >
                Yhteistiedot
              </a>
            </li>
            <li className="flex align-middle">
              <a
                href="#"
                className=" p-4  text-3xl truncate transition-colors hover:text-white"
              >
                Palaute
              </a>
            </li>
          </ul>
        )
        }
      </header>
    </div>
  )

}

export default Header;