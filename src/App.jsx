import React from 'react';
import Sidebar from './components/pages/sidebar';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <div className="min-h-screen bg-black">
      <div className="flex">
        <Sidebar />
        
        <main className="ml-20 flex-1 border-x border-[#2f3338] min-h-screen">
          <div className="p-4">
            <h1 className="text-2xl font-bold text-white">Home</h1>
          </div>
        </main>

        <aside className="w-115 p-4 hidden lg:block">
        </aside>
      </div>
      <Toaster />
    </div>
  );
}

export default App;