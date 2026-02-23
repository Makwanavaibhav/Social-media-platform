import React, { useState, useRef, useEffect } from 'react';
import { Search, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const Explore = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [isActive, setIsActive] = useState(false);
  const searchContainerRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleFocus = () => {
    setIsActive(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-black h-screen overflow-y-auto scrollbar-hide">
      <div className="sticky top-0 z-20 bg-black p-4 pb-2" ref={searchContainerRef}>
        <form onSubmit={handleSubmit} className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-500" />
          </div>
          
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleFocus}
            placeholder="Search"
            className="block w-full pl-11 pr-4 py-3 border border-gray-700 rounded-full bg-black focus:bg-[#202327] focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 text-sm text-white placeholder-gray-500 transition-all duration-200"
          />

          {isActive && (
            <div className="absolute top-full left-0 right-0 mt-1">
              <div className="border border-gray-700 rounded-xl bg-black overflow-hidden shadow-[0_0_10px_rgba(255,255,255,0.4)] z-10">
                <div className="max-h-96 overflow-y-auto">
                  {query ? (
                    <>
                      <div 
                        className="p-4 hover:bg-[#202327] cursor-pointer border-b border-gray-800 last:border-0"
                        onClick={() => {
                          if (onSearch) onSearch(query);
                          setIsActive(false);
                        }}
                      >
                        <p className="text-white font-medium">People matching "{query}"</p>
                        <p className="text-gray-500 text-sm">@username</p>
                      </div>
                      <div 
                        className="p-4 hover:bg-[#202327] cursor-pointer"
                        onClick={() => {
                          if (onSearch) onSearch(query);
                          setIsActive(false);
                        }}
                      >
                        <p className="text-white font-medium">Keywords related to "{query}"</p>
                        <p className="text-gray-500 text-sm">1.2K posts</p>
                      </div>
                    </>
                  ) : (
                    <div className="p-4">
                      <p className="text-gray-500 pb-8 text-center font-medium">
                        Try searching for people, lists, or keywords
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </form>
      </div>

      <div className="px-4 pb-4">
        <div className="bg-black rounded-2xl p-4 border border-gray-800 mb-4">
          <h2 className="text-xl font-bold text-white mb-1">Subscribe to Premium</h2>
          <div className="text-green-300/70 bg-green-950 border border-green-950 rounded-md w-20 h-6 font-bold text-sm text-center mb-2">50% off</div>
          <p className="text-gray-400 text-sm mb-3">
            Get rid of ads, see your analytics, boost your replies and unlock 20+ features.
          </p>
          <Button className="bg-blue-400 text-white hover:bg-blue-400/80 rounded-full font-bold px-6 py-2">
            Subscribe
          </Button>
        </div>

        <div className="bg-black rounded-2xl border border-gray-800 overflow-hidden mb-4">
          <h2 className="text-xl font-bold text-white p-4">Today's News</h2>
          
          <div className="divide-y divide-gray-800">
            <div className="p-4 hover:bg-white/5 cursor-pointer transition-colors">
              <p className="text-white font-medium mb-1">Jujutsu Kaisen Fans Debate Sukuna or Kenjaku as Jujutsu Teacher</p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>📅 7 hours ago</span>
                <span>·</span>
                <span>Entertainment</span>
                <span>·</span>
                <span>2,663 posts</span>
              </div>
            </div>

            <div className="p-4 hover:bg-white/5 cursor-pointer transition-colors">
              <p className="text-white font-medium mb-1">Artist Faces Client Chargeback Over Improved Skills</p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>👥 10 hours ago</span>
                <span>·</span>
                <span>Other</span>
                <span>·</span>
                <span>4,172 posts</span>
              </div>
            </div>

            <div className="p-4 hover:bg-white/5 cursor-pointer transition-colors">
              <p className="text-white font-medium mb-1">One Piece Anime Returns with Elbaph Arc on Crunchyroll April 5</p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>🎉 18 hours ago</span>
                <span>·</span>
                <span>Entertainment</span>
                <span>·</span>
                <span>2,950 posts</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-black rounded-2xl border border-gray-800 overflow-hidden mb-4">
          <h2 className="text-xl font-bold text-white p-4">What's happening</h2>
          
          <div className="divide-y divide-gray-800">
            <div className="p-4 hover:bg-white/5 cursor-pointer transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-white font-bold mb-1">Crypto. Dad Approved</p>
                  <p className="text-gray-400 text-sm mb-1">Make informed crypto investments with CoinDCX.</p>
                  <p className="text-xs text-gray-500">📌 Promoted by CoinDCX: India Ka Crypto Coach</p>
                </div>
                <button className="text-gray-500 hover:text-blue-500">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="p-4 hover:bg-white/5 cursor-pointer transition-colors">
              <p className="text-xs text-gray-500 mb-1">Sports · Trending</p>
              <p className="text-white font-bold mb-1">Abhishek Sharma</p>
              <p className="text-xs text-gray-500">Only on X · Trending</p>
            </div>

            <div className="p-4 hover:bg-white/5 cursor-pointer transition-colors">
              <p className="text-xs text-gray-500 mb-1">Trending</p>
              <p className="text-white font-bold mb-1">TrueService By SatlokAshram</p>
              <p className="text-xs text-gray-500">Only on X · Trending</p>
            </div>
          </div>
          
          <button className="w-full text-left text-blue-500 hover:bg-white/5 p-4 transition-colors">
            Show more
          </button>
        </div>

        <div className="bg-black rounded-2xl border border-gray-800 overflow-hidden">
          <h2 className="text-xl font-bold text-white p-4">Who to follow</h2>
          
          <div className="divide-y divide-gray-800">
            <div className="p-4 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="https://picsum.photos/200/200?random=1" />
                  <AvatarFallback className="bg-gray-800 text-white">HR</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-white">Hrithik Roshan</span>
                  </div>
                  <span className="text-gray-500 text-sm">@iHrithik</span>
                </div>
                <Button className="bg-white text-black hover:bg-gray-200 rounded-full px-4 py-1 text-sm font-bold">
                  Follow
                </Button>
              </div>
            </div>

            <div className="p-4 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="https://picsum.photos/200/200?random=2" />
                  <AvatarFallback className="bg-gray-800 text-white">AK</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-white">Akshay Kumar</span>
                  </div>
                  <span className="text-gray-500 text-sm">@akshaykumar</span>
                </div>
                <Button className="bg-white text-black hover:bg-gray-200 rounded-full px-4 py-1 text-sm font-bold">
                  Follow
                </Button>
              </div>
            </div>

            <div className="p-4 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="https://picsum.photos/200/200?random=3" />
                  <AvatarFallback className="bg-gray-800 text-white">SR</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-white">Shri Ram Janmbhoo...</span>
                  </div>
                  <span className="text-gray-500 text-sm">@ShriRamTeerth</span>
                </div>
                <Button className="bg-white text-black hover:bg-gray-200 rounded-full px-4 py-1 text-sm font-bold">
                  Follow
                </Button>
              </div>
            </div>
          </div>
          
          <button className="w-full text-left text-blue-500 hover:bg-white/5 p-4 transition-colors">
            Show more
          </button>
        </div>
      </div>
    </div>
  );
};

export default Explore;