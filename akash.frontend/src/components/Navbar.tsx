import { Link, useNavigate } from 'react-router-dom';
import { useActiveWalletConnectionStatus } from 'thirdweb/react';
import Dropdown from '../components/DropDown';

const Navbar: React.FC = () => {
  const connectionStatus = useActiveWalletConnectionStatus();
  const navigate = useNavigate();

  
  return (
    <nav className="bg-transparent border-b border-gray-200 py-4">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="text-lg font-semibold text-gray-900 cursor-pointer" onClick={() => navigate("/")}>My App</div>
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
