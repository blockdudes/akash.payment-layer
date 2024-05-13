import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useActiveWalletConnectionStatus, } from 'thirdweb/react';
import Dropdown from '../components/DropDown';
import logo from '../assets/akashLogoFull.svg';

const Navbar: React.FC = () => {
  const connectionStatus = useActiveWalletConnectionStatus();

  const navigate = useNavigate();


  return (
    <>
      {/* {connectionStatus === "connected" && ( */}
        <>
          <nav className="bg-transparent   py-2 ">
            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
              <div className="text-lg font-semibold text-gray-900">
                <img src={logo} alt="akash logo" className="cursor-pointer h-5" onClick={() => navigate("/home")} />
              </div>
              <div className="flex items-center">

                <Link to="/DemoCards" className="text-gray-800 hover:text-akash-red mx-2 px-6 rounded-md text-sm font-medium">Demo Cards</Link>
                <Dropdown />

              </div>
            </div>
          </nav>
        </>
      {/* )} */}
    </>
  );
};

export default Navbar;
