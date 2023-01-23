import React from "react";
import styled from "styled-components";
import { logout } from "../spotify";

const NavBar = styled.nav`
  color: white;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  padding: 15px 0;
  margin-bottom: 10vh;
  background-color: #111827;
  color: #5eead4; ;
`;

function Nav(props) {
  return (
    <NavBar className="">
      <>
        <p className="text-purple-200">Music Finder</p>
      </>
      {!props.token ? (
        <a href="https://music-auth.onrender.com/login">
          <button className="">Log In</button>
        </a>
      ) : (
        <>
          <button className="" onClick={logout}>
            Log Out
          </button>
        </>
      )}
    </NavBar>
  );
}

export default Nav;
