import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContexts';

const Sidebar = () => {
  const {setfilter,setisFormOpen,setisFavoritopen}= useContext(AppContext);
  console.log(setisFormOpen);
  return (
    <aside className="w-64 bg-sidebar flex flex-col h-screen fixed border-r border-orange-100">
      <div className="p-6">
        <h1 className="text-xl font-bold font-serif mb-8 whitespace-nowrap">Mindful Nourishment</h1>
        
        <div className="flex items-center gap-3 mb-8 bg-white/50 p-2 rounded-lg cursor-pointer hover:bg-white/80 transition-colors">
          <div className="w-10 h-10 bg-gray-800 rounded-md flex items-center justify-center text-white shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">My Kitchen</p>
            <p className="text-xs text-gray-500">Home Cook</p>
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          <a onClick={()=>{setfilter("all")}}  className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-white rounded-md transition-colors font-medium">
            <span className="text-xl">☕</span>
            All
          </a>
          <a onClick={()=>{setfilter("Breakfast")}}  className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-white rounded-md transition-colors font-medium">
            <span className="text-xl">☕</span>
            Breakfast
          </a>
          <a onClick={()=>{setfilter("Lunch")}}  className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-white rounded-md transition-colors font-medium">
            <span className="text-xl">🥪</span>
            Lunch
          </a>
          <a onClick={()=>{setfilter("Dinner")}}  className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-white rounded-md transition-colors font-medium">
            <span className="text-xl">🍝</span>
            Dinner
          </a>
          <a onClick={()=>{setfilter("Dessert")}} className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-white rounded-md transition-colors font-medium">
            <span className="text-xl">🍦</span>
            Desserts
          </a>
          <a onClick={()=>{setisFavoritopen(true)}} href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-white rounded-md transition-colors font-medium mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Favorites
          </a>
        </nav>
      </div>

      <div className="mt-auto p-6">
        <button onClick={()=>{setisFormOpen(true)}} className="w-full bg-accent text-white py-3 px-4 rounded-md font-medium hover:bg-[#83402b] transition-colors shadow-sm">
          Add New Recipe
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
