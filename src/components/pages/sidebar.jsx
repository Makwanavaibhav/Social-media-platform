import React, { useState, useEffect } from 'react';
import {
  Home,
  Search,
  Bell,
  Mail,
  Users,
  Bookmark,
  FlaskConical,
  User,
  CircleEllipsis,
  MoreHorizontal,
  Feather,
  Sparkles,
  UserPlus,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Sidebar = ({ currentPage = 'home', onNavigate }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [showExplore, setShowExplore] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 1280);
      setShowExplore(width >= 1000);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { icon: Home, label: 'Home', page: 'home' },
    ...(showExplore ? [{ icon: Search, label: 'Explore', page: 'explore' }] : []),
    { icon: Bell, label: 'Notifications', page: 'notifications' },
    { icon: UserPlus, label: 'Follow', page: 'follow' },
    { icon: Mail, label: 'Chat', page: 'chat' },
    { icon: Zap, label: 'Grok', page: 'grok' }, 
    { icon: Bookmark, label: 'Bookmarks', page: 'bookmarks' },
    { icon: FlaskConical, label: 'Creator Studio', page: 'creator-studio' },
    { icon: User, label: 'Profile', page: 'profile' },
    { icon: CircleEllipsis, label: 'More', page: 'more' },
  ];

  const handleNavClick = (page) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };
  
  return (
    <>
      <aside className={`fixed ${isMobile ? 'left-0' : 'left-14'} top-0 h-screen bg-black w-20 xl:w-64 transition-all duration-300 z-40`}>
        <div className={`pl-3 pr-1 xl:px-1 w-20 xl:w-64 h-full flex flex-col`}>
          <div className="mb-2 px-3 py-2 mt-2">
            <div className="w-8 h-8">
              <img 
                src="/src/assets/logo.jpg"
                alt="X" 
                className="w-full h-full text-white"
              />
              <span className="sr-only">X</span>
            </div>
          </div>

          <nav className="flex-1 space-y-1">
{navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.page)}
                className={`
                  flex items-center justify-center xl:justify-between gap-4 px-3 py-3 rounded-full text-xl transition-colors w-full
                  ${currentPage === item.page
                    ? 'font-bold text-white hover:bg-[#181818]' 
                    : 'font-medium text-gray-100 hover:bg-[#181818]'
                  }
                `}
              >
                <div className="flex items-center gap-5">
                  <item.icon className={`h-6 w-6 ${currentPage === item.page ? 'text-white' : 'text-gray-100'}`} />
                  <span className="hidden xl:inline">{item.label}</span>
                </div>
              </button>
            ))}
          </nav>

          <Button className="bg-white hover:bg-white text-black rounded-full py-6 mb-4 text-lg font-bold w-full flex items-center justify-center">
            <Feather className="h-5 w-5 xl:hidden" />
            <span className="hidden xl:inline xl:ml-2">Post</span>
          </Button>

          <div className="mt-auto pt-4 mb-3">
            <button className="flex items-center justify-center xl:justify-start gap-3 p-3 rounded-full hover:bg-[#181818] transition-colors w-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="bg-gray-800 text-white">JD</AvatarFallback>
              </Avatar>
              <div className="hidden xl:block flex-1 text-left">
                <p className="font-bold text-sm text-white">John Doe</p>
                <p className="text-gray-500 text-sm">@johndoe</p>
              </div>
              <MoreHorizontal className="hidden xl:block h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>
      </aside>
      <div className={`ml-20 ${isMobile ? 'ml-0' : 'xl:ml-64'}`}>
      </div>
    </>
  );
};

export default Sidebar;
