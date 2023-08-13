import Autocomplete from "@mui/material/Autocomplete"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ArtistContext, FestivalContext } from '../page';
import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import { getGenres } from "../api/spotify";
import { parseSpotifyId } from "../utilityFunctions";
import React from "react";

const FilterBar = () => {
  
  const artistsData = useContext(ArtistContext);
  const festivalData = useContext(FestivalContext);
  const months = ['Kaikki Kuukaudet', 'Kesäkuu', 'Heinäkuu', 'Elokuu', 'Syyskuu']
  const genres: string[] = [];
  
  const artists = artistsData?.map((artist: { name: string; spotifyId: string; }) => {
    const firstLetter: string = artist.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...artist,
    };
  });
  
  artistsData?.forEach((artist: { id: string; spotifyId: string }) => {
    getGenres(parseSpotifyId(artist.spotifyId))
      .then((artistsGenres) => {
        if (artistsGenres && !artistsGenres.some((genre: string) => genres.includes(genre))) {
          genres.push(...artistsGenres);
        }
      });
  });

  const theme = createTheme({
    typography: {
      fontFamily: 'Nunito,',
    },
    palette: {
      primary: {
        main: '#fd614a',
      },
    },
  });

  return (
    <div className='flex justify-evenly p-3 mt-20'>
      <ThemeProvider theme={theme}>
        <Autocomplete
          id="Artists-Grouped"
          noOptionsText='Ei löytynyt'
          options={artists?.sort((a: { firstLetter: string; }, b: { firstLetter: string; }) => -b.firstLetter.localeCompare(a.firstLetter)) ?? []}
          groupBy={(option: { name: string }) => option.name.charAt(0)}
          getOptionLabel={(artist: { name: string }) => artist.name}
          className=" w-28 md:w-56"
          renderInput={(params) => <TextField {...params} variant="standard" label="Artistit" />}
        />
        <Autocomplete
          id="Months"
          noOptionsText='Ei löytynyt'
          options={months}
          disableClearable={true}
          className=" w-28 md:w-60"
          renderInput={(params) => <TextField {...params} variant="standard" label="Kuukaudet" />}
        />

        <Autocomplete
          id="Genres"
          noOptionsText='Ei löytynyt'
          options={genres ?? []}
          className="w-28 md:w-60"
          limitTags={3}
          renderInput={(params) => <TextField {...params} variant="standard" label="Genret" />}
        />
      </ThemeProvider>
    </div>
  )
}

export default FilterBar;