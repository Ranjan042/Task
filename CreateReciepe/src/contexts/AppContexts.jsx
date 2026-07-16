import { createContext, useState } from "react";
import { set } from "react-hook-form";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {

    const [Receipe, setReceipe] = useState(LoadReciepeFromLocalStorage());
    const [filter, setfilter] = useState("all")
    const [isFormOpen, setisFormOpen] = useState(false);
    const [isFavoritopen, setisFavoritopen] = useState(false);
    const [FavoriteReceipe, setFavoriteReceipe] = useState(LoadFaouriteReceipeFromLocalStorage());
    const [editingItem, seteditingItem] = useState(null)
    // console.log(Receipe);

    function SaveReciepeToLocalStorage(reciepe) {
        console.log("Savng this in local storage", reciepe);
        localStorage.setItem('reciepe', JSON.stringify(reciepe || []));
    }

    function LoadReciepeFromLocalStorage() {
        const reciepe = localStorage.getItem('reciepe');
        return reciepe ? JSON.parse(reciepe) : [];
    }

    function SaveFaouriteReceipeToLocalStorage(reciepe) {
        localStorage.setItem('FavoriteReceipe', JSON.stringify(reciepe));
    }

    function LoadFaouriteReceipeFromLocalStorage() {
        const reciepe = localStorage.getItem('FavoriteReceipe');
        return reciepe ? JSON.parse(reciepe) : [];
    }


    return (
        <AppContext.Provider value={{Receipe, setReceipe,filter,setfilter,setisFormOpen,isFormOpen, SaveReciepeToLocalStorage,isFavoritopen, setisFavoritopen,FavoriteReceipe, setFavoriteReceipe, SaveFaouriteReceipeToLocalStorage,editingItem, seteditingItem}}>
            {children}
        </AppContext.Provider>
    )
};

export default AppContextProvider;
