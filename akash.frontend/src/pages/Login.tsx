import React, { useEffect } from 'react';
import { createThirdwebClient } from 'thirdweb';
import {
  ThirdwebProvider,
  ConnectButton,
  lightTheme,
  ConnectEmbed,
} from "thirdweb/react";
import { inAppWallet, } from "thirdweb/wallets";



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


  return (
    <div className="flex items-center justify-center min-h-screen " >
      <ThirdwebProvider>
        <ConnectEmbed
          chain={{ id: 1, rpc: "akash" }}
          client={client}
          wallets={wallets}
          theme={lightTheme({
            colors: { accentButtonBg: "#fd3f4a" },
          })}
          onConnect={() => {

          }}
        />
      </ThirdwebProvider>
    </div>
  );
};

export default Login;
