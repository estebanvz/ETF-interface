import React from 'react'
import { StrictMode } from "react";
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { getLibrary } from './configs/web3';
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from "@ethersproject/providers";



const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <App />
    </Web3ReactProvider>
  </StrictMode>,
  rootElement
);
