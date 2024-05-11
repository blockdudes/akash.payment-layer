import React from 'react';
import hero1 from '../assets/homePageHero1.svg'
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {

  const navigate = useNavigate();

  return (
    <>
      <div className=' flex-col p-40 space-y-40'>
        <div className="flex-col items-center justify-center space-y-10">
          <div className="text-center">
            <h1 className="text-7xl font-bold font-posten text-primary-text hover:text-akash-red">The World's Premier Decentralized Compute Marketplace</h1>
          </div>
          <div className="text-center">
            <p className="text-secondary-text font-roboto text-3xl mt-2 ">Akash is an open network that lets users buy and sell computing resources securely and efficiently. Purpose-built for public utility.</p>
          </div>
        </div>
        <div className="flex items-center justify-center bg-transparent ">
          <div className='bg-white rounded-sm'>
            <img src={hero1} alt=""  className='w-full'/>
          </div>
          <div className='flex-col space-y-5'>
          <div className='text-center font-roboto text-primary-text text-4xl font-bold'>
            Get the best pricing for computing resources around the world
          </div>
          <div className='text-center'>
            <button className='text-white bg-akash-red hover:bg-akash-red-dark rounded-md p-2' onClick={() => navigate("/Deploy")}>Get Started</button>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
