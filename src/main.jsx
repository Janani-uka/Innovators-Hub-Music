import React from "react";
import ReactDOM from "react-dom/client"
import App from "./App";
import "./global.css"
import AuthProvider from "./context/AuthContext";
import UserProvider from "./context/UserContext";
import AlbumProvider from "./context/AlbumContext";
ReactDOM.createRoot(document.getElementById("root")).render(<AuthProvider>
    <UserProvider>
        <AlbumProvider>
        <App/>
        </AlbumProvider>
       </UserProvider></AuthProvider>)