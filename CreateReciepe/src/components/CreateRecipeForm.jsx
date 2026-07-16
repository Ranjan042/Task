import React, { useState, useEffect } from 'react';
import { set, useForm } from 'react-hook-form';
import {useContext} from 'react';
import {AppContext} from '../contexts/AppContexts';
const CreateRecipeForm = () => {

  const {Receipe, setReceipe, SaveReciepeToLocalStorage,isFormOpen, setisFormOpen, editingItem} = useContext(AppContext);

  const { register, handleSubmit, formState: { errors }, reset} = useForm();

  const [selectedTags, setSelectedTags] = useState([]);
  const [image, setImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const availableTags = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Quick & Easy', 'Healthy', 'Spicy', 'Dairy-Free', 'Low Carb'];
  
  useEffect(() => {
  if (editingItem) {
    reset({
      title: editingItem.title,
      image: editingItem.image,
      time: editingItem.time,
      difficulty: editingItem.difficulty,
      tags: editingItem.tags,
      ingredients: editingItem.ingredients,
      instructions: editingItem.instructions,
      category: editingItem.category,
    });
  }
}, [editingItem, reset]);
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      processImage(file);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      processImage(file);
    }
  };

  const processImage = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const HandleSubmit = (data) => {
     
    if(editingItem){
   

      console.log(updatedData);
      const updatedrecipes = Receipe.map((recipe) => {
        return recipe.title === editingItem.title ? { ...recipe, ...data } : recipe;
      })
   
      setReceipe(updatedrecipes);
      SaveReciepeToLocalStorage(updatedrecipes);
      setisFormOpen(false);
      return;
    }

    const isProductExists= Receipe.some((product) => product.title === data.title);
    if (isProductExists) {
      alert('Product already exists');
      return;
    }
    
    data.tags = selectedTags;
    data.favorites = false;
    data.image = image;
    console.log(data);

    setReceipe([...Receipe, data]);
    SaveReciepeToLocalStorage([...Receipe, data]);

    reset();
    setImage(null);
    setSelectedTags([]);

    setTimeout(() => {
      setisFormOpen(false);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-12">
      <h2 className="text-3xl font-bold font-serif mb-2 text-gray-900">Create New Recipe</h2>
      <p className="text-gray-500 mb-8">Document your latest culinary masterpiece with ease.</p>

      <form onSubmit={handleSubmit(HandleSubmit)}>
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-2">Recipe Name</label>
          <input 
            {...register('title', { required: "Recipe name is required", minLength: { value: 3, message: "Recipe name must be at least 3 characters long" } })}
            type="text" 
            placeholder="e.g., Summer Berry Tart" 
            className="w-full bg-[#FCF8F5] border border-[#F0E5D8] rounded-md py-3 px-4 text-gray-800 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
          />
        </div>
        
        <p>{errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}</p>

        <div className="flex gap-6 mb-6">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-900 mb-2">Prep Time (mins)</label>
            <input 
             {...register('time', { required: "Prep time is required", min: { value: 0, message: "Prep time must be at least 0 minutes" } })}
              type="number" 
              placeholder="30" 
              className="w-full bg-[#FCF8F5] border border-[#F0E5D8] rounded-md py-3 px-4 text-gray-800 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
            />
          </div>

          <p>{errors.time && <span className="text-red-500 text-sm">{errors.time.message}</span>}</p>

          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-900 mb-2">Servings</label>
            <input 
              {...register('servings', { required: "Servings is required", min: { value: 0, message: "Servings must be at least 0" } })}
              type="number" 
              placeholder="4" 
              className="w-full bg-[#FCF8F5] border border-[#F0E5D8] rounded-md py-3 px-4 text-gray-800 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
            />
          </div>

          <p>{errors.servings && <span className="text-red-500 text-sm">{errors.servings.message}</span>}</p>

          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-900 mb-2">Category</label>
            <div className="relative">
              <select
              {...register('category', { required: true })}
              className="w-full bg-[#FCF8F5] border border-[#F0E5D8] rounded-md py-3 px-4 text-gray-800 appearance-none focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent">
                <option>Main Course</option>
                <option>Breakfast</option>
                <option>Dessert</option>
                <option>Snack</option>
                <option>Drink</option>
              </select>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-3">Tags</label>
          <div className="flex flex-wrap gap-2">
            {availableTags.map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                  selectedTags.includes(tag) 
                    ? 'bg-accent text-white border-accent shadow-sm' 
                    : 'bg-[#FCF8F5] text-gray-600 border-[#F0E5D8] hover:border-accent hover:text-accent'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-3">Recipe Image</label>
          <div 
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${isDragging ? 'border-accent bg-accent/5' : 'border-gray-300 bg-[#FCF8F5] hover:bg-gray-50'}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {image ? (
              <div className="relative inline-block">
                <img src={image} alt="Recipe preview" className="max-h-48 rounded-lg mx-auto" />
                <button 
                  type="button" 
                  onClick={() => setImage(null)}
                  className="absolute -top-3 -right-3 bg-white text-gray-700 hover:text-red-500 rounded-full p-1 shadow-md border border-gray-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <p className="text-sm text-gray-600 mb-2">Drag and drop an image here, or</p>
                <label className="cursor-pointer bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium shadow-sm">
                  Browse Files
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                </label>
                <p className="text-xs text-gray-500 mt-3">Supports JPG, PNG, WEBP</p>
              </div>
            )}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-2">Ingredients</label>
          <textarea 
            {...register('ingredients', { required: true })}
            rows="4"
            placeholder="List your ingredients here..." 
            className="w-full bg-[#FCF8F5] border border-[#F0E5D8] rounded-md py-3 px-4 text-gray-800 resize-none focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
          ></textarea>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="bg-accent text-white py-3 px-6 rounded-md font-medium hover:bg-[#83402b] transition-colors shadow-sm flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            Save Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRecipeForm;
