import React from "react";
import styled from "styled-components";
import { logout } from "../spotify";

const NavBar = styled.nav`
  background-color: black;
  color: white;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  padding: 15px 0;
  margin-bottom: 10vh;

  p {
    font-size: 1.5rem;

    :hover {
      cursor: pointer;
      text-decoration: underline;
      color: yellow;
    }
  }

  button {
    background: none;
    border: 2px solid yellow;
    padding: 10px;
    color: yellow;

    :hover {
      cursor: pointer;
      border: 2px solid lightblue;
      color: pink;
    }
  }

  p {
    color: yellow;
    font-weight: 500;
    font-family: monospace;
    font-size: 1.8rem;
  }
`;

const UserImg = styled.image`
  height: 80px;
  border-radius: 50%;
`;

function Nav(props) {
  return (
    <NavBar>
      <>
        <img height={100} src="https://vitejs.dev/logo-with-shadow.png" alt="logo" />
        <p>Music Finder</p>
      </>
      {!props.token ? (
        <a href="http://localhost:8080/login">
          <button>Log In</button>
        </a>
      ) : (
        <>
          <button onClick={logout}>Log Out</button>
        </>
      )}
    </NavBar>
  );
}

export default Nav;
