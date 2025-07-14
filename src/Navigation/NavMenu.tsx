import { useNavigate, Link } from "react-router-dom";

interface NavMenuProps {
  onClose?: () => void;
}

export default function NavMenu({ onClose }: NavMenuProps) {
  const items = [
    {
      name: 'Copy to Clipboard',
      slug: 'copy-to-clipboard'
    },
    {
      name: 'Alert Dialog',
      slug: 'alert-dialog'
    },
    {
      name: 'Theme Toggler',
      slug: 'theme-toggler'
    },
    {
      name: 'Toast',
      slug: 'toast'
    },
    {
      name: 'Counter',
      slug: 'counter'
    },
    {
      name: 'Generic List View',
      slug: 'generic-list-view'
    },
  ];

  const navigate = useNavigate();

  const handleNavigation = (slug: string) => {
    navigate(slug);
    if (onClose) onClose(); // Close mobile menu after navigation
  };

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 text-lg sm:text-xl h-16 flex items-center justify-between border-b border-gray-500">
        <Link to="/" className="hover:text-gray-300 transition-colors">
          <span className="hidden sm:inline">Component Library</span>
          <span className="sm:hidden">Components</span>
        </Link>
        {/* Close button for mobile */}
        {onClose && (
          <button 
            onClick={onClose}
            className="lg:hidden p-1 hover:bg-[#3f3564] rounded"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        )}
      </div>
      <ul className="text-base sm:text-lg flex-1 overflow-y-auto">
        {items.map((item) => (
          <li 
            key={item.name} 
            className="py-4 sm:py-5 px-4 sm:px-6 hover:bg-[#3f3564] cursor-pointer duration-75 transition-colors"
            onClick={() => handleNavigation(item.slug)}
          >
            <span className="block truncate">{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}