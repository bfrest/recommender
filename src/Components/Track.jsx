import React from "react";
import styled from "styled-components";

const TrackCard = styled.div`
  scroll-snap-align: start;
  flex-shrink: 0;
  width: 300px;
  height: 300px;
  margin-right: 50px;
  transform-origin: center center;
  transform: scale(1);
  transition: transform 0.5s;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 100px;

  img {
    height: 200px;
    width: 200px;
    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px,
      rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px,
      rgba(0, 0, 0, 0.07) 0px 16px 16px;
    margin-bottom: 15px;
  }

  p {
    font-size: 15px;
    font-weight: 300;
  }
`;

const Track = (props) => {
  return (
    // TODO: add a play button in the center :hover
    // TODO: Of the album to preview tracks
    <TrackCard>
      <img src={props.image} />
      <p>{props.number}</p>
      <p>{props.artist}</p>
      <p>{props.name}</p>
      {/* <audio controls src={props.preview} /> */}
    </TrackCard>
  );
};

export default Track;
