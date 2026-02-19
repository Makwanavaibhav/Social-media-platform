import React from 'react';
import Sidebar from './components/pages/sidebar';
import { Toaster } from '@/components/ui/sonner';
import HomePage from '@/components/pages/homepage';
import Explore from './components/pages/Explore';

function App() {
  return (
    <div className="bg-black">
      <div className="flex">
        <Sidebar />
        
        <main className="ml-20 flex-1 border-x border-[#2f3338] min-h-screen">
          <HomePage/>
        </main>

        <aside className="w-110 pr-10 hidden lg:block">
          <Explore />
        </aside>
      </div>
      <Toaster />
    </div>
  );
}

export default App;