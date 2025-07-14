import ThemeButton from "../CodeModules/ThemeButton";

interface NavBarProps {
  onMenuToggle: () => void;
  isMobileMenuOpen: boolean;
}

export default function NavBar({ onMenuToggle, isMobileMenuOpen }: NavBarProps) {
  return (
    <div className="text-lg sm:text-xl py-2 px-4 flex justify-between items-center h-16 bg-[#372f59]">
      {/* Mobile menu button */}
      <button 
        onClick={onMenuToggle}
        className="lg:hidden p-2 text-white hover:bg-[#3f3564] rounded transition-colors"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18"/>
          </svg>
        )}
      </button>
      
      {/* Spacer for desktop */}
      <div className="hidden lg:block"></div>
      
      {/* Theme button */}
      <div className="flex items-center">
        <ThemeButton />
      </div>
    </div>
  );
}