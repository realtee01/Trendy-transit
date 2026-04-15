import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ShoppingBag, Search, ArrowRight, Star, ChevronRight, Heart, Diamond, Check, User, LogOut } from 'lucide-react';
import { auth, signInWithGoogle, logOut, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// --- CURATED PRODUCT DATA ---
const PRODUCT_DATA: Record<string, any[]> = {
  'Men': [
    { id: 101, title: "Classic Tailored Suit Jacket", price: 299.99, category: "Men", subCategory: "Formal", image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=800&auto=format&fit=crop", rating: 4.8, reviews: [{ user: "James W.", rating: 5, comment: "Perfect fit and high quality material." }, { user: "Robert L.", rating: 4, comment: "Very elegant, though sleeves were slightly long." }] },
    { id: 102, title: "Urban Streetwear Hoodie", price: 89.50, category: "Men", subCategory: "Casual", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop", rating: 4.5, reviews: [{ user: "Alex M.", rating: 5, comment: "Super comfy!" }] },
    { id: 103, title: "Premium Denim Jacket", price: 145.00, category: "Men", subCategory: "Outerwear", image: "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?q=80&w=800&auto=format&fit=crop", rating: 4.7, reviews: [] },
    { id: 104, title: "Minimalist Cotton T-Shirt", price: 35.00, category: "Men", subCategory: "Basics", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop", rating: 4.9, reviews: [] },
    { id: 105, title: "Leather Biker Jacket", price: 250.00, category: "Men", subCategory: "Outerwear", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoyYm7KSb94dfCPTSS33cyS8yGjqdmWHa7Pg&s", rating: 4.6, reviews: [] },
    { id: 106, title: "Casual Chino Pants", price: 65.00, category: "Men", subCategory: "Bottoms", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop", rating: 4.4, reviews: [] },
    { id: 107, title: "Classic Oxford Shirt", price: 55.00, category: "Men", subCategory: "Formal", image: "https://www.everlane.com/cdn/shop/files/a430bf99_57e0.jpg?v=1753411504", rating: 4.7, reviews: [] },
    { id: 108, title: "High-Top Sneakers", price: 120.00, category: "Men", subCategory: "Footwear", image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=800&auto=format&fit=crop", rating: 4.8, reviews: [] },
    { id: 109, title: "Slim Fit Cargo Pants", price: 75.00, category: "Men", subCategory: "Bottoms", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbdsvmlzyiFM0mZ_hJn4GmOT9Okbj_b_G9uQ&s", rating: 4.5, reviews: [] },
    { id: 110, title: "Wool Blend Overcoat", price: 320.00, category: "Men", subCategory: "Outerwear", image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=800&auto=format&fit=crop", rating: 4.9, reviews: [] },
    { id: 111, title: "Linen Summer Shirt", price: 65.00, category: "Men", subCategory: "Casual", image: "https://lucafaloni.com/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F238293%2F1360x607%2F27f88eadff%2Fcapri-blue-portofino-linen-shirt-lf-journal.jpg%2Fm%2F1200x1600&w=3840&q=90", rating: 4.6, reviews: [] },
    { id: 112, title: "Performance Running Shorts", price: 45.00, category: "Men", subCategory: "Basics", image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800&auto=format&fit=crop", rating: 4.7, reviews: [] },
  ],
  'Women': [
    { id: 201, title: "Elegant Silk Evening Dress", price: 350.00, category: "Women", subCategory: "Formal", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop", rating: 4.9, reviews: [{ user: "Sarah K.", rating: 5, comment: "Stunning dress, felt like a queen." }] },
    { id: 202, title: "Chic Summer Blouse", price: 75.00, category: "Women", subCategory: "Casual", image: "https://media.voguearabia.com/photos/68089b9ea55f78d42012d593/2:3/w_1600,c_limit/camicie%20estive%20Launchmetrics.com%20Spotlight%20Milano%20str%20S25%200424.jpg", rating: 4.6, reviews: [] },
    { id: 203, title: "High-Waisted Wide Leg Pants", price: 110.00, category: "Women", subCategory: "Bottoms", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop", rating: 4.7, reviews: [] },
    { id: 204, title: "Designer Leather Handbag", price: 450.00, category: "Women", subCategory: "Accessories", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw5K3-uu2pFovIypTk82svftZEVvnqjXDisVc3qMkzGCVXyvsI7E9aqvA&s", rating: 4.8, reviews: [] },
    { id: 205, title: "Floral Midi Skirt", price: 85.00, category: "Women", subCategory: "Bottoms", image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=800&auto=format&fit=crop", rating: 4.5, reviews: [] },
    { id: 206, title: "Cashmere Turtleneck Sweater", price: 195.00, category: "Women", subCategory: "Knitwear", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPjtG2HE97YcWgs_PIRzHdJmGHZzvMrLvILitD3HgPV3P5W914QyJwYfs&s", rating: 4.8, reviews: [] },
    { id: 207, title: "Classic Trench Coat", price: 210.00, category: "Women", subCategory: "Outerwear", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop", rating: 4.7, reviews: [] },
    { id: 208, title: "Strappy High Heels", price: 140.00, category: "Women", subCategory: "Footwear", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop", rating: 4.6, reviews: [] },
    { id: 209, title: "Bohemian Maxi Dress", price: 125.00, category: "Women", subCategory: "Casual", image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop", rating: 4.7, reviews: [] },
    { id: 210, title: "Satin Slip Skirt", price: 95.00, category: "Women", subCategory: "Bottoms", image: "https://images.unsplash.com/photo-1577900232427-18219b9166a0?q=80&w=800&auto=format&fit=crop", rating: 4.8, reviews: [] },
    { id: 211, title: "Velvet Party Blazer", price: 180.00, category: "Women", subCategory: "Formal", image: "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?q=80&w=800&auto=format&fit=crop", rating: 4.9, reviews: [] },
    { id: 212, title: "Gold Hoop Earrings", price: 45.00, category: "Women", subCategory: "Accessories", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ52fV9wiThh3mcWe9DYJ2JuXfUmh763gnr4PB5HRD-c7vdxy--XF9Egl8&s", rating: 4.7, reviews: [] },
  ],
  'Kids': [
    { id: 301, title: "Playful Striped Sweater", price: 45.00, category: "Kids", subCategory: "Knitwear", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz9xIDtbCriwfiV8T4jYJKHcnbuUAvFi-tMduRpg7HZ0lcDL5HYW-72Js&s", rating: 4.7, reviews: [] },
    { id: 302, title: "Comfortable Denim Overalls", price: 55.00, category: "Kids", subCategory: "Casual", image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=800&auto=format&fit=crop", rating: 4.8, reviews: [] },
    { id: 303, title: "Bright Summer Dress", price: 38.00, category: "Kids", subCategory: "Dresses", image: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?q=80&w=800&auto=format&fit=crop", rating: 4.6, reviews: [] },
    { id: 304, title: "Cozy Winter Puffer Jacket", price: 85.00, category: "Kids", subCategory: "Outerwear", image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=800&auto=format&fit=crop", rating: 4.9, reviews: [] },
    { id: 305, title: "Kids' Light-Up Sneakers", price: 60.00, category: "Kids", subCategory: "Footwear", image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=800&auto=format&fit=crop", rating: 4.7, reviews: [] },
    { id: 306, title: "Graphic Print T-Shirt", price: 25.00, category: "Kids", subCategory: "Basics", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_ECQEk7KuudZElIvwpVwOOwDliTQBev6LUA&s", rating: 4.5, reviews: [] },
    { id: 307, title: "Colorful Rain Boots", price: 40.00, category: "Kids", subCategory: "Footwear", image: "https://cdn.accentuate.io/276663238715/-1747043043438/Rain-Boots-(1)-v1753395407727.jpg?960x650", rating: 4.6, reviews: [] },
    { id: 308, title: "Warm Beanie and Scarf Set", price: 30.00, category: "Kids", subCategory: "Accessories", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQZXtUdcGwyBhm0JaTPeKnFRdK-Sc-bzZDtw&s", rating: 4.8, reviews: [] },
    { id: 309, title: "Kids' Canvas Backpack", price: 45.00, category: "Kids", subCategory: "Accessories", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRREpi9ZMwgdcHRzS-YV_--kezWHV4RAXaEDg&s", rating: 4.7, reviews: [] },
    { id: 310, title: "Toddler Soft Sole Shoes", price: 35.00, category: "Kids", subCategory: "Footwear", image: "https://sunandlace.com/cdn/shop/files/birth-flower-header.jpg?v=1776204202&width=1920", rating: 4.9, reviews: [] },
    { id: 311, title: "Kids' Pajama Set", price: 32.00, category: "Kids", subCategory: "Basics", image: "https://assets.theplace.com/image/upload/t_plp_img_m,f_auto,q_auto/v1/ecom/assets/products/gym/3054516/3054516_1301.jpg", rating: 4.8, reviews: [] },
    { id: 312, title: "Dinosaur Print Hoodie", price: 42.00, category: "Kids", subCategory: "Casual", image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=800&auto=format&fit=crop", rating: 4.7, reviews: [] },
  ],
  'Collections': [
    { id: 401, title: "Limited Edition Chronograph", price: 899.00, category: "Collections", subCategory: "Luxury Watches", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=800&auto=format&fit=crop", rating: 5.0, reviews: [] },
    { id: 402, title: "Signature Leather Boots", price: 280.00, category: "Collections", subCategory: "Footwear", image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=800&auto=format&fit=crop", rating: 4.8, reviews: [] },
    { id: 403, title: "Oversized Designer Sunglasses", price: 210.00, category: "Collections", subCategory: "Accessories", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop", rating: 4.7, reviews: [] },
    { id: 404, title: "Premium Travel Duffle", price: 320.00, category: "Collections", subCategory: "Luggage", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop", rating: 4.9, reviews: [] },
    { id: 405, title: "Minimalist Leather Wallet", price: 85.00, category: "Collections", subCategory: "Accessories", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop", rating: 4.6, reviews: [] },
    { id: 406, title: "Rose Gold Pendant Necklace", price: 150.00, category: "Collections", subCategory: "Jewelry", image: "https://i.pinimg.com/236x/66/4b/0f/664b0f285acd2fdcc554a66af01a6de7.jpg", rating: 4.8, reviews: [] },
    { id: 407, title: "Smart Fitness Watch", price: 299.00, category: "Collections", subCategory: "Electronics", image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=800&auto=format&fit=crop", rating: 4.7, reviews: [] },
    { id: 408, title: "Canvas Weekend Tote", price: 120.00, category: "Collections", subCategory: "Bags", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop", rating: 4.5, reviews: [] },
  ]
};

const Logo = () => (
  <div className="flex items-center gap-1.5 sm:gap-2 cursor-pointer">
    <Diamond className="text-orange-500 w-5 h-5 sm:w-7 sm:h-7" strokeWidth={2} />
    <span className="font-serif font-bold text-lg sm:text-2xl tracking-wide uppercase">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-600 to-red-600">TRENDY</span>
      <span className="text-black">TRANSIT</span>
    </span>
  </div>
);

const Navbar = ({ activeCategory, setActiveCategory, cartCount, wishlistCount, onSearchClick, onCartClick, onWishlistClick, user, onLogin, onLogout }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const categories = ['Men', 'Women', 'Kids', 'Collections'];

  return (
    <>
      <div className="bg-black text-white text-xs py-2 px-6 hidden md:flex justify-between items-center z-50 relative">
        <div className="flex gap-6">
          <a href="#" className="hover:text-gray-300 transition-colors uppercase tracking-wider">Customer Service</a>
          <a href="#" className="hover:text-gray-300 transition-colors uppercase tracking-wider">Store Locator</a>
        </div>
        <div className="flex gap-6 items-center">
          <a href="#" className="hover:text-gray-300 transition-colors uppercase tracking-wider">News Letter</a>
          <div className="w-px h-3 bg-gray-600 mx-2" />
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-300">Hi, {user.displayName?.split(' ')[0]}</span>
              <button onClick={onLogout} className="hover:text-gray-300 transition-colors uppercase tracking-wider flex items-center gap-1">
                <LogOut size={12} /> Log Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <button onClick={onLogin} className="hover:text-gray-300 transition-colors uppercase tracking-wider">Log In</button>
              <button onClick={onLogin} className="hover:text-gray-300 transition-colors uppercase tracking-wider">Sign Up</button>
            </div>
          )}
        </div>
      </div>
      
      <nav className="sticky top-0 left-0 w-full z-40 backdrop-blur-lg bg-white/90 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
          <Logo />

          <div className="hidden md:flex items-center gap-8">
            {categories.map((item) => (
              <a 
                key={item} 
                href="#featured-products"
                onClick={() => setActiveCategory(item)}
                className={`text-sm font-medium transition-colors uppercase tracking-wide ${
                  activeCategory === item ? 'text-orange-600 border-b-2 border-orange-600 pb-1' : 'text-gray-600 hover:text-black'
                }`}
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <button onClick={onSearchClick} className="text-black hover:text-gray-600 transition-colors hidden sm:block">
              <Search size={20} strokeWidth={1.5} />
            </button>
            <button onClick={onWishlistClick} className="text-black hover:text-gray-600 transition-colors relative">
              <Heart size={20} strokeWidth={1.5} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[8px] sm:text-[9px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button onClick={onCartClick} className="text-black hover:text-gray-600 transition-colors relative">
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[8px] sm:text-[9px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => setIsOpen(true)}
              className="text-black hover:text-gray-600 transition-colors"
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 w-full max-w-md h-full bg-white border-l border-gray-200 p-8 flex flex-col shadow-2xl"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="font-serif font-bold text-2xl text-black uppercase tracking-wide">Menu</span>
                <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-black bg-gray-100 p-2 rounded-full transition-colors">
                  <X size={24} strokeWidth={1.5} />
                </button>
              </div>

              <div className="flex flex-col gap-6 flex-1 overflow-y-auto">
                {categories.map((item, i) => (
                  <motion.a 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.1 }}
                    key={item} 
                    href="#featured-products"
                    onClick={() => {
                      setActiveCategory(item);
                      setIsOpen(false);
                    }}
                    className={`text-3xl font-serif font-medium flex items-center justify-between group text-left ${
                      activeCategory === item ? 'text-orange-600' : 'text-gray-400 hover:text-black'
                    }`}
                  >
                    {item}
                    <ChevronRight className={`transition-opacity ${activeCategory === item ? 'opacity-100 text-orange-600' : 'opacity-0 group-hover:opacity-100 text-black'}`} />
                  </motion.a>
                ))}
                
                <div className="h-px bg-gray-200 my-4" />
                
                {['Customer Service', 'Store Locator', 'News Letter'].map((item, i) => (
                  <motion.a 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (i + 5) * 0.1 + 0.1 }}
                    key={item} 
                    href="#" 
                    className="text-lg font-sans font-medium text-gray-500 hover:text-black transition-colors"
                  >
                    {item}
                  </motion.a>
                ))}
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col gap-3 mt-auto pt-8 border-t border-gray-200"
              >
                {user ? (
                  <>
                    <div className="flex items-center gap-3 mb-4 p-4 bg-gray-50 rounded-xl">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt="Profile" className="w-10 h-10 rounded-full" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                          <User size={20} />
                        </div>
                      )}
                      <div>
                        <div className="font-bold text-sm">{user.displayName}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </div>
                    </div>
                    <button onClick={() => { onLogout(); setIsOpen(false); }} className="w-full py-4 rounded-xl bg-gray-100 text-black font-bold hover:bg-gray-200 transition-colors uppercase tracking-widest text-sm flex items-center justify-center gap-2">
                      <LogOut size={16} /> Log Out
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => { onLogin(); setIsOpen(false); }} className="w-full py-4 rounded-xl bg-gray-100 text-black font-bold hover:bg-gray-200 transition-colors uppercase tracking-widest text-sm">
                      Log In
                    </button>
                    <button onClick={() => { onLogin(); setIsOpen(false); }} className="w-full py-4 rounded-xl bg-black text-white font-bold hover:bg-gray-900 transition-colors uppercase tracking-widest text-sm">
                      Sign Up
                    </button>
                  </>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const SearchOverlay = ({ isOpen, onClose, onProductClick }: any) => {
  const [query, setQuery] = useState('');
  const allProducts = Object.values(PRODUCT_DATA).flat();
  const results = query ? allProducts.filter(p => p.title.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase())) : [];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[80] bg-white/95 backdrop-blur-md flex flex-col"
      >
        <div className="max-w-7xl mx-auto w-full px-6 py-8 flex justify-between items-center border-b border-gray-200">
          <div className="flex items-center gap-4 flex-1">
            <Search size={28} className="text-gray-400" />
            <input 
              autoFocus
              type="text" 
              placeholder="Search for products, categories..." 
              className="w-full text-2xl md:text-4xl font-serif bg-transparent border-none outline-none text-black placeholder-gray-300"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button onClick={onClose} className="p-2 text-gray-500 hover:text-black transition-colors">
            <X size={32} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-12">
          <div className="max-w-7xl mx-auto px-6">
            {query && results.length === 0 && (
              <div className="text-center text-gray-500 text-xl mt-12">No results found for "{query}"</div>
            )}
            {results.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {results.map(product => (
                  <div 
                    key={product.id} 
                    onClick={() => { onProductClick(product); onClose(); }}
                    className="group cursor-pointer"
                  >
                    <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-gray-100">
                      <img src={product.image} alt={product.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <h3 className="font-bold text-black group-hover:text-orange-600 transition-colors line-clamp-1">{product.title}</h3>
                    <p className="text-gray-500">${product.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            )}
            {!query && (
              <div className="mt-8">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Popular Searches</h3>
                <div className="flex flex-wrap gap-4">
                  {['Jacket', 'Dress', 'Boots', 'Watch', 'Denim'].map(term => (
                    <button key={term} onClick={() => setQuery(term)} className="px-6 py-3 rounded-full border border-gray-200 text-black hover:border-black transition-colors">
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const ProductModal = ({ product, onClose, onAddToCart, onAddToWishlist, wishlist }: any) => {
  const [selectedSize, setSelectedSize] = useState('M');
  const [activeTab, setActiveTab] = useState('details');
  
  if (!product) return null;
  const isInWishlist = wishlist.some((p: any) => p.id === product.id);

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6"
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative bg-white w-full max-w-5xl rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl max-h-[90vh] overflow-y-auto"
        >
          <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full hover:bg-gray-100 transition-colors">
            <X size={24} />
          </button>
          
          <div className="md:w-1/2 bg-gray-100 relative">
            <img src={product.image} alt={product.title} loading="lazy" className="w-full h-full object-cover aspect-square md:aspect-auto" />
          </div>
          
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col">
            <div className="text-sm text-orange-600 font-medium uppercase tracking-widest mb-2">{product.subCategory}</div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-black mb-2">{product.title}</h2>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-orange-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                ))}
              </div>
              <span className="text-sm font-bold text-black">{product.rating}</span>
              <span className="text-sm text-gray-400">({product.reviews?.length || 0} reviews)</span>
            </div>
            <div className="text-2xl font-sans font-semibold text-black mb-6">${product.price.toFixed(2)}</div>
            
            <div className="flex gap-8 border-b border-gray-100 mb-6">
              {['details', 'reviews'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 text-sm font-bold uppercase tracking-wider transition-colors relative ${activeTab === tab ? 'text-black' : 'text-gray-400 hover:text-black'}`}
                >
                  {tab}
                  {activeTab === tab && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-600" />}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto mb-8">
              {activeTab === 'details' ? (
                <p className="text-gray-600 leading-relaxed">
                  Experience unparalleled comfort and style with this premium piece. Meticulously crafted from high-quality materials, it's designed to elevate your everyday wardrobe while providing lasting durability.
                </p>
              ) : (
                <div className="space-y-6">
                  {(product.reviews || []).length > 0 ? (product.reviews || []).map((rev: any, i: number) => (
                    <div key={i} className="border-b border-gray-50 pb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-sm">{rev.user}</span>
                        <div className="flex text-orange-500">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <Star key={j} size={12} fill={j < rev.rating ? "currentColor" : "none"} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 italic">"{rev.comment}"</p>
                    </div>
                  )) : (
                    <p className="text-gray-400 text-sm italic">No reviews yet. Be the first to review!</p>
                  )}
                </div>
              )}
            </div>
            
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold text-black">Select Size</span>
                <a href="#" className="text-sm text-gray-500 underline hover:text-black">Size Guide</a>
              </div>
              <div className="flex gap-3">
                {['S', 'M', 'L', 'XL'].map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-xl border flex items-center justify-center font-medium transition-all ${selectedSize === size ? 'border-black bg-black text-white' : 'border-gray-200 text-gray-600 hover:border-black'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mt-auto flex gap-4">
              <button 
                onClick={() => { onAddToCart(product, selectedSize); onClose(); }}
                className="flex-1 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag size={20} /> Add to Bag
              </button>
              <button 
                onClick={() => onAddToWishlist(product)}
                className={`p-4 rounded-xl border transition-all flex items-center justify-center ${isInWishlist ? 'border-red-500 bg-red-50 text-red-500' : 'border-gray-200 text-gray-600 hover:border-black'}`}
              >
                <Heart size={24} className={isInWishlist ? "fill-red-500" : ""} />
              </button>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-100 grid grid-cols-2 gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2"><Check size={16} className="text-green-500"/> In Stock</div>
              <div className="flex items-center gap-2"><Check size={16} className="text-green-500"/> Free Shipping</div>
              <div className="flex items-center gap-2"><Check size={16} className="text-green-500"/> 30-Day Returns</div>
              <div className="flex items-center gap-2"><Check size={16} className="text-green-500"/> Secure Checkout</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-[calc(100vh-112px)] flex items-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://plus.unsplash.com/premium_photo-1683141052679-942eb9e77760?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-white/85 backdrop-blur-[2px] z-0" />
      
      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center relative z-10 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-start"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-xs font-medium uppercase tracking-wider text-gray-800">New Collection 2026</span>
          </div>
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-serif font-bold leading-[0.9] tracking-tight mb-6 text-black">
            DEFINE<br />
            <span className="italic font-light text-gray-500">YOUR</span><br />
            REALITY.
          </h1>
          <p className="text-lg text-gray-700 max-w-md mb-8 leading-relaxed font-medium">
            Experience the next generation of premium streetwear. Crafted for the bold, designed for the future.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#featured-products" className="px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold hover:scale-105 transition-transform flex items-center gap-2 shadow-lg shadow-orange-500/20">
              Shop Now <ArrowRight size={18} />
            </a>
            <a href="#lookbook" className="px-8 py-4 rounded-full border-2 border-black text-black font-semibold hover:bg-black hover:text-white transition-colors bg-white/50 backdrop-blur-sm">
              View Lookbook
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative h-[500px] lg:h-[600px] flex items-center justify-center perspective-1000 mt-12 lg:mt-0"
        >
          <motion.div
            animate={{ 
              y: [-20, 20, -20],
              rotateZ: [-2, 2, -2],
              rotateY: [-10, 10, -10]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="relative w-full max-w-md aspect-square"
          >
            <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-3xl" />
            <img 
              src="https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Premium Sneaker" 
              loading="lazy"
              className="w-full h-full object-cover rounded-3xl shadow-2xl border border-white/50"
              style={{ transform: 'translateZ(50px)' }}
            />
            
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -right-4 lg:-right-8 top-1/4 bg-white/90 backdrop-blur-md border border-gray-200 p-4 rounded-2xl shadow-xl"
            >
              <div className="flex items-center gap-2 mb-1">
                <Star className="text-orange-500 fill-orange-500" size={16} />
                <span className="font-bold text-black">4.9</span>
              </div>
              <span className="text-xs text-gray-500">Premium Quality</span>
            </motion.div>

            <motion.div 
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -left-4 lg:-left-8 bottom-1/4 bg-white/90 backdrop-blur-md border border-gray-200 px-6 py-3 rounded-2xl shadow-xl"
            >
              <span className="font-serif font-bold text-xl text-black">$299</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const FeaturedProducts = ({ activeCategory, onProductClick, onAddToCart, onAddToWishlist, wishlist }: any) => {
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');
  const [filterSub, setFilterSub] = useState('All');
  
  const rawProducts = PRODUCT_DATA[activeCategory] || [];
  
  // Get unique subcategories for filtering
  const subCategories = ['All', ...new Set(rawProducts.map(p => p.subCategory))];

  // Apply filtering and sorting
  const products = rawProducts
    .filter(p => filterSub === 'All' || p.subCategory === filterSub)
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // newest/default
    });

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [activeCategory, sortBy, filterSub]);

  return (
    <section id="featured-products" className="py-24 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <motion.h2 
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-serif font-bold mb-4 text-black"
            >
              {activeCategory}
            </motion.h2>
            <p className="text-gray-600 font-medium">Curated selections for the modern pioneer.</p>
          </div>
          
          <div className="flex flex-wrap gap-4 items-center w-full md:w-auto">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Filter By</span>
              <select 
                value={filterSub}
                onChange={(e) => setFilterSub(e.target.value)}
                className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm font-medium outline-none focus:border-black transition-colors"
              >
                {subCategories.map(sub => <option key={sub} value={sub}>{sub}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sort By</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm font-medium outline-none focus:border-black transition-colors"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 min-h-[400px]">
          {loading 
            ? Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="group relative animate-pulse">
                  <div className="relative aspect-[3/4] rounded-2xl bg-gray-200 mb-5" />
                  <div className="h-4 w-3/4 bg-gray-200 rounded mb-2" />
                  <div className="h-3 w-1/3 bg-gray-200 rounded" />
                </div>
              ))
            : products.length > 0 ? products.map((product, idx) => {
              const isInWishlist = wishlist.some((p: any) => p.id === product.id);
              return (
                <motion.div
                  key={`${activeCategory}-${product.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group relative cursor-pointer"
                  onClick={() => onProductClick(product)}
                >
                  {/* Enhanced Hover Effect Container */}
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-5 bg-gray-100 border border-gray-200 shadow-sm group-hover:shadow-2xl transition-all duration-500">
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 z-10" />
                    
                    <button 
                      onClick={(e) => { e.stopPropagation(); onAddToWishlist(product); }}
                      className="absolute top-4 right-4 z-20 p-2.5 bg-white/90 backdrop-blur-md rounded-full text-gray-400 hover:text-red-500 hover:bg-white transition-all opacity-0 group-hover:opacity-100 shadow-sm"
                    >
                      <Heart size={18} strokeWidth={1.5} className={isInWishlist ? "fill-red-500 text-red-500" : ""} />
                    </button>

                    <img 
                      src={product.image} 
                      alt={product.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 w-full p-4 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <button 
                        onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                        className="w-full py-3 bg-white/95 backdrop-blur-md text-black font-semibold rounded-xl hover:bg-black hover:text-white transition-colors shadow-lg border border-gray-200"
                      >
                        Add to Bag
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col px-2 pt-2 overflow-hidden">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[10px] text-gray-500 font-medium uppercase tracking-widest">
                        {product.subCategory}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star size={10} className="text-orange-500 fill-orange-500" />
                        <span className="text-[10px] font-bold">{product.rating}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="text-base font-serif font-bold text-black leading-snug line-clamp-2 group-hover:text-orange-600 transition-colors duration-300">
                        {product.title}
                      </h3>
                      <span className="text-sm font-sans font-semibold text-black whitespace-nowrap bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-lg shadow-sm border border-gray-200">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            }) : (
              <div className="col-span-full py-20 text-center">
                <p className="text-gray-400 text-xl font-serif italic">No products found in this sub-category.</p>
                <button onClick={() => setFilterSub('All')} className="mt-4 text-orange-600 font-bold underline">Clear Filters</button>
              </div>
            )}
        </div>
      </div>
    </section>
  );
};

const TrendingSection = ({ onProductClick }: any) => {
  const trendingItems = [
    { id: 101, title: "Classic Tailored Suit Jacket", price: 299.99, subCategory: "Formal", image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=800&auto=format&fit=crop", rating: 4.8 },
    { id: 201, title: "Elegant Silk Evening Dress", price: 350.00, subCategory: "Formal", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop", rating: 4.9 },
    { id: 401, title: "Limited Edition Chronograph", price: 899.00, subCategory: "Luxury Watches", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=800&auto=format&fit=crop", rating: 5.0 },
    { id: 108, title: "High-Top Sneakers", price: 120.00, subCategory: "Footwear", image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=800&auto=format&fit=crop", rating: 4.8 },
  ];

  return (
    <section className="py-20 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
            <span className="text-2xl">🔥</span>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">What's Trending</h2>
            <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">High Demand Pieces</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trendingItems.map((item, idx) => (
            <motion.div 
              key={item.id}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              onClick={() => onProductClick(item)}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4 border border-white/10">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute top-4 left-4 bg-orange-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">
                  Trending Now
                </div>
              </div>
              <h3 className="font-serif font-bold text-lg mb-1 group-hover:text-orange-500 transition-colors">{item.title}</h3>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">{item.subCategory}</span>
                <span className="font-bold text-orange-500">${item.price.toFixed(2)}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PromoSection = () => (
  <section id="lookbook" className="py-20 relative overflow-hidden scroll-mt-20">
    <div className="max-w-7xl mx-auto px-6">
      <div className="relative rounded-3xl overflow-hidden h-[400px] flex items-center shadow-2xl group cursor-pointer">
        <img 
          src="https://images.unsplash.com/photo-1513094735237-8f2714d57c13?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Promotional Banner"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="relative z-10 p-12 md:p-20 w-full md:w-2/3">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Elevate Your Style</h2>
          <p className="text-white/90 max-w-md mb-8 text-lg">Discover pieces that define the modern wardrobe. Uncompromising quality meets contemporary design.</p>
          <button className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-orange-500 hover:text-white transition-colors shadow-lg">
            Explore Collection
          </button>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white pt-20 pb-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-6">
              <Logo />
            </div>
            <p className="text-gray-500 max-w-sm leading-relaxed">
              Elevating everyday transit with premium, crafted apparel and accessories. Step into the future of fashion.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-black mb-6 font-sans text-sm tracking-widest uppercase">Shop</h4>
            <ul className="space-y-4 text-gray-500">
              <li><a href="#" className="hover:text-black transition-colors">Men</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Women</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Kids</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Accessories</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-black mb-6 font-sans text-sm tracking-widest uppercase">Support</h4>
            <ul className="space-y-4 text-gray-500">
              <li><a href="#" className="hover:text-black transition-colors">Customer Service</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Store Locator</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <p>&copy; 2026 Trendytransit. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const CartDrawer = ({ isOpen, onClose, cart, onRemove }: any) => {
  if (!isOpen) return null;
  const total = cart.reduce((sum: number, item: any) => sum + item.price, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/20 backdrop-blur-sm flex justify-end"
        >
          <div className="absolute inset-0" onClick={onClose} />
          <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-2xl font-serif font-bold">Shopping Bag ({cart.length})</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={24} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {cart.length === 0 ? (
                <div className="text-center text-gray-500 mt-10">Your bag is empty.</div>
              ) : (
                cart.map((item: any, idx: number) => (
                  <div key={idx} className="flex gap-4 items-center">
                    <img src={item.image} alt={item.title} className="w-20 h-24 object-cover rounded-lg bg-gray-100" />
                    <div className="flex-1">
                      <h3 className="font-bold text-sm line-clamp-1">{item.title}</h3>
                      <p className="text-gray-500 text-sm">Size: {item.selectedSize}</p>
                      <p className="font-semibold mt-1">${item.price.toFixed(2)}</p>
                    </div>
                    <button onClick={() => onRemove(idx)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                      <X size={20} />
                    </button>
                  </div>
                ))
              )}
            </div>
            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-xl">${total.toFixed(2)}</span>
                </div>
                <button className="w-full py-4 bg-black text-white font-bold rounded-xl hover:bg-gray-900 transition-colors">
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const WishlistDrawer = ({ isOpen, onClose, wishlist, onRemove, onAddToCart }: any) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/20 backdrop-blur-sm flex justify-end"
        >
          <div className="absolute inset-0" onClick={onClose} />
          <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-2xl font-serif font-bold">Wishlist ({wishlist.length})</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={24} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {wishlist.length === 0 ? (
                <div className="text-center text-gray-500 mt-10">Your wishlist is empty.</div>
              ) : (
                wishlist.map((item: any) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <img src={item.image} alt={item.title} className="w-20 h-24 object-cover rounded-lg bg-gray-100" />
                    <div className="flex-1">
                      <h3 className="font-bold text-sm line-clamp-1">{item.title}</h3>
                      <p className="font-semibold mt-1">${item.price.toFixed(2)}</p>
                      <button 
                        onClick={() => { onAddToCart(item); onRemove(item.id); }}
                        className="text-xs font-bold text-orange-600 mt-2 uppercase tracking-wider hover:text-orange-700"
                      >
                        Move to Bag
                      </button>
                    </div>
                    <button onClick={() => onRemove(item.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                      <X size={20} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [activeCategory, setActiveCategory] = useState('Men');
  const [cart, setCart] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Auth state
  const [user, setUser] = useState<any>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setIsAuthReady(true);
      
      if (currentUser) {
        // Fetch user data
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const data = userDoc.data();
            setCart(data.cart || []);
            setWishlist(data.wishlist || []);
          } else {
            // Create initial document
            await setDoc(userDocRef, {
              uid: currentUser.uid,
              email: currentUser.email,
              displayName: currentUser.displayName,
              cart: [],
              wishlist: []
            });
            setCart([]);
            setWishlist([]);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setCart([]);
        setWishlist([]);
      }
      setDataLoaded(true);
    });
    return () => unsubscribe();
  }, []);

  // Sync cart and wishlist to Firestore when they change
  useEffect(() => {
    if (user && dataLoaded) {
      const syncData = async () => {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          await setDoc(userDocRef, {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            cart,
            wishlist
          }, { merge: true });
        } catch (error) {
          console.error("Error syncing data:", error);
        }
      };
      syncData();
    }
  }, [cart, wishlist, user, dataLoaded]);

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
      showToast("Successfully logged in!");
    } catch (error) {
      showToast("Failed to log in.");
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
      showToast("Successfully logged out!");
    } catch (error) {
      showToast("Failed to log out.");
    }
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleAddToCart = (product: any, size: string = 'M') => {
    setCart([...cart, { ...product, selectedSize: size }]);
    showToast(`Added ${product.title} to bag`);
  };

  const handleRemoveFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const handleAddToWishlist = (product: any) => {
    if (wishlist.some(p => p.id === product.id)) {
      setWishlist(wishlist.filter(p => p.id !== product.id));
      showToast(`Removed ${product.title} from wishlist`);
    } else {
      setWishlist([...wishlist, product]);
      showToast(`Added ${product.title} to wishlist`);
    }
  };

  const handleRemoveFromWishlist = (id: number) => {
    setWishlist(wishlist.filter(p => p.id !== id));
  };

  return (
    <div 
      className="min-h-screen text-black selection:bg-orange-500/30"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="min-h-screen bg-white/95 backdrop-blur-sm">
        <Navbar 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
          cartCount={cart.length}
          wishlistCount={wishlist.length}
          onSearchClick={() => setIsSearchOpen(true)}
          onCartClick={() => setIsCartOpen(true)}
          onWishlistClick={() => setIsWishlistOpen(true)}
          user={user}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
        
        <Hero />
        
        <TrendingSection onProductClick={setSelectedProduct} />
        
        <FeaturedProducts 
          activeCategory={activeCategory} 
          onProductClick={setSelectedProduct}
          onAddToCart={handleAddToCart}
          onAddToWishlist={handleAddToWishlist}
          wishlist={wishlist}
        />
        
        <PromoSection />
        
        <Footer />

        {/* Search Overlay */}
        <SearchOverlay 
          isOpen={isSearchOpen} 
          onClose={() => setIsSearchOpen(false)} 
          onProductClick={setSelectedProduct}
        />

        {/* Product Details Modal */}
        {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
            wishlist={wishlist}
          />
        )}

        {/* Cart Drawer */}
        <CartDrawer 
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cart={cart}
          onRemove={handleRemoveFromCart}
        />

        {/* Wishlist Drawer */}
        <WishlistDrawer 
          isOpen={isWishlistOpen}
          onClose={() => setIsWishlistOpen(false)}
          wishlist={wishlist}
          onRemove={handleRemoveFromWishlist}
          onAddToCart={handleAddToCart}
        />

        {/* Toast Notifications */}
        <AnimatePresence>
          {toast && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-black text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 font-medium"
            >
              <Check size={18} className="text-green-400" />
              {toast}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
