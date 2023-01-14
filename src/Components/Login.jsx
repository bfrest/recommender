import Nav from "./Nav";
import styled from "styled-components";

const LoginPage = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  place-items: center;
  height: 100vh;

  /* 
  background-image: url("https://img.freepik.com/free-photo/navy-blue-smoky-art-abstract-background_53876-102669.jpg");
  background-size: cover; */

  .button-85 {
    padding: 0.6em 2em;
    border: none;
    margin: 1rem 0;
    outline: none;
    color: rgb(255, 255, 255);
    background: #111;
    cursor: pointer;
    position: relative;
    z-index: 0;
    border-radius: 10px;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
  }

  .button-85:before {
    content: "";
    background: linear-gradient(
      45deg,
      #ff0000,
      #ff7300,
      #fffb00,
      #48ff00,
      #00ffd5,
      #002bff,
      #7a00ff,
      #ff00c8,
      #ff0000
    );
    position: absolute;
    top: -2px;
    left: -2px;
    background-size: 400%;
    z-index: -1;
    filter: blur(5px);
    -webkit-filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation: glowing-button-85 20s linear infinite;
    transition: opacity 0.3s ease-in-out;
    border-radius: 10px;
  }

  @keyframes glowing-button-85 {
    0% {
      background-position: 0 0;
    }
    50% {
      background-position: 400% 0;
    }
    100% {
      background-position: 0 0;
    }
  }

  .button-85:after {
    z-index: -1;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: #222;
    left: 0;
    top: 0;
    border-radius: 10px;
  }

  :hover {
    cursor: pointer;
  }
`;

const Login = () => {
  return (
    <LoginPage>
      <h1>Music 🎸 Finder</h1>
      <a href="http://localhost:8080/login">
        <button className="button-85" role="button">
          Sign in with spotify
        </button>
      </a>
    </LoginPage>
  );
};

export default Login;
