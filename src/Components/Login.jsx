import styled from "styled-components";

const LoginPage = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  place-items: center;
  height: 100vh;
  background-image: url("https://uploads-ssl.webflow.com/5a9ee6416e90d20001b20038/62ee020f7fea4e674a01840c_Rectangle%201%20(35).svg");
  background-size: cover;

  button {
    background-color: #0d9488;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    margin: 0 10px;
    font-size: 2rem;
    font-family: sans-serif;

    :hover {
      background-color: #5eead4;
      cursor: pointer;
    }
  }
`;

const Login = () => {
  return (
    <LoginPage>
      <a href="http://localhost:8080/login">
        <button>Sign in with spotify</button>
      </a>
    </LoginPage>
  );
};

export default Login;
