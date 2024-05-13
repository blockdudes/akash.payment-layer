import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import DemoCard from './pages/DemoCard';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Deploy from './pages/Deploy';
// import CanvasBackground from './components/CanvasBackground';
// import Layout from './components/Layout';
import { Checkout, Return } from './components/Checkout';
import CheckoutForm from './components/CheckoutForm';
import { CanvasBackgroundProvider } from './components/CanvasBackground';
import { useActiveWalletConnectionStatus } from 'thirdweb/react';
import { Web3AuthProvider, useWeb3Auth } from './provider/authProvider';
import { chainConfig } from './helper/chainConfig';




const App: React.FC = () => {
  const { checkConnected }: any = useWeb3Auth();
  console.log("status", checkConnected)
  const [render, setRender] = useState<boolean>(false)
  const walletConnectionStatus = useActiveWalletConnectionStatus();


  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="*" element={
            true ? <Home /> : <Login />
          } />
          <Route path="/checkoutForm" element={
            true ? <CheckoutForm /> : <Login />
          } />
          <Route path="/Deploy" element={
            true ? <Deploy /> : <Login />} 
            />
            <Route path="/checkout/" element={<Checkout />} />
          <Route path="/DemoCards" element={<DemoCard />} />
          <Route path="/return" element={<Return />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />

        </Routes>
      </Router>
  );
};

export default App;