"use client"

import { useState } from "react";

const Search = () => {



    const [searchActive, setSearchActive] = useState(false);

    function toggleSearch() {
        console.log('Search clicked');
        setSearchActive(!searchActive)
    }

    return (
        <div className='relative justify-center align-middle flex self-end m-10 delay-150 hover:scale-110 transition-transform duration-300 group'>
            <label>
                <input
                       // checks with a ternary operator if the search has been clicked and if true extends the search bar
                    className={`absolute right-0 placeholder:italic placeholder:text-slate-400 block bg-white border
                    border-slate-300 rounded-full py-2 pl-9 pr-3 shadow-md w-0 focus:outline-none focus:border-sky-200focus:ring-sky-200
                    focus:ring-1 text-black h-14 focus:w-64 ${searchActive ? 'w-64 transition-width duration-300': 'transition-width duration-300'}`}
                    type='text'
                    placeholder='Search'
                    onBlur={toggleSearch}
                    name="search" />
            </label>
            <div className='absolute right-0 flex transition-shadow shadow-lg duration-300  h-14 w-14 rounded-full py-2 pl-9 pr-3 bg-gradient-to-br from-slate-100 to-slate-300 '>
                <button onClick={toggleSearch}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="absolute top-2 right-2 w-10 h-10 text-slate-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </button>
            </div>
        </div>
    )
}


export default Search;