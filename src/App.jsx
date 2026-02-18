import React from 'react';
import Sidebar from './components/pages/sidebar';
import { Toaster } from '@/components/ui/sonner';
import HomePage from '@/components/pages/homepage';

function App() {
  return (
    <div className="min-h-screen bg-black">
      <div className="flex">
        <Sidebar />
        
        <main className="ml-20 flex-1 border-x border-[#2f3338] min-h-screen">
          <div>
          <HomePage/>
          </div>
        </main>

        <aside className="w-md p-4 hidden lg:block">
        </aside>
      </div>
      <Toaster />
    </div>
  );
}

export default App;