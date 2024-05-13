import React, { useEffect, useState } from 'react';

import { useWeb3Auth } from "../provider/authProvider.js";
import logo from "../assets/akash.png";
import { useNavigate } from 'react-router-dom';
import { Web3Auth } from '@web3auth/modal';




const Login = () => {
  const { getBalance, sendTransaction, getUserInfo, getPrivateKeyAndWallet, setLoggedIn, loggedIn, login, logout }: any = useWeb3Auth();

  // Use the provided functions as needed
  const handleGetBalance = async () => {
    const balance = await getBalance();
    console.log("Balance:", balance);
  };

  const handleSendTransaction = async () => {
    const destination = "exampleDestinationAddress";
    const denom = "exampleDenom";
    const amount = "100";
    const gas = "200000";
    const result = await sendTransaction(destination, denom, amount, gas);
    console.log("Transaction Result:", result);
  };

  const handleGetUserInfo = async () => {
    const userInfo = await getUserInfo();
    console.log("User Info:", userInfo);
  };

  const unloggedInView = (
    <>
      <button onClick={login} className="card">
        Login
      </button>
      <div>
      </div>
    </>
  );

  const handleGetKey = async () => {
    const { privateKey, wallet } = await getPrivateKeyAndWallet();
    console.log(wallet)
  };

  const loggedInView = (
    <>
      <div>
        {/* Your component JSX */}
        <button onClick={handleGetBalance}>Get Balance</button>
        <button onClick={handleSendTransaction}>Send Transaction</button>
        <button onClick={handleGetUserInfo}>Get User Info</button>
        <button onClick={handleGetKey}>Get private key</button>
        <button onClick={logout}>logout</button>

      </div>
    </>
  );

  const [web3Auth] = useState<Web3Auth>();

  const navigate = useNavigate();

  useEffect(() => {
    if ( web3Auth && web3Auth.connected ) {
      console.log("connected to home");
      navigate("/home");
    }
  }, [web3Auth?.connected])


  return (
    <>
      <div className="flex items-center justify-between min-h-screen mx-auto px-72">
        <div className='flex-col px-10'>
          <img src={logo} alt="logo" className='h-16' />
          <div className='py-5 text-3xl text-bold font-bold'>
            Welcome to akash Network
          </div>
        </div>
        <div>
          <div className=" bg-akash-red flex w-full p-4 rounded-lg spaxe-x-2 space-y-2" >{loggedIn ? loggedInView : unloggedInView}</div>
        </div>
      </div>

    </>

  );
};

export default Login;
