import "./App.css";
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
import Recommender from "./Components/Recommender";

const Main = styled.div`
  /* 
  
  colors
  main blue: #111827
  accent: #1F2937
  main teal: #0d9488
  accent teal: #5eead4
  tertiarty: #4F46E5
  off-white: #F3F4F6

*/

  font-family: monospace;
  text-align: center;
  height: 100vh;
  width: 100vw;
  overflow: auto;
  margin: 0 auto;
  font-size: 1.5rem;
  font-weight: 500;
  color: #0d9488;

  img {
    height: 200px;
    width: 200px;
    border-radius: 5px;
  }

  button {
    background-color: #0d9488;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    margin: 0 10px;

    :hover {
      background-color: #5eead4;
      cursor: pointer;
    }
  }
`;

const Title = styled.p`
  font-size: 2rem;
  font-weight: 600;
  text-decoration: underline;
`;

const TimeLineBtns = styled.div`
  margin: 50px 0;
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

  return !accessToken ? (
    <Login />
  ) : (
    <Main>
      <Nav user={profile} token={token} />

      <Title>Top Artists</Title>
      <div>
        {topArtists &&
          topArtists.map((artist, index) => (
            <div key={artist.id}>
              <img src={artist.images[0] && artist.images[0].url} />
              <p>{index + 1}</p>
              <p key={artist.id}>{artist.name}</p>
            </div>
          ))}
      </div>

      <Title>Your Top Songs</Title>
      {/*

      //todo make filters to change the timeframe of top songs
      //todo make a popup window with date and times and log to state
      //todo add a way to check/uncheck each song to be able to base
      //todo recommendations from any of the listed songs, albums or artists
      //todo obviously log to state

      */}
      <TimeLineBtns>
        <button onClick={() => setCurrentTopTracks([...longTrackList])}>{`> year`}</button>
        <button onClick={() => setCurrentTopTracks([...medTrackList])}>Past 6 months</button>
        <button onClick={() => setCurrentTopTracks([...shortTrackList])}>Past Past Month</button>
      </TimeLineBtns>

      <div>
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
      </div>
      <Title>You May Like These...</Title>
      <div>
        <Recommender recommendations={recommendations} setRecommendations={setRecommendations} />
      </div>
    </Main>
  );
}

export default App;
