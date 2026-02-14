import React, { useState } from 'react';
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
  Menu,
  X,
  UserPlus,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { icon: Home, label: 'Home', active: true },
    { icon: Search, label: 'Explore' },
    { icon: Bell, label: 'Notifications' },
    { icon: UserPlus, label: 'Follow' },
    { icon: Mail, label: 'Chat' },
    { icon: Zap, label: 'Grok' }, 
    { icon: Bookmark, label: 'Bookmarks' },
    { icon: FlaskConical, label: 'Creator Studio' },
    { icon: User, label: 'Profile' },
    { icon: CircleEllipsis, label: 'More' },
  ];
  
  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-8 z-50 p-2 bg-black rounded-full border border-gray-900"
      >
        {isMobileMenuOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed left-15 top-0 h-screen bg-black
        transition-all duration-300 z-40
        ${isMobileMenuOpen ? 'w-64' : 'w-0 lg:w-64'}
        overflow-hidden
      `}>
        <div className="px-3 w-64 h-full flex flex-col">
          <div className="mb-2 px-3 py-2 mt-12 lg:mt-2">
            <div className="w-8 h-8 ">
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
                className={`
                  flex items-center justify-between gap-4 px-3 py-3 rounded-full text-xl transition-colors w-full
                  ${item.active 
                    ? 'font-bold text-white hover:bg-[#181818]' 
                    : 'font-medium text-gray-100 hover:bg-[#181818]'
                  }
                `}
              >
                <div className="flex items-center gap-5">
                  <item.icon className={`h-6 w-6 ${item.active ? 'text-white' : 'text-gray-100'}`} />
                  <span>{item.label}</span>
                </div>
              </button>
            ))}
          </nav>

          <Button className="bg-white hover:bg-white text-black rounded-full py-6 mb-4 text-lg font-bold w-full">
            <Feather className="h-5 w-5 lg:hidden" />
            <span className="hidden lg:inline">Post</span>
          </Button>

          {/* User Profile Section */}
          <div className="mt-auto pt-4 mb-3">
            <button className="flex items-center gap-3 p-3 rounded-full hover:bg-[#181818] transition-colors w-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="bg-gray-800 text-white">JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left">
                <p className="font-bold text-sm text-white">John Doe</p>
                <p className="text-gray-500 text-sm">@johndoe</p>
              </div>
              <MoreHorizontal className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className={`transition-all duration-300 ${isMobileMenuOpen ? 'ml-64' : 'ml-0 lg:ml-64'}`}>
      </div>
    </>
  );
};

export default Sidebar;