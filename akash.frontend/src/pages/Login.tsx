import React, { useEffect } from 'react';
import { createThirdwebClient } from 'thirdweb';
import {
  ThirdwebProvider,
  ConnectButton,
  lightTheme,
  ConnectEmbed,
} from "thirdweb/react";
import { inAppWallet, } from "thirdweb/wallets";
import { useActiveWalletConnectionStatus } from 'thirdweb/react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/akashLogoFull.svg';


const client = createThirdwebClient({
  clientId: import.meta.env.VITE_APP_THIRDWEB_CLIENT_ID,
});

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

const Login: React.FC = () => {

  const navigate = useNavigate();
  const connectionStatus = useActiveWalletConnectionStatus();
  console.log(connectionStatus);


  useEffect(() => {
    if (connectionStatus == "connected") {
      console.log("connected to home");
      navigate("/home");
    }
  }, [connectionStatus])

  return (
    <div className="flex items-center justify-between min-h-screen mx-auto px-72">
      <div className='flex-col px-10'>
        <img src={logo} alt="logo" className='h-16'/>
        <div className='py-5 text-3xl text-bold font-bold'>
          Welcome to akash Network
        </div>
      </div>
      <div>
        <ThirdwebProvider>
          <ConnectEmbed
            client={client}
            wallets={wallets}
            theme={lightTheme({
              colors: { accentButtonBg: "#fd3f4a" },
            })}

          />
        </ThirdwebProvider>
      </div>
    </div>
  );
};

export default Login;
