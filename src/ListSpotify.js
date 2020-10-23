import React, { useState, useEffect } from 'react';

import { Credentials } from './Credentials';
import axios from 'axios';
import Dropdown from './Dropdown';

import { Link } from 'react-router-dom';

const ListSpotify = () => {

  const spotify = Credentials();

  const data = [
    {value: 1, name: "A"},
    {value: 2, name: "B"},
    {value: 3, name: "C"},
  ]

  const [token, setToken] = useState('');
  const [genres, setGenres] = useState({selectedGenre: '', listOfGenres: []});
  const [playlists, setPlaylists] = useState({selectedPlaylist: '', listOfPlaylists: []});

  useEffect(() => {
    axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
    }).then(tokenResponse => {
      console.log(tokenResponse.data.access_token);

      setToken(tokenResponse.data.access_token);

      axios("https://api.spotify.com/v1/browse/categories?locale=sv_US", {
        method: "GET",
        headers: { "Authorization": "Bearer " + tokenResponse.data.access_token}
      }).then(genreResponse => {
        setGenres({
          selectedGenre: genres.selectedGenre,
          listOfGenres: genreResponse.data.categories.items
        })
      })
    });
  }, [genres.selectedGenre, spotify.ClientId, spotify.ClientSecret]);

  const genreChanged = val =>{
    setGenres({
      selectedGenre: val,
      listOfGenres: genres.listOfGenres
    });

    axios(`https://api.spotify.com/v1/browse/categories/${val}/playlists?limit=10`, {
          method: "GET",
          headers: { "Authorization": "Bearer " + token}
        }).then(playlistResponse => {
        setPlaylists({
          selectedPlaylist: playlists.selectedPlaylist,
          listOfPlaylists: playlistResponse.data.playlists.items
      })
    })
  }

  const playlistChanged = val =>{
    setPlaylists({
      selectedPlaylist: val,
      listOfPlaylists: playlists.listOfPlaylists
    });
  }

  return (
    <form onSubmit={() => {}}>
      <div className="container">
        <Dropdown options={genres.listOfGenres} selectedValue={genres.selectedGenre} changed={genreChanged}/>
        <Dropdown options={playlists.listOfPlaylists} selectedValue={playlists.selectedPlaylist} changed={playlistChanged}/>
        <button type="submit">
          Search
        </button>
        <Link to="/weather">Weather page</Link>
      </div>
    </form>
  );
}

export default ListSpotify;
