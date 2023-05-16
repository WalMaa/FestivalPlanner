import Autocomplete from "@mui/material/Autocomplete"
import {artistsData} from "../festivals/festivalData";
import TextField from "@mui/material/TextField";

const FilterBar = () => {

    const months = ['Kaikki Kuukaudet', 'Kesäkuu', 'Heinäkuu', 'Elokuu', 'Syyskuu']

    const artists = artistsData.map(artist => {
        const firstLetter = artist.name[0].toUpperCase();
        return {
          firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter, ...artist,
        };
      });

    const genres = artistsData.map(artist => {
    })

    return (
        <div className='flex mx-auto justify-around p-4'>
              <Autocomplete
                id="Artists-Grouped"
                noOptionsText='Ei löytynyt'
                options = {artists.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                groupBy={(artist) => artist.firstLetter}
                getOptionLabel={(artist) => artist.name}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Artistit" />}
              />

              <button>
                <Autocomplete 
                id="Months"
                noOptionsText='Ei löytynyt'
                options = {months}
                disableClearable={true}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Kuukaudet" />} 
                
                
                />
              </button>

              <button>
                Genret
              </button>
            </div>
    )
}

export default FilterBar;