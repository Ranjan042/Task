import React from 'react';
import Layout from './components/Layout';
import Header from './components/Header';
import CreateRecipeForm from './components/CreateRecipeForm';
import RecipeList from './components/RecipeList';
import { AppContext } from './contexts/AppContexts';
import { useContext } from 'react';

const App = () => {
  const {isFormOpen} = useContext(AppContext);
  return (
    <Layout>
      <Header />
      <div className="px-10 py-8 max-w-6xl mx-auto">
        {isFormOpen && <CreateRecipeForm />}
        <RecipeList />
      </div>
    </Layout>
  );
};

export default App;