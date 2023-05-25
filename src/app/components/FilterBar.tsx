import Autocomplete from "@mui/material/Autocomplete"
import { ArtistsDataContext, FestivalDataContext } from '../page';
import TextField from "@mui/material/TextField";
import { useContext } from "react";

const FilterBar = () => {

  const artistsData = useContext(ArtistsDataContext);
  const festivalData = useContext(FestivalDataContext);
  const months = ['Kaikki Kuukaudet', 'Kesäkuu', 'Heinäkuu', 'Elokuu', 'Syyskuu']

  const artists = artistsData.map((artist: { name: string[]; }) => {
    const firstLetter: string = artist.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter, ...artist,
    };
  });

  const genres = artistsData.map((artist: { genre: string; }) => {
    let genres: string[] = [];
    if (!genres.includes(artist.genre)) {
      genres.push(artist.genre)
    }
    return genres;
  })

  return (
    <div className='flex mx-auto justify-evenly p-4'>
      <Autocomplete
        id="Artists-Grouped"
        noOptionsText='Ei löytynyt'
        options={artists.sort((a: { firstLetter: string; }, b: { firstLetter: string; }) => -b.firstLetter.localeCompare(a.firstLetter))}
        groupBy={(option: { name: string }) => option.name.charAt(0)}
        getOptionLabel={(artist: { name: string }) => artist.name}
        sx={{ width: 250 }}
        renderInput={(params) => <TextField {...params} variant="standard" label="Artistit" />}
      />

      <Autocomplete
        id="Months"
        noOptionsText='Ei löytynyt'
        options={months}
        disableClearable={true}
        sx={{ width: 250 }}
        renderInput={(params) => <TextField {...params} variant="standard" label="Kuukaudet" />}
      />

      <Autocomplete
        id="Genres"
        noOptionsText='Ei löytynyt'
        options={genres}
        sx={{ width: 250 }}
        limitTags={3}
        renderInput={(params) => <TextField {...params} variant="standard" label="Genret" />}
      />

    </div>
  )
}

export default FilterBar;