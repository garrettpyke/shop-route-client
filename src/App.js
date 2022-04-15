import './App.css';
import React, { useState } from 'react'
import { Route, Link, Routes, Navigate } from "react-router-dom";
import ItemMaster from './ItemMaster/ItemMaster';
import SignInForm from './SignInForm/SignInForm';

function App() {
  const [tokenInfo, setTokenInfo] = useState({user:{id: 0, email: "", token: ""}})

  return (
    <div className="App">
      {tokenInfo.user?.token ? null : (<SignInForm tokenInfo={tokenInfo} setTokenInfo={setTokenInfo}/>)}
      {tokenInfo.user?.token ? (<ItemMaster userInfo={tokenInfo.user}/>) : null}
    </div>
  );
}

export default App;
