import Autocomplete from "@mui/material/Autocomplete"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ArtistContext, FestivalContext } from '../page';
import TextField from "@mui/material/TextField";
import { useContext, useEffect, useState } from "react";
import { getGenres } from "../api/spotify";
import { parseSpotifyId } from "../utilityFunctions";
import React from "react";
import { Artist } from '../types';

const FilterBar = () => {

  const artistsData = useContext(ArtistContext);
  const festivalData = useContext(FestivalContext);
  const months = ['Kaikki Kuukaudet', 'Kesäkuu', 'Heinäkuu', 'Elokuu', 'Syyskuu'];
  const [genres, setGenres] = useState<string[]>([]);

  const [selectedMonth, setSelectedMonth] = useState<string | undefined>();
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

  const handleArtistChange = (event: React.ChangeEvent<{}>, value: Artist | null) => {
    setSelectedArtist(value);
  };

  const handleMonthChange = (event: React.ChangeEvent<{}>, value: string | undefined) => {
    setSelectedMonth(value);
  };

  const handleGenreChange = (event: React.ChangeEvent<{}>, value: string | null) => {
    setSelectedGenre(value);
  };


  const artists = artistsData?.map((artist: Artist) => {
    const firstLetter: string = artist.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...artist,
    };
  });

  useEffect(() => {
    // Fetch genres for artists and update the genres state
    const fetchGenres = async () => {
      const newGenres: string[] = [];
      if (artistsData) {
        for (const artist of artistsData) {
          const artistGenres = await getGenres(parseSpotifyId(artist.spotifyId));
          if (artistGenres) {
            artistGenres.forEach((genre: string) => {
              if (!newGenres.includes(genre)) {
                newGenres.push(genre);
              }
            });
          }
        }
      }
      setGenres(newGenres);
    };

    fetchGenres();
  }, [artistsData]);

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
          value={selectedArtist}
          onChange={handleArtistChange}
          noOptionsText='Ei löytynyt'
          options={artists?.sort((a: { firstLetter: string; }, b: { firstLetter: string; }) => -b.firstLetter.localeCompare(a.firstLetter)) ?? []}
          groupBy={(option: { name: string }) => option.name.charAt(0)}
          getOptionLabel={(artist: { name: string }) => artist.name}
          className=" w-28 md:w-56"
          renderInput={(params) => <TextField {...params} variant="standard" label="Artistit" />}
          renderOption={(props, option) => (
            <li {...props} key={option.name}>
              {option.name}
            </li>
          )}
        />
        <Autocomplete
          id="Months"
          options={months}
          value={selectedMonth}
          noOptionsText='Ei löytynyt'
          onChange={handleMonthChange}
          disableClearable={true}
          className=" w-28 md:w-60"
          renderInput={(params) => <TextField {...params} variant="standard" label="Kuukaudet" />}
          renderOption={(props, option) => (
            <li {...props} key={option}>
              {option}
            </li>
          )}
        />

        <Autocomplete
          id="Genres"
          value={selectedGenre}
          onChange={handleGenreChange}
          noOptionsText='Ei löytynyt'
          options={genres ?? []}
          className="w-28 md:w-60"
          limitTags={3}
          renderInput={(params) => <TextField {...params} variant="standard" label="Genret" />}
          renderOption={(props, option) => (
            <li {...props} key={option}>
              {option}
            </li>
          )}
        />
      </ThemeProvider>
    </div>
  )
}

export default FilterBar;