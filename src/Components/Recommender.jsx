import axios from "axios";
import styled from "styled-components";
import Track from "./Track";

const Recommendations = styled.div`
  display: flex;
  height: 100%;
  place-content: center;
  place-items: center;

  button {
    width: 30%;
    margin: 30px 0;
    padding: 20px;
  }
`;

const Recommender = (props) => {
  //
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
        // add songs that are not in users library to recommended list
        if (idKey === track.id && inLibrary[idKey] === false) {
          newSongs.push(track);
        } else {
          null;
        }
      });
    }
    props.setRecommendations(newSongs);
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

  return (
    <Recommendations>
      {/* 
        //todo have the recommendation function take in the checked 
        //todo songs/artist/albums from the top tracks
        */}
      <button onClick={() => getRecommendations()}>Find new songs</button>

      {props.recommendations &&
        props.recommendations.map((track) => (
          <Track
            key={track.id}
            artist={track.artists[0].name}
            name={track.name}
            preview={track.preview_url}
            image={track.album.images[0].url}
          />
        ))}
    </Recommendations>
  );
};

export default Recommender;
