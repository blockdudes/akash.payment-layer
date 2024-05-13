import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { chainConfig } from './helper/chainConfig.tsx'
import { Web3AuthProvider } from './provider/authProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Web3AuthProvider chainConfig={chainConfig}>
    <App />
    </Web3AuthProvider>
)
