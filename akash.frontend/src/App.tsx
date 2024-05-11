import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import DemoCard from './pages/DemoCard';
import Home from './pages/Home';
// import Navbar from './components/Navbar';
import Deploy from './pages/Deploy';
// import CanvasBackground from './components/CanvasBackground';
import Layout from './components/Layout';
const App: React.FC = () => {
  return (
    <Router >
      <Layout>
      {/* <CanvasBackground/> */}
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Deploy" element={<Deploy />} />
        <Route path="/DemoCards" element={<DemoCard />} />
      </Routes>
      </Layout>
    </Router >
  );
};

export default App;
