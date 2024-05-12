import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import DemoCard from './pages/DemoCard';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import { CheckoutForm, Return } from './components/Checkout';
import { CanvasBackgroundProvider } from './components/CanvasBackground';
import { useActiveWalletConnectionStatus } from 'thirdweb/react';



const App: React.FC = () => {
  const [render, setRender] = useState<boolean>(false)
  const walletConnectionStatus = useActiveWalletConnectionStatus();


  return (
    <div className="relative z-10">
      {/* <CanvasBackgroundProvider>
      </CanvasBackgroundProvider> */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="*" element={
            walletConnectionStatus === "connected" ? <Home /> : <Login />
          } />
          <Route path="/checkout" element={
            walletConnectionStatus === "connected" ? <CheckoutForm /> : <Login />
          } />

          <Route path="/DemoCards" element={<DemoCard />} />
          <Route path="/return" element={<Return />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;