import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

const baseUrl = "https://functionapp120220819172503.azurewebsites.net";
// const App : React.FC = ()=>{
//   const hubCon = new signalR
// }
function App() {
  const hubCon = new signalR.HubConnectionBuilder()
    .withUrl(`${baseUrl}/api`)
    .configureLogging(signalR.LogLevel.Information)
    .build();

  useEffect(() => {
    hubCon.start();

    // fetch("http://localhost:7071/api/HttpExample1")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //   });
  }, []);
  var list = [];
  const Message = ({ HubConnection }) => {
    const [date, setDate] = useState();
    useEffect(() => {
      HubConnection.on("newMessage", (message) => {
        list.push(message);
        setDate(new Date());
      });
    }, []);

    return list.map((msg, index) => (
      <p key={`message${index}`}>
        <strong>{msg.sender}</strong> {msg.text}
      </p>
    ));
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Message HubConnection={hubCon} />
      </header>
    </div>
  );
}

export default App;
