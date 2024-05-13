import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useDisconnect, useActiveWallet } from 'thirdweb/react';
import { Wallet, inAppWallet } from 'thirdweb/wallets';
import { useNavigate } from 'react-router-dom';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();

  const { disconnect } = useDisconnect();
  const wallet: Wallet | undefined = useActiveWallet();


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  const checkoutPage = () => {
    toggleMenu();
    navigate("/checkoutForm");
  };

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center align-center w-10 h-10 rounded-full border border-gray-300 shadow-sm px-4 py-2 bg-white text-md font-medium text-gray-700 hover:bg-gray-50 "
          id="options-menu"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={toggleMenu}
        >
          <FontAwesomeIcon icon={faUser} className="h-5" />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <div className="text-lg block px-4 py-2 text-sm text-gray-700" role="menuitem" >
              John
              <div className='text-sm'>
                johndoe@gmail.com
              </div>
              <div className="text-sm text-gray-500 py-2">
                $ 99.99
              </div>
            </div>

            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={checkoutPage}>
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Add money
            </a>

            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-300" role="menuitem"
              onClick={() => {
                disconnect(wallet as Wallet);
                toggleMenu();
                navigate("/");
              }}>
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              Logout
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
