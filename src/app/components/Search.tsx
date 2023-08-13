import { ArtistsDataContext, FestivalDataContext } from '../page';
import { Artist, Festival } from '../types';
import Cross from '/public/images/Cross.svg';
import SearchIcon from '/public/images/SearchIcon.svg'
import { useContext, useMemo, useRef, useState } from "react";

const Search = () => {

    const [isSearchActive, setSearchActive] = useState(false);
    const [query, setQuery] = useState('');
    const searchRef = useRef<HTMLInputElement>(null);
    const festivals: null | Festival[] = useContext(FestivalDataContext);
    const artists: null | Artist[] = useContext(ArtistsDataContext);

    const filteredItems = useMemo(() => {
        return festivals?.filter((festival) => {
            return festival.name.toLowerCase().includes(query.toLowerCase())
        })
    }, [festivals, query])


    const icon = isSearchActive ? (
        <Cross className="absolute top-2 right-2 w-10 h-10 text-slate-500" />) : (
        <SearchIcon className="absolute top-2 right-2 w-10 h-10 text-slate-500" />
    )


    function handleSearchClick() {
        if (isSearchActive) {
            setSearchActive(false);
        } else {
            setSearchActive(true)
            if (searchRef.current?.focus) {
                searchRef.current.focus();
            }
        }
    }

    return (
        <div className=' mb-24 -top-10 sticky justify-center align-middle flex self-end m-10 delay-150  transition-transform duration-300'>
            {/*Search results */}
             <ul className={`absolute flex flex-col-reverse scroll-smooth scrollbar-thin scrollbar-thumb-zinc-200 scrollbar-track-transparent bottom-0 right-0 transition-[max-height, opacity] duration-300 w-64 max-h-64 overflow-auto border border-b-0 border-slate-300 bg-white rounded-t-lg z-20 
             ${isSearchActive ? 'visible' : 'max-h-0 opacity-0'}`}>
                {filteredItems?.map((festival: Festival) => (
                    
                    <li key={festival.id} className='flex flex-col group hover:bg-zinc-200'>
                    <button onClick={() => {console.log(festival.name)}} className='flex justify-start transition-colors'><h2 className='text-lg mt-1 ml-5'>{festival.name}</h2></button>
                    <span className='bg-slate-300 group-hover:bg-red-400 self-center transition-[width] group-hover:w-full w-10/12 h-[1px]'></span>
                    </li>
                ))}
            </ul>
            
            {/*Search Text Box */}
            <label aria-label='search'>
                <input
                    // checks with a ternary operator if the search has been clicked and if true extends the search bar
                    className={`absolute right-0 placeholder:italic placeholder:text-slate-400 block bg-white border-t-0 border
                    border-slate-300 rounded-full py-2 pl-5 pr-3 shadow-md w-14 focus:outline-none focus:ring-teal-100
                    focus:ring-1 text-black text-lg h-14 focus:w-64 transition-width duration-300 ${isSearchActive ? 'w-64 rounded-t-none rounded-b-lg' : ''}`}
                    onChange={(event) => setQuery(event.target.value)}
                    type='search'
                    autoComplete="off"
                    ref={searchRef}
                    placeholder={`${isSearchActive ? 'Search' : ''}`}
                    name="search" />
            </label>
            <span className={`absolute right-0 flex transition-shadow duration-300 h-14 w-14 rounded-full py-2 pl-9 pr-3 bg-white 
            ${!isSearchActive ? 'transition-transform hover:ring-2 hover:ring-red-500 shadow-lg hover:scale-110' : 'border-slate-300 border-b rounded-br-lg rounded-none'}`}>
                <button onClick={handleSearchClick}>
                    {icon}
                </button>
            </span>
        </div>
    )
}


export default Search;

