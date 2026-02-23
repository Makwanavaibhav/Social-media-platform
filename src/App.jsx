import React, { useState } from 'react';
import Sidebar from './components/pages/sidebar';
import { Toaster } from '@/components/ui/sonner';
import HomePage from '@/components/pages/homepage';
import Explore from './components/pages/Explore';
import ExplorePage from '@/components/pages/explorepage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="bg-black">
      <div className="flex">
        <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
        
        <main className="ml-1 lg:ml-24 2xl:ml-68 flex-1 border-x border-[#2f3338] min-h-screen transition-all duration-300 ">
          {currentPage === 'home' ? <HomePage /> : <ExplorePage />}
        </main>

        <aside className="w-110 pr-10 hidden lg:block">
          <Explore currentPage={currentPage} />
        </aside>
      </div>
      <Toaster />
    </div>
  );
}

export default App;