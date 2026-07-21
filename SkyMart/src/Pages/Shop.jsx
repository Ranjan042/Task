import React, { useState, useMemo,useContext} from 'react'
import { Search, ShoppingCart, X, Check, ChevronDown, Star } from 'lucide-react'
import NavBar from '../components/NavBar'
import ProductCard from '../components/ProductCard'
import {CartContext} from '../context/CartContext'
import { useLocation } from 'react-router'


export const PRODUCTS = [
  {
    "id": 18,
    "name": "Gaming Laptop Pro",
    "category": "Electronics",
    "price": 1299.99,
    "rating": 5,
    "reviews": 142,
    "image": "https://images.pexels.com/photos/14127564/pexels-photo-14127564.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  },
  {
    "id": 19,
    "name": "Bluetooth Speaker",
    "category": "Electronics",
    "price": 89.99,
    "rating": 4,
    "reviews": 198,
    "image": "https://images.pexels.com/photos/4917455/pexels-photo-4917455.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  },
  {
    "id": 20,
    "name": "Wireless Charger",
    "category": "Electronics",
    "price": 39.99,
    "rating": 4,
    "reviews": 111,
    "image": "https://images.pexels.com/photos/5083490/pexels-photo-5083490.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  },
  {
    "id": 21,
    "name": "Portable Projector",
    "category": "Electronics",
    "price": 249.99,
    "rating": 4,
    "reviews": 74,
    "image": "https://images.pexels.com/photos/31726737/pexels-photo-31726737.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  },
  {
    "id": 22,
    "name": "Gaming Controller",
    "category": "Electronics",
    "price": 69.99,
    "rating": 5,
    "reviews": 256,
    "image": "https://images.pexels.com/photos/7887636/pexels-photo-7887636.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  },
  {
    "id": 23,
    "name": "Fitness Smart Band",
    "category": "Electronics",
    "price": 59.99,
    "rating": 4,
    "reviews": 175,
    "image": "https://images.pexels.com/photos/12893643/pexels-photo-12893643.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  },
  {
    "id": 24,
    "name": "Wireless Router AX3000",
    "category": "Electronics",
    "price": 149.99,
    "rating": 5,
    "reviews": 81,
    "image": "https://images.pexels.com/photos/28348054/pexels-photo-28348054.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  },
  {
    "id": 25,
    "name": "USB Microphone",
    "category": "Electronics",
    "price": 99.99,
    "rating": 4,
    "reviews": 145,
    "image": "https://images.pexels.com/photos/12541646/pexels-photo-12541646.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  },
  {
    "id": 26,
    "name": "Action Camera",
    "category": "Electronics",
    "price": 219.99,
    "rating": 4,
    "reviews": 89,
    "image": "https://images.pexels.com/photos/4817132/pexels-photo-4817132.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  },
  {
    "id": 27,
    "name": "Tablet 10 Inch",
    "category": "Electronics",
    "price": 399.99,
    "rating": 5,
    "reviews": 132,
    "image": "https://images.pexels.com/photos/38555187/pexels-photo-38555187.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  },
  {
    "id": 28,
    "name": "Basketball",
    "category": "Sports",
    "price": 29.99,
    "rating": 5,
    "reviews": 190,
    "image": "https://images.pexels.com/photos/13179883/pexels-photo-13179883.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  },
  {
    "id": 29,
    "name": "Football",
    "category": "Sports",
    "price": 24.99,
    "rating": 4,
    "reviews": 140,
    "image": "https://images.pexels.com/photos/29920213/pexels-photo-29920213.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  },
  {
    "id": 30,
    "name": "Cricket Bat",
    "category": "Sports",
    "price": 89.99,
    "rating": 5,
    "reviews": 160,
    "image": "https://images.pexels.com/photos/35801177/pexels-photo-35801177.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  },
  {
    "id": 31,
    "name": "Dumbbell Set",
    "category": "Sports",
    "price": 119.99,
    "rating": 5,
    "reviews": 215,
    "image": "https://images.pexels.com/photos/29224210/pexels-photo-29224210.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  },
  {
    "id": 32,
    "name": "Skipping Rope",
    "category": "Sports",
    "price": 14.99,
    "rating": 4,
    "reviews": 289,
    "image": "https://images.pexels.com/photos/6339721/pexels-photo-6339721.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  },
  {
    "id": 33,
    "name": "Tennis Racket",
    "category": "Sports",
    "price": 99.99,
    "rating": 4,
    "reviews": 84,
    "image": "https://images.pexels.com/photos/27152933/pexels-photo-27152933.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  },
  {
    "id": 34,
    "name": "Gym Gloves",
    "category": "Sports",
    "price": 19.99,
    "rating": 4,
    "reviews": 177,
    "image": "https://images.pexels.com/photos/6998798/pexels-photo-6998798.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  },
  {
    "id": 35,
    "name": "Resistance Bands",
    "category": "Sports",
    "price": 25.99,
    "rating": 5,
    "reviews": 266,
    "image": "https://images.pexels.com/photos/6516206/pexels-photo-6516206.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  },
  {
    "id": 36,
    "name": "Exercise Bike",
    "category": "Sports",
    "price": 499.99,
    "rating": 5,
    "reviews": 69,
    "image": "https://images.pexels.com/photos/36080210/pexels-photo-36080210.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  },
  {
    "id": 37,
    "name": "Camping Tent",
    "category": "Sports",
    "price": 159.99,
    "rating": 4,
    "reviews": 102,
    "image": "https://images.pexels.com/photos/17192955/pexels-photo-17192955.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  },
  {
    "id": 38,
    "name": "Cotton T-Shirt",
    "category": "Clothing",
    "price": 19.99,
    "rating": 4,
    "reviews": 320,
    "image": "https://images.pexels.com/photos/18186105/pexels-photo-18186105.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  },
  {
    "id": 39,
    "name": "Hoodie Premium",
    "category": "Clothing",
    "price": 49.99,
    "rating": 5,
    "reviews": 201,
    "image": "https://images.pexels.com/photos/6995877/pexels-photo-6995877.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  },
  {
    "id": 40,
    "name": "Slim Fit Jeans",
    "category": "Clothing",
    "price": 59.99,
    "rating": 4,
    "reviews": 166,
    "image": "https://images.pexels.com/photos/8788774/pexels-photo-8788774.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  },
  {
    "id": 41,
    "name": "Casual Shirt",
    "category": "Clothing",
    "price": 34.99,
    "rating": 4,
    "reviews": 178,
    "image": "https://images.pexels.com/photos/19852754/pexels-photo-19852754.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  },
  {
    "id": 42,
    "name": "Winter Jacket",
    "category": "Clothing",
    "price": 119.99,
    "rating": 5,
    "reviews": 88,
    "image": "https://images.pexels.com/photos/31809948/pexels-photo-31809948.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  },
  {
    "id": 43,
    "name": "Formal Trousers",
    "category": "Clothing",
    "price": 44.99,
    "rating": 4,
    "reviews": 136,
    "image": "https://images.pexels.com/photos/9464625/pexels-photo-9464625.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  },
  {
    "id": 44,
    "name": "Sports Shorts",
    "category": "Clothing",
    "price": 24.99,
    "rating": 4,
    "reviews": 229,
    "image": "https://images.pexels.com/photos/33417688/pexels-photo-33417688.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  },
  {
    "id": 45,
    "name": "Polo T-Shirt",
    "category": "Clothing",
    "price": 29.99,
    "rating": 5,
    "reviews": 183,
    "image": "https://images.pexels.com/photos/17898556/pexels-photo-17898556.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  },
  {
    "id": 46,
    "name": "Beanie Cap",
    "category": "Clothing",
    "price": 14.99,
    "rating": 4,
    "reviews": 91,
    "image": "https://images.pexels.com/photos/7957218/pexels-photo-7957218.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  },
  {
    "id": 47,
    "name": "Rain Coat",
    "category": "Clothing",
    "price": 54.99,
    "rating": 4,
    "reviews": 77,
    "image": "https://images.pexels.com/photos/14753849/pexels-photo-14753849.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  },
  {
    "id": 48,
    "name": "Leather Belt",
    "category": "Accessories",
    "price": 29.99,
    "rating": 4,
    "reviews": 184,
    "image": "https://images.pexels.com/photos/31959214/pexels-photo-31959214.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  },
  {
    "id": 49,
    "name": "Travel Backpack",
    "category": "Accessories",
    "price": 69.99,
    "rating": 5,
    "reviews": 241,
    "image": "https://images.pexels.com/photos/4901995/pexels-photo-4901995.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  },
  {
    "id": 50,
    "name": "Laptop Bag",
    "category": "Accessories",
    "price": 49.99,
    "rating": 4,
    "reviews": 157,
    "image": "https://images.pexels.com/photos/20318749/pexels-photo-20318749.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  },
  {
    "id": 51,
    "name": "Silver Wrist Watch",
    "category": "Accessories",
    "price": 149.99,
    "rating": 5,
    "reviews": 126,
    "image": "https://images.pexels.com/photos/35164843/pexels-photo-35164843.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  },
  {
    "id": 52,
    "name": "Travel Suitcase",
    "category": "Accessories",
    "price": 99.99,
    "rating": 4,
    "reviews": 113,
    "image": "https://images.pexels.com/photos/14545897/pexels-photo-14545897.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  },
  {
    "id": 53,
    "name": "Phone Case",
    "category": "Accessories",
    "price": 15.99,
    "rating": 4,
    "reviews": 290,
    "image": "https://images.pexels.com/photos/13706809/pexels-photo-13706809.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  },
  {
    "id": 54,
    "name": "Desk Lamp",
    "category": "Home",
    "price": 39.99,
    "rating": 5,
    "reviews": 144,
    "image": "https://images.pexels.com/photos/8369211/pexels-photo-8369211.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  },
  {
    "id": 55,
    "name": "Coffee Maker",
    "category": "Home",
    "price": 89.99,
    "rating": 5,
    "reviews": 118,
    "image": "https://images.pexels.com/photos/3936163/pexels-photo-3936163.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  },
  {
    "id": 56,
    "name": "Vacuum Cleaner",
    "category": "Home",
    "price": 199.99,
    "rating": 4,
    "reviews": 137,
    "image": "https://images.pexels.com/photos/9462148/pexels-photo-9462148.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  },
  {
    "id": 57,
    "name": "Air Purifier",
    "category": "Home",
    "price": 179.99,
    "rating": 5,
    "reviews": 82,
    "image": "https://images.pexels.com/photos/2123430/pexels-photo-2123430.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  },
  {
    "id": 58,
    "name": "Electric Kettle",
    "category": "Home",
    "price": 34.99,
    "rating": 4,
    "reviews": 201,
    "image": "https://images.pexels.com/photos/8879615/pexels-photo-8879615.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  },
  {
    "id": 59,
    "name": "Dining Chair",
    "category": "Furniture",
    "price": 89.99,
    "rating": 4,
    "reviews": 97,
    "image": "https://images.pexels.com/photos/18829799/pexels-photo-18829799.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  },
  {
    "id": 60,
    "name": "Wooden Study Table",
    "category": "Furniture",
    "price": 249.99,
    "rating": 5,
    "reviews": 75,
    "image": "https://images.pexels.com/photos/6265942/pexels-photo-6265942.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  },
  {
    "id": 61,
    "name": "Office Chair",
    "category": "Furniture",
    "price": 179.99,
    "rating": 5,
    "reviews": 124,
    "image": "https://images.pexels.com/photos/295480/pexels-photo-295480.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  },
  {
    "id": 62,
    "name": "Bookshelf",
    "category": "Furniture",
    "price": 139.99,
    "rating": 4,
    "reviews": 91,
    "image": "https://images.pexels.com/photos/8045884/pexels-photo-8045884.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  },
  {
    "id": 63,
    "name": "TV Stand",
    "category": "Furniture",
    "price": 159.99,
    "rating": 4,
    "reviews": 73,
    "image": "https://images.pexels.com/photos/5755711/pexels-photo-5755711.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  },
  {
    "id": 64,
    "name": "Bedside Table",
    "category": "Furniture",
    "price": 69.99,
    "rating": 4,
    "reviews": 88,
    "image": "https://images.pexels.com/photos/4819822/pexels-photo-4819822.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  },
  {
    "id": 65,
    "name": "Sofa 3 Seater",
    "category": "Furniture",
    "price": 699.99,
    "rating": 5,
    "reviews": 54,
    "image": "https://images.pexels.com/photos/11112731/pexels-photo-11112731.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  },
  {
    "id": 66,
    "name": "Wardrobe Cabinet",
    "category": "Furniture",
    "price": 499.99,
    "rating": 5,
    "reviews": 61,
    "image": "https://images.pexels.com/photos/9646754/pexels-photo-9646754.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  },
  {
    "id": 67,
    "name": "Computer Desk",
    "category": "Furniture",
    "price": 189.99,
    "rating": 4,
    "reviews": 95,
    "image": "https://images.pexels.com/photos/9300770/pexels-photo-9300770.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  }
];

const CATEGORIES = ['All', 'Electronics', 'Sports', 'Clothing', 'Accessories', "Furniture", "Home"]
const SORT_OPTIONS = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Top Rated', 'Lowest Rated']

// ─── Dropdown ─────────────────────────────────────────────────────────────────
const Dropdown = ({ value, options, onChange }) => {
    const [open, setOpen] = useState(false)

    return (
        <div className="relative">
            <button
                onClick={() => setOpen((o) => !o)}
                className="flex items-center gap-2 bg-[#1a1a1a] border border-[#2a2a2a] text-white text-sm font-dmsans px-4 py-2.5 rounded-xl hover:border-[#c8f537]/40 transition-colors min-w-[160px] justify-between"
            >
                <span>{value}</span>
                <ChevronDown className={`w-4 h-4 text-[#666] transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && (
                <div className="absolute top-full mt-1.5 left-0 w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl overflow-hidden z-30 shadow-xl shadow-black/50">
                    {options.map((opt) => (
                        <button
                            key={opt}
                            onClick={() => { onChange(opt); setOpen(false) }}
                            className={`w-full text-left px-4 py-2.5 text-sm font-dmsans transition-colors ${opt === value
                                    ? 'text-[#c8f537] bg-[#c8f537]/10'
                                    : 'text-[#aaa] hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

// ─── Main Shop Page ───────────────────────────────────────────────────────────
const Shop = () => {
     const location = useLocation();
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState(location?.state?.category || 'All')
    const [sort, setSort] = useState(location?.state?.sort||'Featured')
    const [activeTags, setActiveTags] = useState([])

    const {cart,setcart,SaveCartToLS}=useContext(CartContext)


    const removeTag = (tag) => {

        setActiveTags((prev) => {
            return prev.filter((t) => t !== tag)
        })
    }

    const handleCategoryChange = (cat) => {
        setCategory(cat)
        if (cat !== 'All') {
            const tag = cat.toLowerCase()
            setActiveTags((prev) => (prev.includes(tag) ? prev : [tag]))
        } else {
            setActiveTags([])
        }
    }

    const clearAll = () => {
        setSearch('')
        setCategory('All')
        setActiveTags([])
        setSort('Featured')
    }

    const filtered = useMemo(() => {
        let list = [...PRODUCTS]

        if (category !== 'All') {
            list = list.filter((product) => product.category === category)
        }

        if (search.trim()) {
            const query = search.toLowerCase()
            list = list.filter((p) => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query))
        }


        if (sort === 'Price: Low to High') list.sort((a, b) => a.price - b.price)
        else if (sort === 'Price: High to Low') list.sort((a, b) => b.price - a.price)
        else if (sort === 'Top Rated') list.sort((a, b) => b.rating - a.rating)
        else if (sort === 'Lowest Rated') list.sort((a, b) => a.rating - b.rating)

        return list
    }, [category, search, sort])

    const categoryLabel = category !== 'All' ? `in ${category}` : ''

    return (
        <div className="min-h-screen bg-[#111111] flex flex-col">
            <NavBar />

            <div className="flex-1 max-w-[1200px] mx-auto w-full px-6 py-10">
                {/* Heading */}
                <div className="mb-8">
                    <h1 className="font-syne text-white text-4xl font-bold">All Products</h1>
                    <p className="font-dmsans text-sm mt-1.5">
                        <span className="text-[#666]">{filtered.length} products found</span>
                        {categoryLabel && (
                            <span className="text-[#c8f537]"> {categoryLabel}</span>
                        )}
                    </p>
                </div>

                {/* Filter bar */}
                <div className="bg-[#161616] border border-[#2a2a2a] rounded-2xl p-4 mb-6 flex flex-col gap-3">
                    <div className="flex items-center gap-3 flex-wrap">
                        {/* Search */}
                        <div className="flex-1 min-w-[200px] relative">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#444]" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-transparent border border-[#2a2a2a] text-white text-sm font-dmsans placeholder:text-[#444] pl-10 pr-4 py-2.5 rounded-xl outline-none focus:border-[#c8f537]/50 transition-colors"
                            />
                        </div>

                        {/* Category dropdown */}
                        <Dropdown
                            value={category}
                            options={CATEGORIES}
                            onChange={handleCategoryChange}
                        />

                        {/* Sort dropdown */}
                        <Dropdown
                            value={sort}
                            options={SORT_OPTIONS}
                            onChange={setSort}
                        />

                        {/* Clear */}
                        <button
                            onClick={clearAll}
                            className="flex items-center gap-1.5 bg-[#2a1a1a] border border-red-900/50 text-red-400 text-sm font-dmsans px-4 py-2.5 rounded-xl hover:bg-red-900/20 transition-colors"
                        >
                            <X className="w-4 h-4" />
                            Clear
                        </button>
                    </div>

                    {/* Active tags */}
                    {activeTags.length > 0 && (
                        <div className="flex items-center gap-2 flex-wrap">
                            {activeTags.map((tag) => (
                                <span
                                    key={tag}
                                    className="flex items-center gap-1.5 bg-[#c8f537]/10 border border-[#c8f537]/30 text-[#c8f537] text-xs font-dmsans px-3 py-1 rounded-full"
                                >
                                    {tag}
                                    <button onClick={() => removeTag(tag)} className="hover:text-white transition-colors">
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Grid */}
                {filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                        <div className="w-16 h-16 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center">
                            <Search className="w-6 h-6 text-[#444]" />
                        </div>
                        <p className="font-dmsans text-[#555] text-sm">No products found. Try adjusting your filters.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {filtered.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer className="border-t border-[#1e1e1e] py-6 text-center">
                <p className="font-syne text-[#c8f537] text-base font-semibold tracking-tight">SkyMart</p>
                <p className="font-dmsans text-[#444] text-xs mt-1">
                    © 2025 SkyMart • Built with React + Redux + TanStack Query
                </p>
            </footer>
        </div>
    )
}

export default Shop