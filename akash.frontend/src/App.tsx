import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import DemoCard from './pages/DemoCard';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import { useActiveWalletConnectionStatus } from 'thirdweb/react';
import { useWeb3Auth } from './provider/authProvider';
import CheckoutForm from './components/CheckoutForm';
import { Checkout, Return } from './components/Checkout';
import Deploy from './pages/Deploy';


const App: React.FC = () => {



  const { status, web3Auth }: any = useWeb3Auth();

  const walletConnectionStatus = useActiveWalletConnectionStatus();

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="*" element={
            status == null ? <div>LOADING........</div> : (status ? <Home /> : <Login />)
          } />
          <Route path="/checkoutForm" element={
            status == null ? <div>LOADING........</div> : (status ? <CheckoutForm /> : <Login />)} />
          <Route path="/checkout/" element={
            status == null ? <div>LOADING........</div> : (status ? <Checkout /> : <Login />)} />
          <Route path="/checkout/" element={<Checkout />} />
          <Route path="/DemoCards" element={<DemoCard />} />
          <Route path="/return" element={<Return />} />
          <Route path="/home" element={<Home />} />
          <Route path="/deploy" element={<Deploy />} />
        </Routes>
      </Router>


    </>
  );
};

export default App;