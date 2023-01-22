import React from "react";
import styled from "styled-components";

const TrackInfo = styled.div`
  p {
    background-color: #4f46e5;
    color: #5eead4;
    width: 100%;
  }
`;
const Track = (props) => {
  return (
    // TODO: add a play button in the center :hover
    // TODO: Of the album to preview tracks
    <TrackInfo>
      <img src={props.image} />
      <p>{props.number}</p>
      <p>{props.artist}</p>
      <p>{props.name}</p>
      {/* <audio controls src={props.preview} /> */}
    </TrackInfo>
  );
};

export default Track;
