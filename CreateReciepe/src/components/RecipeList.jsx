import React, { useContext } from 'react';
import RecipeCard from './RecipeCard';
import { AppContext } from '../contexts/AppContexts';

const recipes = [
  {
    title: 'Herb-Roasted Salmon',
    image: '/herb_roasted_salmon.png',
    time: '25 mins',
    difficulty: 'Intermediate',
    tags: ['HEALTHY', 'FAST']
  },
  {
    title: 'Wild Mushroom Risotto',
    image: '/wild_mushroom_risotto.png',
    time: '45 mins',
    difficulty: 'Advanced',
    tags: ['VEGETARIAN']
  },
  {
    title: 'Artisan Avocado Toast',
    image: '/avocado_toast.png',
    time: '15 mins',
    difficulty: 'Beginner',
    tags: ['VEGAN OPTION']
  },
  {
    title: 'Moroccan Chickpea Stew',
    image: '/chickpea_stew.png',
    time: '40 mins',
    difficulty: 'Intermediate',
    tags: ['GLUTEN-FREE']
  },
  {
    title: 'Lemon Blueberry Muffins',
    image: '/blueberry_muffins.png',
    time: '35 mins',
    difficulty: 'Beginner',
    tags: ['BAKERY']
  },
  {
    title: 'Beet & Goat Cheese Salad',
    image: '/beet_salad.png',
    time: '20 mins',
    difficulty: 'Easy',
    tags: ['SEASONAL']
  }
];

const RecipeList = () => {
  const { Receipe,filter,isFavoritopen } = useContext(AppContext);

  console.log(Receipe);
  console.log(filter);

  console.log(" isFavoritopen",isFavoritopen);

  // {isFavoritopen && (
  //   <div className="flex justify-between items-end mb-6">
  //       <div>
  //         <h2 className="text-3xl font-bold font-serif mb-1 text-gray-900">My Favorites</h2>
  //         <p className="text-gray-500">Your personal collection of curated flavors.</p>
  //       </div>
      
  //     </div>
  // )}
  
  const allRecipes = filter === 'all' ? Receipe : Receipe.filter((recipe) => recipe.category === (filter));

  console.log(allRecipes);
  return (
    <div className="pb-12">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-3xl font-bold font-serif mb-1 text-gray-900">My Recipes</h2>
          <p className="text-gray-500">Your personal collection of curated flavors.</p>
        </div>
      
      </div>

     {
        allRecipes.length === 0 && (
          <p className="text-gray-500 text-center">No recipes found.</p>
        )
      }


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allRecipes.map((recipe, index) => (
          <RecipeCard 
            recipe={recipe}
            key={index}
            title={recipe.title}
            favorite={recipe.favorites}
            image={recipe.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'}
            time={recipe.time ? `${recipe.time} mins` : 'N/A'}
            difficulty={recipe.difficulty || 'N/A'}
            tags={recipe.tags || []}
          />
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
