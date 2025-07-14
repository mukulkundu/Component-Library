import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavMenu from './Navigation/NavMenu';
import NavBar from './Navigation/NavBar';

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 xl:w-72 bg-[#372f59] text-white overflow-y-auto">
        <NavMenu />
      </div>
      
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 backdrop-blur-md bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* Mobile Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-[#372f59] text-white z-50 transform transition-transform duration-300 lg:hidden ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <NavMenu onClose={() => setIsMobileMenuOpen(false)} />
      </div>
      
      <div className="flex flex-1 flex-col">
        <NavBar 
          onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          isMobileMenuOpen={isMobileMenuOpen}
        />
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}