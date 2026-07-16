import React from 'react';
import { AppContext } from '../contexts/AppContexts';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';

const RecipeCard = ({ recipe }) => {
  const { title, image, time, difficulty, tags, key } = recipe;
  const { Receipe, setReceipe, SaveReciepeToLocalStorage, editingItem, seteditingItem, setisFormOpen } = useContext(AppContext);

  const ToogleFavourite = (title) => {
    console.log(title);
    console.log(Receipe);
    const updatedrecipes = Receipe.map((recipe) => {
      return recipe.title === title ? { ...recipe, favorites: !recipe.favorites } : recipe;
    })
    console.log(updatedrecipes);
    setReceipe(updatedrecipes);
    SaveReciepeToLocalStorage(updatedrecipes);
  }

  const EditReceipe = (title) => {
    const recipeToEdit = Receipe.find((recipe) => recipe.title === title);
    console.log("recipeToEdit", recipeToEdit);
    seteditingItem(recipeToEdit);
    setisFormOpen(true);

  }

  const DeleteReceipe = (title) => {
    const updatedrecipes = Receipe.filter((recipe) => recipe.title !== title);
    setReceipe(updatedrecipes);
    SaveReciepeToLocalStorage(updatedrecipes);
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group cursor-pointer hover:shadow-md transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              EditReceipe(title);
            }}
            className="bg-white p-2 rounded-full shadow-sm text-gray-600 hover:text-blue-500 transition-colors"
            title="Edit recipe"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              // Add delete logic here
              DeleteReceipe(title);
            }}
            className="bg-white p-2 rounded-full shadow-sm text-gray-600 hover:text-red-500 transition-colors"
            title="Delete recipe"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              ToogleFavourite(title);
            }}
            className={`bg-white p-2 rounded-full shadow-sm ${recipe.favorites ? "text-red-500" : "text-gray-600"} hover:text-red-500 transition-colors`}
            title={recipe.favorites ? "Remove from favorites" : "Add to favorites"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={recipe.favorites ? "red" : "none"} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag, index) => (
            <span key={index} className="bg-gray-100 text-gray-600 text-[10px] font-bold tracking-wider px-2 py-1 rounded-full uppercase">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-serif text-lg font-bold text-gray-900 mb-3">{title}</h3>

        <div className="flex items-center justify-between text-xs text-gray-500 font-medium mt-auto">
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {time}
          </div>
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            {difficulty}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
