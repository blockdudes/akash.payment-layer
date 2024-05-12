import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useActiveWalletConnectionStatus, ThirdwebProvider, ConnectButton, lightTheme, useDisconnect, useActiveWallet } from 'thirdweb/react';
import { createThirdwebClient } from 'thirdweb';
import { Wallet, inAppWallet } from 'thirdweb/wallets';
import Dropdown from '../components/DropDown';
import { useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const connectionStatus = useActiveWalletConnectionStatus();
  const location = useLocation(); // Add this line

  useEffect(() => {
    if (connectionStatus == "connected") {
      console.log("connected to home");
    }

  }, [connectionStatus, location])
  
  const client = createThirdwebClient({
    clientId: import.meta.env.VITE_APP_THIRDWEB_CLIENT_ID,
  });
  
  const { disconnect } = useDisconnect();
  const wallet: Wallet | undefined = useActiveWallet();


  const wallets = [
    inAppWallet({
      auth: {
        options: [
          "email",
          "google",
          "apple",
          "facebook",
          "phone",
        ],
      },
    }),
  ];

  console.log(connectionStatus);
  
  return (
    <nav className="bg-transparent border-b border-gray-200 py-4">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="text-lg font-semibold text-gray-900">My App</div>
        <div className="flex items-center">
          <Link to="/DemoCards" className="text-gray-800 hover:text-gray-900 mx-2 py-2 rounded-md text-sm font-medium">Demo Cards</Link>
          {connectionStatus === "connected" && (
          <Dropdown />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
