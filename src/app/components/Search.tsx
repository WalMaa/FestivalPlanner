import Cross from '../assets/images/Cross.svg';
import SearchIcon from '../assets/images/SearchIcon.svg'
import { useRef, useState } from "react";

const Search = () => {

    const [isSearchActive, setSearchActive] = useState(false);
    const searchRef = useRef<HTMLInputElement>(null);


    const icon = isSearchActive ? (
        <Cross className="absolute top-2 right-2 w-10 h-10 text-slate-500"/>) : (
        <SearchIcon className="absolute top-2 right-2 w-10 h-10 text-slate-500"/> 
    )


    function handleSearchClick() {

        console.log('handleSearchClick')
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
        <div className=' mb-24 -top-10 relative md:right-0 right-48 justify-center align-middle flex self-end m-10 delay-150 hover:scale-110 transition-transform duration-300'>
                {/*Search Text Box */}
            <label>
                <input
                    // checks with a ternary operator if the search has been clicked and if true extends the search bar
                    className={`absolute right-0 placeholder:italic placeholder:text-slate-400 block bg-white border
                    border-slate-300 rounded-full py-2 pl-9 pr-3 shadow-md w-0 focus:outline-none focus:ring-teal-100
                    focus:ring-2 text-black h-14 focus:w-64 transition-width duration-300 ${isSearchActive ? 'w-64 ' : ''}`}
                    type='text'
                    ref={searchRef}
                    placeholder='Search'
                    name="search" />
            </label>
            <span className='absolute right-0 flex transition-shadow shadow-lg  hover:ring-2 hover:ring-red-500 duration-300  h-14 w-14 rounded-full py-2 pl-9 pr-3 bg-gradient-to-br from-slate-100 to-slate-300 '>
                <button onClick={handleSearchClick}>
                {icon}
                </button>
            </span>
        </div>
    )
}


export default Search;