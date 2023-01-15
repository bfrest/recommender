import "./App.css";
import axios from "axios";
import styled from "styled-components";
import {
  accessToken,
  logout,
  getCurrentUserProfile,
  getPlaylists,
  getTopTracks,
  getTopArtists,
} from "./spotify";
import { useEffect, useState } from "react";
import Nav from "./Components/Nav";
import Track from "./Components/Track";
import Login from "./Components/Login";

const Main = styled.div`
  font-family: monospace;
  text-align: center;
`;

const Carousel = styled.div`
  display: flex;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;

  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
`;

const Recommendations = styled.div`
  margin-top: 30vh;
  text-align: center;
  padding: 2rem 0;
`;

const Artists = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

const TopArtist = styled.li`
  display: flex;
  flex-direction: column;
  place-content: center;
  place-items: center;
  padding: 20px 0;

  img {
    width: 100px;
    height: 100px;
    border-radius: 10%;
  }
`;

const TopTitle = styled.p`
  font-size: 1.7rem;
  font-weight: 600;
`;

function App() {
  // !make a weekly playlist based off top songs and artists
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const [currentTopTracks, setCurrentTopTracks] = useState(null);
  const [topArtists, setTopArtists] = useState(null);
  const [preview, setPreview] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [newTrackRefs, setNewTrackRefs] = useState(null);
  const [shortTrackList, setShortTrackList] = useState(null);
  const [medTrackList, setMedTrackList] = useState(null);
  const [longTrackList, setLongTrackList] = useState(null);

  useEffect(() => {
    setToken(accessToken);

    const fetchData = async () => {
      try {
        const { data } = await getCurrentUserProfile();
        const artists = await getTopArtists();
        await getTopTracks("short_term").then((res) => setShortTrackList(res));
        await getTopTracks("medium_term").then((res) => setMedTrackList(res));
        await getTopTracks("long_term").then((res) => setLongTrackList(res));

        setProfile(data);
        setTopArtists([...artists.data.items]);
        setCurrentTopTracks(shortTrackList);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  //! this could probably use revision
  const checkAlreadySaved = async (trackList) => {
    let idList = [];
    let copyOfTrackList = [...trackList];
    let isSaved = [];
    let inLibrary = {};
    let newSongs = [];
    // get all the ids to make single call to see if any items in the list are saved in the users library
    trackList.map((track) => idList.push(track.id));
    //makes call to get an array true false values that will match trackList
    await axios.get(`/me/tracks/contains?ids=${idList}`).then((res) => (isSaved = [...res.data]));
    // adds the inLibrary key to trackList items
    idList.forEach((key, i) => (inLibrary[key] = isSaved[i]));
    // loop through the songs, drop ones that are in users library
    // object of trackId: 'true/false'
    for (const idKey in inLibrary) {
      // use inLibrary[idKey] get the tru/false value
      // use idKey to get the id of for the track

      copyOfTrackList.forEach((track, index) => {
        if (idKey === track.id && inLibrary[idKey] === false) {
          newSongs.push(track);
        } else {
          null;
        }
      });
    }
    setRecommendations(newSongs);
  };

  const getRecommendations = async () => {
    let newTracks = [];
    let allTracks = [];
    const queryParams = {
      seed_artists: "7mnBLXK823vNxN3UWB7Gfz",
      seed_genres: "hip-hop",
      seed_tracks: "7ctca1Hz43SyMcI4qUrpY7,4Hf2HHwkUEJZzJgp3KDKMu,1KnUt0rICeoLFYPSL40fsU",
    };
    // get recommendations with provided seeds
    const urlParams = new URLSearchParams(queryParams).toString();
    await axios.get(`/recommendations?${urlParams}`).then((res) => {
      allTracks = [...res.data.tracks];
    });
    // filter through already in library & return filtered tracklist
    checkAlreadySaved(allTracks);
  };

  return !accessToken ? (
    <>
      <Login />
    </>
  ) : (
    <Main>
      <Nav user={profile} token={token} />

      <TopTitle>Top 5 Artists</TopTitle>
      <Artists>
        {topArtists &&
          topArtists.map((artist, index) => (
            <TopArtist key={artist.id}>
              <img src={artist.images[0] && artist.images[0].url} />
              <p>{index + 1}</p>
              <p key={artist.id}>{artist.name}</p>
            </TopArtist>
          ))}
      </Artists>

      <h2>Your Top Songs</h2>
      {/* 
      
      //todo make filters to change the timeframe of top songs
      //todo make a popup window with date and times and log to state
      //todo add a way to check/uncheck each song to be able to base 
      //todo recommendations from any of the listed songs, albums or artists
      //todo obviously log to state
      
      */}
      <p>filters:</p>
      <button onClick={() => setCurrentTopTracks([...longTrackList])}>{`> year`}</button>
      <button onClick={() => setCurrentTopTracks([...medTrackList])}>Past 6 months</button>
      <button onClick={() => setCurrentTopTracks([...shortTrackList])}>Past Past Month</button>
      <Carousel>
        {currentTopTracks &&
          currentTopTracks.map((track, index) => (
            <Track
              key={track.id}
              artist={track.artists[0].name}
              name={track.name}
              preview={track.preview_url}
              image={track.album.images[0].url}
              number={index + 1}
            />
          ))}
      </Carousel>

      <Recommendations>
        {/* 
        //todo have the recommendation function take in the checked 
        //todo songs/artist/albums from the top tracks
        */}
        <button onClick={() => getRecommendations()}>Find new songs</button>
        <Carousel>
          {recommendations &&
            recommendations.map((track) => (
              <Track
                key={track.id}
                artist={track.artists[0].name}
                name={track.name}
                preview={track.preview_url}
                image={track.album.images[0].url}
              />
            ))}
        </Carousel>
      </Recommendations>
    </Main>
  );
}

export default App;
