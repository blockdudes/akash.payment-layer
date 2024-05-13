import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useActiveWalletConnectionStatus } from 'thirdweb/react';
import { ConnectionStatus } from 'thirdweb/wallets';

// Create a context for the connection status with a default value of null
const ConnectionStatusContext = createContext<ConnectionStatus | null>(null);

// Create a provider component for the connection status
export const ConnectionStatusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const connectionStatus = useActiveWalletConnectionStatus();
    const navigate = useNavigate();

    useEffect(() => {
        if (connectionStatus === "connected") {
            console.log("connected to home");
            navigate("/home");
        }
    }, [connectionStatus]);

    return (
        <ConnectionStatusContext.Provider value={connectionStatus}>
            {children}
        </ConnectionStatusContext.Provider>
    );
};

// Create a hook to use the connection status
export const useConnectionStatus = () => {
  return useContext(ConnectionStatusContext);
};