import React, { useState, useEffect, useRef } from 'react';
import {
  Heart,
  MessageCircle,
  Repeat2,
  MoreHorizontal,
  ChartNoAxesColumn,
  Image,
  Smile,
  Calendar,
  MapPin,
  Globe,
  Search,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';

const Explorepage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('for-you');
  const [postText, setPostText] = useState('');
  const [showExplore, setShowExplore] = useState(false);
  // Added missing search state
  const [query, setQuery] = useState('');
  const [isActive, setIsActive] = useState(false);
  const searchContainerRef = useRef(null);

  const API_URL = 'https://698eff28aded595c25336fea.mockapi.io/tweets';

  const handleSubmit = (e) => {
    e.preventDefault();
    // Removed onSearch reference since it's not defined
    console.log('Search query:', query);
    setIsActive(false);
  };

  const handleFocus = () => {
    setIsActive(true);
  };

  // Fixed nested useEffect and added proper click outside handler
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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const enhancedData = data.map(post => ({
          ...post,
          userHandle: `@${post.userName?.toLowerCase().replace(/\s+/g, '') || 'user'}`,
          mediaType: 'none',
          mediaUrl: '',
          mediaDuration: '',
          timestamp: 'Just now',
          liked: false,
          reposted: false,
          views: post.views ? `${post.views}` : '0'
        }));
        setPosts(enhancedData);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    const updatedPosts = posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            liked: !post.liked, 
            likes: post.liked ? post.likes - 1 : post.likes + 1 
          }
        : post
    );
    setPosts(updatedPosts);

    const post = posts.find(p => p.id === postId);
    try {
      await fetch(`${API_URL}/${postId}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ 
          ...post, 
          likes: post.liked ? post.likes - 1 : post.likes + 1 
        }),
      });
    } catch (err) {
      console.error('Error updating like:', err);
      setPosts(posts);
    }
  };

  const handleRepost = async (postId) => {
    const updatedPosts = posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            reposted: !post.reposted, 
            reposts: post.reposted ? post.reposts - 1 : post.reposts + 1 
          }
        : post
    );
    setPosts(updatedPosts);

    const post = posts.find(p => p.id === postId);
    try {
      await fetch(`${API_URL}/${postId}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ 
          ...post, 
          reposts: post.reposted ? post.reposts - 1 : post.reposts + 1 
        }),
      });
    } catch (err) {
      console.error('Error updating repost:', err);
      setPosts(posts);
    }
  };

  const handleCreatePost = async () => {
    if (!postText.trim()) return;

    const newPost = {
      userName: 'John Doe',
      userAvatar: 'https://github.com/shadcn.png',
      verified: false,
      content: postText,
      mediaCaption: '',
      replies: 0,
      reposts: 0,
      likes: 1,
      views: 10,
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        const createdPost = await response.json();
        const enhancedPost = {
          ...createdPost,
          userHandle: `@${createdPost.userName?.toLowerCase().replace(/\s+/g, '') || 'user'}`,
          mediaType: 'none',
          mediaUrl: '',
          mediaDuration: '',
          timestamp: 'Just now',
          liked: false,
          reposted: false,
          views: '0'
        };
        setPosts([enhancedPost, ...posts]);
        setPostText('');
      }
    } catch (err) {
      console.error('Error creating post:', err);
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const handleTabChange = (value) => {
    setActiveTab(value);
    setShowExplore(value === 'explore');
  };

  if (loading) {
    return (
      <div className="bg-black text-white h-screen overflow-y-auto scrollbar-hide">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Loading posts...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black text-white">
        <div className="flex justify-center items-center h-64">
          <div className="text-red-500">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white h-screen overflow-y-auto scrollbar-hide">
      <header className="sticky top-0 z-10 backdrop-blur-sm border-b border-gray-800 bg-black/80">
      <div className="sticky top-0 z-20 bg-black p-2 pb-1 w-full flex items-center justify-between px-4" ref={searchContainerRef}>
          <form onSubmit={handleSubmit} className="relative flex-1 max-w-130">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-white/40" />
            </div>
            
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={handleFocus}
              placeholder="Search"
              className="block w-full pl-9 pr-4 py-3 font-sans border border-gray-700 rounded-full bg-black focus:bg-white/5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 text-sm text-white placeholder-white/40 transition-all duration-200"
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
                            console.log('Search query:', query);
                            setIsActive(false);
                          }}
                        >
                          <p className="text-white font-medium">People matching "{query}"</p>
                          <p className="text-gray-500 text-sm">@username</p>
                        </div>
                        <div 
                          className="p-4 hover:bg-[#202327] cursor-pointer"
                          onClick={() => {
                            console.log('Search query:', query);
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
          <button className="p-2 rounded-full text-white hover:bg-white/10 transition-all duration-200 shrink-0 ml-4">
          <Settings className='h-5 w-5'/>
          </button>
        </div>
        <Tabs defaultValue="for-you" className="w-full" onValueChange={handleTabChange}>
          <TabsList variant="line" className="w-full h-auto bg-transparent border-none p-0 rounded-none flex">
            <TabsTrigger 
              value="for-you" 
              className="flex-1 pt-4 pb-3 text-base font-bold data-[state=active]:text-white data-[state=inactive]:text-gray-500 data-[state=active]:hover:bg-[#181818] data-[state=inactive]:hover:bg-[#181818] transition-colors rounded-none"
            >
              For you
            </TabsTrigger>
            <TabsTrigger 
              value="trending" 
              className="flex-1 pt-4 pb-3 text-base font-bold data-[state=active]:text-white data-[state=inactive]:text-gray-500 data-[state=active]:hover:bg-[#181818] data-[state=inactive]:hover:bg-[#181818] transition-colors rounded-none"
            >
              Trending
            </TabsTrigger>
            <TabsTrigger 
              value="news" 
              className="flex-1 pt-4 pb-3 text-base font-bold data-[state=active]:text-white data-[state=inactive]:text-gray-500 data-[state=active]:hover:bg-[#181818] data-[state=inactive]:hover:bg-[#181818] transition-colors rounded-none"
            >
              News
            </TabsTrigger>
            <TabsTrigger 
              value="sports" 
              className="flex-1 pt-4 pb-3 text-base font-bold data-[state=active]:text-white data-[state=inactive]:text-gray-500 data-[state=active]:hover:bg-[#181818] data-[state=inactive]:hover:bg-[#181818] transition-colors rounded-none"
            >
              Sports
            </TabsTrigger>
            <TabsTrigger 
              value="entertainment" 
              className="flex-1 pt-4 pb-3 text-base font-bold data-[state=active]:text-white data-[state=inactive]:text-gray-500 data-[state=active]:hover:bg-[#181818] data-[state=inactive]:hover:bg-[#181818] transition-colors rounded-none"
            >
              Entertainment
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </header>
      
      {activeTab === 'for-you' && (
        <>
          <div className="p-4 border-b border-gray-800">
            <div className="flex gap-3">
              <Avatar className="h-10 w-10 shrink-0">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="bg-gray-800 text-white">U</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="min-h-15">
                  <textarea
                    placeholder="What's happening?"
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    className="w-full bg-transparent text-xl placeholder:text-gray-500 outline-none resize-none"
                    rows={2}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 text-blue-500">
                    <button className="p-2 hover:bg-blue-500/10 rounded-full transition-colors">
                      <Image className="h-5 w-5" />
                    </button>
                    <button className="p-2 hover:bg-blue-500/10 rounded-full transition-colors">
                      <Smile className="h-5 w-5" />
                    </button>
                    <button className="p-2 hover:bg-blue-500/10 rounded-full transition-colors">
                      <Calendar className="h-5 w-5" />
                    </button>
                    <button className="p-2 hover:bg-blue-500/10 rounded-full transition-colors">
                      <MapPin className="h-5 w-5" />
                    </button>
                    <button className="p-2 hover:bg-blue-500/10 rounded-full transition-colors">
                      <Globe className="h-5 w-5" />
                    </button>
                  </div>
                  <Button 
                    onClick={handleCreatePost}
                    className="bg-white hover:bg-white/90 text-black rounded-full px-5 py-0 h-9 font-bold text-sm"
                  >
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-800">
            {posts.map((post) => (
              <article key={post.id} className="p-4 hover:bg-gray-900/50 transition-colors">
                <div className="flex gap-3">
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarImage src={post.userAvatar} />
                    <AvatarFallback className="bg-gray-800 text-white">
                      {post.userName?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 flex-wrap">
                        <span className="font-bold hover:underline">{post.userName}</span>
                        {post.verified && (
                          <svg className="h-4 w-4 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484z"/>
                          </svg>
                        )}
                        <span className="text-gray-500 text-sm">
                          @{post.userName?.toLowerCase().replace(/\s+/g, '') || 'user'}
                        </span>
                        <span className="text-gray-500 text-sm">·</span>
                        <span className="text-gray-500 text-sm hover:underline">
                          {post.timestamp || 'Just now'}
                        </span>
                      </div>
                      <button className="text-gray-500 hover:text-blue-500 p-2 rounded-full hover:bg-blue-500/10">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-2 space-y-3">
                      <p className="text-white whitespace-pre-wrap">{post.content}</p>
                      
                      {post.mediaCaption && (
                        <div className="rounded-2xl border border-gray-800 p-3">
                          <p className="text-sm text-gray-400">{post.mediaCaption}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-4 mt-3 text-gray-500 text-sm">
                      <button className="flex items-center gap-1 hover:text-blue-500 group">
                        <div className="p-2 rounded-full group-hover:bg-blue-500/10">
                          <MessageCircle className="h-4 w-4" />
                        </div>
                        <span>{formatNumber(post.replies || 0)}</span>
                      </button>
                      <button 
                        onClick={() => handleRepost(post.id)}
                        className={`flex items-center gap-1 group ${post.reposted ? 'text-green-500' : 'hover:text-green-500'}`}
                      >
                        <div className={`p-2 rounded-full ${post.reposted ? 'bg-green-500/10' : 'group-hover:bg-green-500/10'}`}>
                          <Repeat2 className="h-4 w-4" />
                        </div>
                        <span>{formatNumber(post.reposts || 0)}</span>
                      </button>
                      <button 
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center gap-1 group ${post.liked ? 'text-pink-500' : 'hover:text-pink-500'}`}
                      >
                        <div className={`p-2 rounded-full ${post.liked ? 'bg-pink-500/10' : 'group-hover:bg-pink-500/10'}`}>
                          <Heart className={`h-4 w-4 ${post.liked ? 'fill-pink-500' : ''}`} />
                        </div>
                        <span>{formatNumber(post.likes || 0)}</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-blue-500 group">
                        <div className="p-2 rounded-full group-hover:bg-blue-500/10">
                          <ChartNoAxesColumn className="h-4 w-4" />
                        </div>
                        <span>{post.views || 0}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </>
      )}

      {activeTab === 'trending' && (
        <div className="p-4">
          <h2 className="text-2xl font-bold text-white mb-4">Trending</h2>
          <p className="text-gray-500">Discover what's trending now</p>
        </div>
      )}

      {activeTab === 'news' && (
        <div className="p-4">
          <h2 className="text-2xl font-bold text-white mb-4">News</h2>
          <p className="text-gray-500">Latest news and updates</p>
        </div>
      )}

      {activeTab === 'sports' && (
        <div className="p-4">
          <h2 className="text-2xl font-bold text-white mb-4">Sports</h2>
          <p className="text-gray-500">Sports news and highlights</p>
        </div>
      )}

      {activeTab === 'entertainment' && (
        <div className="p-4">
          <h2 className="text-2xl font-bold text-white mb-4">Entertainment</h2>
          <p className="text-gray-500">Entertainment news and updates</p>
        </div>
      )}
    </div>
  );
};

export default Explorepage;
