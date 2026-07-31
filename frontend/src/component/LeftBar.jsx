import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import nLogo from '../assets/newLogoo.png';
import team from '../icons/team.png';
import chatbot from '../icons/chatbot.png';
import search from '../icons/Search.png';
import home from '../icons/home.png';
import library from '../icons/library.png';
import BookSection from './LeftBarBookSection';
import leftImage from '../assets/leftImg.png';
import '../App.css';

const navItems = [
  { to: '/', icon: home, text: 'Home' },
  { to: '/chatbot', icon: chatbot, text: 'Chatbot' },
  { to: '/search', icon: search, text: 'Search' },
  { to: '/library', icon: library, text: 'Personal Library' },
  { to: '/insights', icon: team, text: 'Reading Insights' },
];

const NavItem = ({ to, icon, text }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <li className='my-1 md:my-2'>
      <Link
        to={to}
        className={`flex items-center py-2 px-4 rounded-full ${
          isActive
            ? 'bg-gradient-to-r from-nav-bg to-nav-brownbg-opacity-75'
            : 'hover:bg-gradient-to-r from-nav-bg to-nav-brown- hover:bg-opacity-75'
        }`}
      >
        <div className={`rounded-lg bg-opacity-65 p-1 ml-2 mr-5 ${isActive ? 'bg-navImg border border-light-brown border-1' : 'hover:bg-navImg'}`}>
          <img src={icon} className="h-6" alt={text} />
        </div>
        {text}
      </Link>
    </li>
  );
};

function LeftBar() {
  return (
    <div className="left-bar-container">
      <aside className="bg-white text-black flex flex-col h-screen">
        <div className="p-4 flex items-center">
          <img src={nLogo} className="h-55" alt="Logo" />
        </div>
        <nav className="py-2 flex-grow">
          <ul>
            {navItems.map((item, index) => (
              <NavItem key={index} {...item} />
            ))}
          </ul>
        </nav>
        <div className="bg-grey">
        <div className="h-1 bg-brown"></div>
        <img src={leftImage} className=" ml-2 h-55" alt="Imge" />

           <BookSection />
           <div className="h-1 bg-brown"></div>
          
        </div>
      </aside>
    </div>
  );
}

export default LeftBar;
