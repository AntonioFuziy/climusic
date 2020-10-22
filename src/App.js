import React, { useState, useEffect } from 'react';

import { Credentials } from './Credentials';
import axios from 'axios';
import Dropdown from './Dropdown';

const App = () => {

  const spotify = Credentials();

  const data = [
    {value: 1, name: "A"},
    {value: 2, name: "B"},
    {value: 3, name: "C"},
  ]

  const [token, setToken] = useState('');
  const [genres, setGenres] = useState({selectGenre: '', listOfGenresFromAPI: []});

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
          selectGenre: genres.selectGenre,
          listOfGenresFromAPI: genreResponse.data.categories.items
        })
      })
    });
  }, [genres.selectGenre, spotify.ClientId, spotify.ClientSecret]);

  return (
    <form onSubmit={() => {}}>
      <div className="container">
        <Dropdown options={genres}/>
        <Dropdown options={data}/>
        <button type="submit">
          Search
        </button>
      </div>
    </form>
  );
}

export default App;
