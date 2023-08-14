import { ArtistContext, FestivalContext } from '../page';
import { Artist, Festival } from '../types';
import { MemoizedFestivalInfoComponent } from './Map/MapElement';
import Cross from '/public/images/Cross.svg';
import SearchIcon from '/public/images/SearchIcon.svg'
import { useContext, useMemo, useRef, useState } from "react";

const Search = () => {

    const [isSearchActive, setSearchActive] = useState(false);
    const [query, setQuery] = useState('');
    const searchRef = useRef<HTMLInputElement>(null);
    const festivals: null | Festival[] = useContext(FestivalContext);
    const artists: null | Artist[] = useContext(ArtistContext);
    const [selectedFestival, setSelectedFestival] = useState<string | null>(null);
    const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

    const artistsFestival = useMemo(() => {
        let tempFestivals: Festival[] = [];
        if (festivals && selectedArtist) {
            for (let index = 0; index < festivals.length; index++) {
                if (festivals[index].artists?.includes(selectedArtist?.id)) {
                    tempFestivals.push(festivals[index]);
                }
            }
            return tempFestivals;
        }
    }, [festivals, selectedArtist]);


    const combinedArray = useMemo(() => {
        if ((festivals && artists) && !null) {
            return [...festivals, ...artists];
        } else {
            return [];
        }
    }, [festivals, artists]);

    // returns an array of objects that match the search query
    const filteredItems = useMemo(() => {
        return combinedArray?.filter((object) => {
            return object?.name.toLowerCase().includes(query.toLowerCase())
        })
    }, [query, combinedArray])


    const icon = isSearchActive ? (
        <Cross className="absolute top-2 right-2 w-10 h-10 text-slate-500" />) : (
        <SearchIcon className="absolute top-2 right-2 w-10 h-10 text-slate-500" />
    )


    function handleSearchClick() {
        if (isSearchActive) {
            setSelectedArtist(null);
            setSearchActive(false);
        } else {
            setSearchActive(true)
            if (searchRef.current?.focus) {
                searchRef.current.focus();
            }
        }
    }

    function handleItemClick(item: Festival | Artist) {
        setSelectedArtist(null);
        if ('location' in item) {
            setSelectedFestival(item.location);
            setSearchActive(false);
        } else {
            setSelectedArtist(item);
        }
    }

    return (
        <div className='bottom-[10.5rem] right-[10%] lg:right-[35%] absolute justify-center align-middle flex self-end delay-150  transition-transform duration-300'>
            {/*Search results */}
            <ul className={`absolute flex flex-col-reverse scroll-smooth scrollbar-thin scrollbar-thumb-zinc-200 scrollbar-track-transparent bottom-0 right-0 transition-[max-height, opacity] duration-300 w-64  overflow-auto border border-b-0 border-slate-300 bg-white rounded-t-lg z-10 
             ${isSearchActive ? 'visible max-h-64' : 'max-h-0 invisible opacity-0'}`}>
                <>
                    {filteredItems.map((item, index) => (
                        <li key={index} className='flex flex-col group hover:bg-zinc-200'>
                            <button onClick={() => { handleItemClick(item) }} className='flex transition-colors'>
                                <h4 className='text-lg mt-1 ml-5'>{item?.name}</h4>
                            </button>
                            <span className='bg-slate-300 group-hover:bg-red-400 self-center transition-[width] group-hover:w-full w-10/12 h-[1px]'></span>
                        </li>
                    ))}
                </>
            </ul>
            {/* Artists applicable festivals */}
            <ul className={`absolute transition-opacity duration-300 empty:opacity-0 border border-l-0 border-b-0 border-slate-300 rounded-tr-lg -right-40 bottom-28 w-40 ${isSearchActive ? 'visible' : 'invisible opacity-0'}`}>
                {artistsFestival?.map((festival, index) => (
                    <li key={index} className='flex flex-1 flex-col group duration-300 transition-colors hover:bg-zinc-200  '>
                        <button onClick={() => { handleItemClick(festival) }} className=''>
                            <h4 className='text-lg text-left ml-5 mt-1'>{festival?.name}</h4>
                        </button>
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
            {selectedFestival &&
                <MemoizedFestivalInfoComponent city={selectedFestival} setExpandedLocation={setSelectedFestival} />
            }
        </div>
    )
}


export default Search;

