import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ShoppingBag, Search, ArrowRight, Star, ChevronRight, Heart, Shirt, Diamond, Check, User, LogOut, Eye, EyeOff, Package, Mail, Phone, MapPin, Headphones, HelpCircle, Truck, RefreshCw, Send, Sparkles, MessageCircle } from 'lucide-react';
import { auth, logOut, signInWithGoogle } from './firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

import { PRODUCT_DATA } from './data/products';

const Logo = memo(() => (
  <div className="flex items-center gap-1.5 sm:gap-2 cursor-pointer">
    <Shirt className="text-orange-500 w-5 h-5 sm:w-7 sm:h-7" strokeWidth={2} />
    <span className="font-serif font-bold text-lg sm:text-2xl tracking-wide uppercase">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-600 to-red-600">TRENDY</span>
      <span className="text-black">TRANSIT</span>
    </span>
  </div>
));
Logo.displayName = 'Logo';

const Navbar = memo(({ activeCategory, setActiveCategory, currentView, setCurrentView, cartCount, wishlistCount, onSearchClick, onCartClick, onWishlistClick, user, onLogin, onLogout, onSupportClick }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const categories = ['Men', 'Women', 'Kids', 'Collections'];

  return (
    <>
      <nav className="sticky top-0 left-0 w-full z-40 backdrop-blur-lg bg-white/90 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
          <div onClick={() => setCurrentView('home')}>
            <Logo />
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => {
                setCurrentView('home');
                setActiveCategory('');
              }}
              className={`relative text-sm font-medium transition-colors uppercase tracking-wide py-1 ${
                currentView === 'home' && !categories.includes(activeCategory) ? 'text-orange-600' : 'text-gray-600 hover:text-black'
              }`}
            >
              Home
              {currentView === 'home' && !categories.includes(activeCategory) && (
                <motion.div 
                  layoutId="activeNavUnderline"
                  className="absolute -bottom-1 left-0 right-0 h-1 bg-orange-600 rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
            {categories.map((item) => (
              <a 
                key={item} 
                href="#featured-products"
                onClick={() => {
                  setCurrentView('home');
                  setActiveCategory(item);
                }}
                className={`relative text-sm font-medium transition-colors uppercase tracking-wide py-1 ${
                  currentView === 'home' && activeCategory === item ? 'text-orange-600' : 'text-gray-600 hover:text-black'
                }`}
              >
                {item}
                {currentView === 'home' && activeCategory === item && (
                  <motion.div 
                    layoutId="activeNavUnderline"
                    className="absolute -bottom-1 left-0 right-0 h-1 bg-orange-600 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
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
                <motion.button 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  onClick={() => {
                    setCurrentView('home');
                    setIsOpen(false);
                  }}
                  className={`text-3xl font-serif font-medium flex items-center justify-between group text-left ${
                    currentView === 'home' ? 'text-orange-600' : 'text-gray-400 hover:text-black'
                  }`}
                >
                  Home
                  <ChevronRight className={`transition-opacity ${currentView === 'home' ? 'opacity-100 text-orange-600' : 'opacity-0 group-hover:opacity-100 text-black'}`} />
                </motion.button>

                <motion.button 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                  onClick={() => {
                    setCurrentView('orders');
                    setIsOpen(false);
                  }}
                  className={`text-3xl font-serif font-medium flex items-center justify-between group text-left ${
                    currentView === 'orders' ? 'text-orange-600' : 'text-gray-400 hover:text-black'
                  }`}
                >
                  My Orders
                  <ChevronRight className={`transition-opacity ${currentView === 'orders' ? 'opacity-100 text-orange-600' : 'opacity-0 group-hover:opacity-100 text-black'}`} />
                </motion.button>

                {categories.map((item, i) => (
                  <motion.a 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                    key={item} 
                    href="#featured-products"
                    onClick={() => {
                      setCurrentView('home');
                      setActiveCategory(item);
                      setIsOpen(false);
                    }}
                    className={`text-3xl font-serif font-medium flex items-center justify-between group text-left ${
                      currentView === 'home' && activeCategory === item ? 'text-orange-600' : 'text-gray-400 hover:text-black'
                    }`}
                  >
                    {item}
                    <ChevronRight className={`transition-opacity ${currentView === 'home' && activeCategory === item ? 'opacity-100 text-orange-600' : 'opacity-0 group-hover:opacity-100 text-black'}`} />
                  </motion.a>
                ))}

                <div className="h-px bg-gray-200 my-4" />
                
                {['Customer Service', 'Store Locator', 'News Letter'].map((item, i) => (
                  <motion.button 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (i + 5) * 0.1 + 0.1 }}
                    key={item} 
                    onClick={() => {
                      onSupportClick(item);
                      setIsOpen(false);
                    }}
                    className="text-lg font-sans font-medium text-gray-500 hover:text-black transition-colors text-left"
                  >
                    {item}
                  </motion.button>
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
                        <div className="font-bold text-sm">{user.displayName || 'User'}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => { setCurrentView('orders'); setIsOpen(false); }}
                        className="flex-1 py-3 rounded-xl bg-orange-50 text-orange-600 font-bold hover:bg-orange-100 transition-colors uppercase tracking-widest text-[10px] flex items-center justify-center gap-2"
                      >
                        <Package size={14} /> Orders
                      </button>
                      <button 
                        onClick={() => { onLogout(); setIsOpen(false); }}
                        className="flex-1 py-3 rounded-xl bg-gray-100 text-black font-bold hover:bg-gray-200 transition-colors uppercase tracking-widest text-[10px] flex items-center justify-center gap-2"
                      >
                        <LogOut size={14} /> Log Out
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3 mb-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center">
                        <User size={20} />
                      </div>
                      <div>
                        <div className="font-bold text-sm">Guest User</div>
                        <div className="text-xs text-gray-500">Unregistered Profile</div>
                      </div>
                    </div>
                    <button onClick={() => { onLogin(); setIsOpen(false); }} className="w-full py-4 rounded-xl bg-gray-100 text-black font-bold hover:bg-gray-200 transition-colors uppercase tracking-widest text-sm mb-3">
                      Log In / Sign Up
                    </button>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => { setCurrentView('orders'); setIsOpen(false); }}
                        className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-500 font-bold hover:bg-gray-50 transition-colors uppercase tracking-widest text-[10px] flex items-center justify-center gap-2"
                      >
                        <Package size={14} /> Orders
                      </button>
                      <button 
                        onClick={() => { onLogout(); setIsOpen(false); }}
                        className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-400 font-bold hover:bg-gray-50 transition-colors uppercase tracking-widest text-[10px] flex items-center justify-center gap-2"
                      >
                        <LogOut size={14} /> Exit
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});
Navbar.displayName = 'Navbar';

const SearchOverlay = memo(({ isOpen, onClose, onProductClick }: any) => {
  const [query, setQuery] = useState('');
  const allProducts = useMemo(() => Object.values(PRODUCT_DATA).flat(), []);
  const results = useMemo(() => query ? allProducts.filter(p => p.title.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase())) : [], [query, allProducts]);

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
});
SearchOverlay.displayName = 'SearchOverlay';

const ProductModal = memo(({ product, onClose, onAddToCart, onAddToWishlist, wishlist }: any) => {
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
                  {product.description || "Experience unparalleled comfort and style with this premium piece. Meticulously crafted from high-quality materials, it's designed to elevate your everyday wardrobe while providing lasting durability."}
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
});
ProductModal.displayName = 'ProductModal';

const Hero = memo(({ user, onLogin, onLogout, setCurrentView }: any) => {
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
      <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-0" />
      
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

          {user ? (
            <div className="mt-10 p-6 bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 shadow-xl flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
              <div className="flex items-center gap-4">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="w-16 h-16 rounded-full border-2 border-orange-500" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center border-2 border-orange-500">
                    <User size={32} />
                  </div>
                )}
                <div>
                  <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">Logged in as:</div>
                  <div className="text-xl font-bold text-black font-serif">{user.displayName || user.email?.split('@')[0] || 'Member'}</div>
                  <div className="text-xs text-gray-500 font-medium">{user.email}</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button 
                  onClick={() => setCurrentView('orders')}
                  className="px-6 py-3 rounded-xl bg-gray-100 text-black font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <Package size={16} />
                  My Orders
                </button>
                <button 
                  onClick={onLogout}
                  className="px-6 py-3 rounded-xl bg-black text-white font-bold hover:bg-gray-900 transition-all flex items-center justify-center gap-2 text-sm shadow-lg whitespace-nowrap"
                >
                  <LogOut size={16} className="text-orange-500" />
                  Log Out
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
              <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2 sm:mb-0 sm:mr-4">Join the transit:</div>
              <div className="flex gap-4">
                <button 
                  onClick={onLogin} 
                  className="px-6 py-3 rounded-xl bg-black text-white font-bold hover:bg-gray-900 transition-all shadow-xl flex items-center gap-2 group text-sm"
                >
                  <User size={16} className="group-hover:text-orange-500 transition-colors" />
                  Log In
                </button>
                <button 
                  onClick={onLogin} 
                  className="px-6 py-3 rounded-xl border-2 border-orange-600 text-orange-600 font-bold hover:bg-orange-600 hover:text-white transition-all shadow-lg text-sm"
                >
                  Sign Up
                </button>
              </div>
            </div>
          )}
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
});
Hero.displayName = 'Hero';

const ProductCard = memo(({ product, idx, isInWishlist, onProductClick, onAddToCart, onAddToWishlist, variant = 'light' }: any) => {
  const isDark = variant === 'dark';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        delay: (idx % 4) * 0.08,
        duration: 0.5,
        ease: [0.165, 0.84, 0.44, 1] 
      }}
      className="group relative cursor-pointer"
      onClick={() => onProductClick(product)}
      style={{ willChange: 'transform, opacity' }}
    >
      <div className={`relative aspect-[3/4] rounded-2xl overflow-hidden mb-5 ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-gray-100 border-gray-200'} border shadow-sm group-hover:shadow-2xl transition-all duration-500`}>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 z-10" />
        
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
          {product.isNew && (
            <div className="bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-lg">
              New
            </div>
          )}
          {product.isBestSeller && !product.isNew && (
            <div className="bg-amber-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-lg">
              Top
            </div>
          )}
          {product.rating >= 4.9 && !product.isNew && !product.isBestSeller && (
            <div className="bg-purple-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-lg">
              Popular
            </div>
          )}
          {isDark && !product.isNew && !product.isBestSeller && product.rating < 4.9 && (
            <div className="bg-orange-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg">
              Trending
            </div>
          )}
        </div>
        
        {onAddToWishlist && (
          <button 
            onClick={(e) => { e.stopPropagation(); onAddToWishlist(product); }}
            className={`absolute top-4 right-4 z-20 p-2.5 ${isDark ? 'bg-zinc-800/90 text-zinc-400' : 'bg-white/90 text-gray-400'} backdrop-blur-md rounded-full hover:text-red-500 hover:bg-white transition-all opacity-0 group-hover:opacity-100 shadow-sm`}
          >
            <Heart size={18} strokeWidth={1.5} className={isInWishlist ? "fill-red-500 text-red-500" : ""} />
          </button>
        )}

        <img 
          src={product.image} 
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute bottom-0 left-0 w-full p-4 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button 
            onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
            className={`w-full py-3 ${isDark ? 'bg-white text-black' : 'bg-white/95 backdrop-blur-md text-black'} font-semibold rounded-xl hover:bg-black hover:text-white transition-colors shadow-lg border ${isDark ? 'border-transparent' : 'border-gray-200'}`}
          >
            Add to Bag
          </button>
        </div>
      </div>
      
      <div className="flex flex-col px-2 pr-1 overflow-hidden">
        <div className="flex justify-between items-center mb-1.5">
          <span className={`text-[10px] font-medium uppercase tracking-widest ${isDark ? 'text-zinc-500' : 'text-gray-500'}`}>
            {product.subCategory}
          </span>
          <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${isDark ? 'bg-zinc-900' : 'bg-gray-50'}`}>
            <Star size={10} className="text-orange-500 fill-orange-500" />
            <span className={`text-[10px] font-bold ${isDark ? 'text-zinc-300' : 'text-black'}`}>{product.rating}</span>
          </div>
        </div>
        <div className="flex justify-between items-start gap-4">
          <h3 className={`text-base font-serif font-bold leading-snug line-clamp-2 transition-colors duration-300 ${isDark ? 'text-white group-hover:text-orange-500' : 'text-black group-hover:text-orange-600'}`}>
            {product.title}
          </h3>
          <span className={`text-sm font-sans font-semibold whitespace-nowrap px-2.5 py-1 rounded-lg shadow-sm border ${isDark ? 'bg-zinc-800 text-white border-zinc-700' : 'bg-white text-black border-gray-200'}`}>
            ${product.price.toFixed(2)}
          </span>
        </div>
      </div>
    </motion.div>
  );
});
ProductCard.displayName = 'ProductCard';

const FeaturedProducts = memo(({ activeCategory, onProductClick, onAddToCart, onAddToWishlist, wishlist }: any) => {
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');
  const [filterSub, setFilterSub] = useState('All');
  
  const rawProducts = useMemo(() => activeCategory ? (PRODUCT_DATA[activeCategory] || []) : Object.values(PRODUCT_DATA).flat(), [activeCategory]);
  
  // Get unique subcategories for filtering
  const subCategories = useMemo(() => ['All', ...new Set(rawProducts.map(p => p.subCategory))], [rawProducts]);

  // Apply filtering and sorting
  const products = useMemo(() => rawProducts
    .filter(p => filterSub === 'All' || p.subCategory === filterSub)
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // newest/default
    }), [rawProducts, filterSub, sortBy]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400); // Snappier loading feel
    return () => clearTimeout(timer);
  }, [activeCategory, sortBy, filterSub]);

  return (
    <section id="featured-products" className="py-24 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <motion.h2 
              key={activeCategory || 'all'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-serif font-bold mb-4 text-black"
            >
              {activeCategory || 'Featured Products'}
            </motion.h2>
            <p className="text-gray-600 font-medium">Curated selections for the modern pioneer.</p>
          </div>
          
          <div className="flex flex-wrap gap-4 items-center w-full md:w-auto">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Filter By</span>
              <select 
                value={filterSub}
                onChange={(e) => setFilterSub(e.target.value)}
                className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm font-medium outline-none focus:border-black transition-colors ring-offset-2 focus:ring-2 focus:ring-black/5"
              >
                {subCategories.map(sub => <option key={sub} value={sub}>{sub}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sort By</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm font-medium outline-none focus:border-black transition-colors ring-offset-2 focus:ring-2 focus:ring-black/5"
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
            : products.length > 0 ? products.map((product, idx) => (
                <ProductCard 
                  key={`${activeCategory}-${product.id}`}
                  product={product}
                  idx={idx}
                  isInWishlist={wishlist.some((p: any) => p.id === product.id)}
                  onProductClick={onProductClick}
                  onAddToCart={onAddToCart}
                  onAddToWishlist={onAddToWishlist}
                />
              ))
            : (
              <div className="col-span-full py-20 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                <p className="text-gray-400 text-xl font-serif italic">No products found in this sub-category.</p>
                <button onClick={() => setFilterSub('All')} className="mt-4 text-orange-600 font-bold underline">Clear Filters</button>
              </div>
            )}
        </div>
      </div>
    </section>
  );
});
FeaturedProducts.displayName = 'FeaturedProducts';

const TrendingSection = memo(({ onProductClick, onAddToCart, onAddToWishlist, wishlist }: any) => {
  const trendingItems = useMemo(() => [
    PRODUCT_DATA['Men'].find(p => p.id === 101),
    PRODUCT_DATA['Women'].find(p => p.id === 201),
    PRODUCT_DATA['Collections'].find(p => p.id === 401),
    PRODUCT_DATA['Men'].find(p => p.id === 108),
  ].filter(Boolean), []);

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
            <ProductCard 
              key={item.id}
              product={item}
              idx={idx}
              variant="dark"
              isInWishlist={wishlist?.some((p: any) => p.id === item.id)}
              onProductClick={onProductClick}
              onAddToCart={onAddToCart}
              onAddToWishlist={onAddToWishlist}
            />
          ))}
        </div>
      </div>
    </section>
  );
});
TrendingSection.displayName = 'TrendingSection';

const AboutSection = memo(() => {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-20 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-gray-400 text-sm uppercase tracking-widest font-bold mb-4">Our Story</h2>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight">
              Elevating the <span className="text-orange-600">Transit</span> of Modern Life.
            </h1>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Founded in 2024, Trendytransit was born from a simple observation: the modern urban life is a series of transitions. From the morning commute to late-night gatherings, we believe your wardrobe should move with you effortlessly.
            </p>
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="font-bold text-xl mb-2">Our Mission</h4>
                <p className="text-gray-500 text-sm">To provide meticulously crafted apparel that combines timeless elegance with contemporary functionality.</p>
              </div>
              <div>
                <h4 className="font-bold text-xl mb-2">Our Vision</h4>
                <p className="text-gray-500 text-sm">To become the global standard for high-performance urban fashion that doesn't compromise on style.</p>
              </div>
            </div>
            <div className="flex items-center gap-6 p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <img key={i} src={`https://picsum.photos/seed/user${i}/100/100`} className="w-10 h-10 rounded-full border-2 border-white object-cover" referrerPolicy="no-referrer" />
                ))}
              </div>
              <p className="text-sm text-gray-500"><span className="font-bold text-black">50,000+</span> satisfied transitters worldwide.</p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=870&auto=format&fit=crop" 
                alt="Our Workspace"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-50 -z-10" />
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-amber-100 rounded-full blur-3xl opacity-50 -z-10" />
            
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -right-8 top-1/4 z-20 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-[200px]"
            >
              <div className="flex items-center gap-2 mb-2">
                <Shirt size={20} className="text-orange-600" />
                <span className="font-bold text-sm uppercase">Heritage</span>
              </div>
              <p className="text-xs text-gray-500">Every piece is designed in our London studio with obsession over detail.</p>
            </motion.div>
          </motion.div>
        </div>

        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: "Uncompromising Quality", desc: "We source the finest materials from sustainable suppliers worldwide.", icon: Diamond },
            { title: "Modern Functionality", desc: "Clothes designed for the way you actually live your life today.", icon: ArrowRight },
            { title: "Timeless Aesthetic", desc: "Style that transcends trends and remains relevant for years.", icon: Star }
          ].map((v, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 mb-6">
                <v.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">{v.title}</h3>
              <p className="text-gray-500">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
});
AboutSection.displayName = 'AboutSection';

const PromoSection = memo(({ setCurrentView, setActiveCategory }: any) => (
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
          <button 
            onClick={() => {
              setCurrentView('home');
              setActiveCategory('Collections');
              document.getElementById('featured-products')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-orange-500 hover:text-white transition-colors shadow-lg"
          >
            Explore Collection
          </button>
        </div>
      </div>
    </div>
  </section>
));
PromoSection.displayName = 'PromoSection';

const FooterModal = memo(({ title, content, onClose }: any) => {
  return createPortal(
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-md flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white w-full max-w-2xl rounded-3xl p-8 shadow-2xl overflow-hidden relative"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors">
          <X size={24} />
        </button>
        <h3 className="text-3xl font-serif font-bold mb-8">{title}</h3>
        <div className="max-h-[70vh] overflow-y-auto pr-4">
          {content}
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
});
FooterModal.displayName = 'FooterModal';

const SUPPORT_SECTIONS: { [key: string]: any } = {
  'Customer Service': {
    title: 'Customer Service',
    render: () => (
      <div className="space-y-8">
        <div className="flex gap-4 p-6 bg-gray-50 rounded-2xl">
          <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
            <Headphones size={24} />
          </div>
          <div>
            <h4 className="font-bold text-lg mb-1">Live Support</h4>
            <p className="text-gray-500 text-sm">Available Monday to Friday, 9am - 6pm GMT.</p>
            <button className="mt-3 text-orange-600 font-bold text-sm uppercase tracking-widest hover:underline">Start Chat</button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 border border-gray-100 rounded-2xl flex flex-col gap-3">
            <HelpCircle className="text-gray-400" />
            <h4 className="font-bold">FAQ</h4>
            <p className="text-gray-500 text-sm">Find quick answers to common questions about sizes, shipping, and more.</p>
          </div>
          <div className="p-6 border border-gray-100 rounded-2xl flex flex-col gap-3">
            <Truck className="text-gray-400" />
            <h4 className="font-bold">Track Shipping</h4>
            <p className="text-gray-500 text-sm">Enter your tracking number to see exactly where your transit is.</p>
          </div>
        </div>
        <div className="p-6 border border-gray-100 rounded-2xl">
          <h4 className="font-bold mb-4">Common Topics</h4>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-center gap-2 cursor-pointer hover:text-black transition-colors"><ChevronRight size={14} className="text-orange-500" /> My order hasn't arrived</li>
            <li className="flex items-center gap-2 cursor-pointer hover:text-black transition-colors"><ChevronRight size={14} className="text-orange-500" /> I received a damaged item</li>
            <li className="flex items-center gap-2 cursor-pointer hover:text-black transition-colors"><ChevronRight size={14} className="text-orange-500" /> How do I change my delivery address?</li>
          </ul>
        </div>
      </div>
    )
  },
  'Store Locator': {
    title: 'Store Locator',
    render: () => (
      <div className="space-y-6">
        <p className="text-gray-600 uppercase tracking-widest text-xs font-bold">Our Flagship Store</p>
        <div className="bg-gray-200 rounded-3xl aspect-video overflow-hidden relative border border-gray-100 shadow-inner">
           {/* Fake Map Implementation */}
           <iframe 
             width="100%" 
             height="100%" 
             style={{ border: 0 }} 
             loading="lazy" 
             allowFullScreen 
             referrerPolicy="no-referrer-when-downgrade"
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.9050207914434!2d-0.12634352338980838!3d51.5149306718151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604ccab37651f%3A0x222ec591f8680193!2sCovent%20Garden!5e0!3m2!1sen!2suk!4v1709421234567!5m2!1sen!2suk"
           ></iframe>
           <div className="absolute top-4 left-4 inline-flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-gray-100">
             <MapPin size={16} className="text-orange-600" />
             <span className="text-sm font-bold">London, UK</span>
           </div>
        </div>
        <div className="flex justify-between items-center p-6 bg-gray-50 rounded-2xl">
          <div>
            <h4 className="font-bold">Trendy Transit London</h4>
            <p className="text-gray-500 text-sm">42 Streetwear Lane, London, UK</p>
          </div>
          <button className="px-4 py-2 bg-black text-white text-xs font-bold rounded-lg hover:bg-gray-800 transition-colors uppercase tracking-widest">Directions</button>
        </div>
      </div>
    )
  },
  'Returns': {
    title: 'Returns Policy',
    render: () => (
      <div className="space-y-6">
        <div className="flex items-center gap-4 text-orange-600 mb-8">
          <RefreshCw size={32} />
          <h4 className="text-xl font-bold">30-Day Easy Returns</h4>
        </div>
        <div className="p-6 border border-gray-100 rounded-2xl space-y-4">
          <h4 className="font-bold flex items-center gap-2 text-black"><Check size={18} className="text-green-500" /> Eligible for return</h4>
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
            <img src="https://picsum.photos/seed/transit-shoe/100/100" className="w-16 h-16 rounded-lg object-cover" referrerPolicy="no-referrer" />
            <div className="text-sm">
              <p className="font-bold text-gray-800">Unworn Streetwear Items</p>
              <p className="text-gray-500 mt-1">Tags must be attached and items must be in original packaging.</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            We offer a full refund or exchange for any item returned within 30 days of purchase. Simply generate a return label in your account or visit our flagship store.
          </p>
        </div>
        <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
          <h4 className="font-bold text-orange-900 mb-2">Note for returns:</h4>
          <p className="text-sm text-orange-800">Personal items like undergarments and custom-tailored collection pieces are not eligible for returns due to hygiene and bespoke nature.</p>
        </div>
      </div>
    )
  },
  'Contact': {
    title: 'Contact Us',
    render: () => (
      <div className="space-y-8">
        <p className="text-gray-600">Have a question? Our team is here to help you redefine your transit.</p>
        <div className="grid grid-cols-1 gap-6">
          <div className="flex items-center gap-6 p-6 bg-gray-50 rounded-3xl border border-gray-100 group transition-all hover:bg-white hover:shadow-xl hover:-translate-y-1">
            <div className="w-16 h-16 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <Mail size={32} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Email Support</h4>
              <p className="text-xl font-bold text-black group-hover:text-orange-600 transition-colors">trendytransit@gmail.com</p>
            </div>
          </div>
          <div className="flex items-center gap-6 p-6 bg-gray-50 rounded-3xl border border-gray-100 group transition-all hover:bg-white hover:shadow-xl hover:-translate-y-1">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <Phone size={32} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Call Us</h4>
              <p className="text-xl font-bold text-black transition-colors">+44 (0) 20 7946 0123</p>
            </div>
          </div>
        </div>
        <div className="pt-6">
          <h4 className="font-bold mb-4">Social Transit</h4>
          <div className="flex gap-4">
            {['Instagram', 'Twitter', 'TikTok'].map(s => (
              <button key={s} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all">{s}</button>
            ))}
          </div>
        </div>
      </div>
    )
  },
  'News Letter': {
    title: 'Newsletter',
    render: () => (
      <div className="space-y-6">
        <div className="p-8 bg-black text-white rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/20 blur-3xl rounded-full -mr-16 -mt-16" />
          <h4 className="text-2xl font-serif font-bold mb-4">Join the Club</h4>
          <p className="text-gray-400 mb-6 font-medium">Get early access to drops, exclusive discounts, and fashion insights directly to your inbox.</p>
          <div className="flex flex-col gap-3">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-orange-500 transition-colors text-white placeholder:text-gray-500"
            />
            <button className="w-full py-4 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-colors uppercase tracking-widest">Subscribe Now</button>
          </div>
          <p className="text-[10px] text-gray-500 mt-4 text-center">By subscribing, you agree to our Terms of Service and Privacy Policy.</p>
        </div>
      </div>
    )
  }
};

const Footer = memo(({ setCurrentView, setActiveCategory, onSupportClick }: any) => {
  return (
    <footer className="border-t border-gray-200 bg-white pt-20 pb-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1">
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
              <li><button onClick={() => setCurrentView('home')} className="hover:text-black transition-colors">Home</button></li>
              <li><button onClick={() => { setActiveCategory('Men'); document.getElementById('featured-products')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-black transition-colors">Men</button></li>
              <li><button onClick={() => { setActiveCategory('Women'); document.getElementById('featured-products')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-black transition-colors">Women</button></li>
              <li><button onClick={() => { setActiveCategory('Kids'); document.getElementById('featured-products')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-black transition-colors">Kids</button></li>
              <li><button onClick={() => { setActiveCategory('Collections'); document.getElementById('featured-products')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-black transition-colors">Collections</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-black mb-6 font-sans text-sm tracking-widest uppercase">Support</h4>
            <ul className="space-y-4 text-gray-500">
              <li><button onClick={() => setCurrentView('about')} className="hover:text-black transition-colors">About Us</button></li>
              <li><button onClick={() => onSupportClick('Customer Service')} className="hover:text-black transition-colors">Customer Service</button></li>
              <li><button onClick={() => onSupportClick('Store Locator')} className="hover:text-black transition-colors">Store Locator</button></li>
              <li><button onClick={() => onSupportClick('Returns')} className="hover:text-black transition-colors">Returns</button></li>
              <li><button onClick={() => onSupportClick('Contact')} className="hover:text-black transition-colors">Contact</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-black mb-6 font-sans text-sm tracking-widest uppercase">Newsletter</h4>
            <p className="text-gray-500 text-sm mb-6">Stay ahead of the curve with our latest drops.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email" 
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black text-sm"
              />
              <button 
                onClick={() => onSupportClick('News Letter')}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <ArrowRight size={18} />
              </button>
            </div>
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
});
Footer.displayName = 'Footer';

const ChatbotWidget = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'assistant' | 'user', text: string}[]>([
    { role: 'assistant', text: "Hey! I'm Toby, your fashion AI assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    
    // Placeholder for Gemini integration
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', text: "I'm currently in training, but I'll be ready to help you with personalized fashion advice soon!" }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[200]">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-[350px] sm:w-[400px] h-[500px] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-black p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center">
                  <Sparkles size={20} className="text-white fill-white" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">Toby</h4>
                  <p className="text-orange-500 text-[10px] font-bold uppercase tracking-wider">AI Assistant</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                    m.role === 'user' 
                      ? 'bg-orange-600 text-white rounded-tr-none shadow-lg shadow-orange-600/20' 
                      : 'bg-white text-gray-700 border border-gray-100 rounded-tl-none shadow-sm'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-100 bg-white">
              <div className="relative">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about fashion..."
                  className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-orange-500 transition-colors text-sm"
                />
                <button 
                  onClick={handleSend}
                  className="absolute right-2 top-1.5 p-1.5 bg-black text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-black shadow-2xl flex items-center justify-center text-white relative group border-4 border-white"
      >
        <div className="absolute inset-0 bg-orange-600 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 -z-10" />
        <MessageCircle size={28} className={isOpen ? 'hidden' : 'block'} />
        <X size={28} className={isOpen ? 'block' : 'hidden'} />
      </motion.button>
    </div>
  );
});
ChatbotWidget.displayName = 'ChatbotWidget';

const CartDrawer = ({ isOpen, onClose, cart, onRemove, onCheckout }: any) => {
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
                <button 
                  onClick={() => onCheckout()}
                  className="w-full py-4 bg-black text-white font-bold rounded-xl hover:bg-gray-900 transition-colors shadow-lg"
                >
                  Confirm Order
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

const OrdersView = ({ orders, onBack }: any) => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 min-h-screen">
      <div className="flex items-center gap-4 mb-12">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
          <ArrowRight className="rotate-180" size={24} />
        </button>
        <h1 className="text-4xl font-serif font-bold">Your Orders</h1>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-300">
          <Package className="mx-auto mb-4 text-gray-300" size={48} />
          <h3 className="text-xl font-bold text-gray-400">No orders found</h3>
          <p className="text-gray-500 mt-2">Start shopping to see your orders here.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order: any) => (
            <motion.div 
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-wrap justify-between items-start gap-4 mb-6 pb-6 border-b border-gray-100">
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Order ID</div>
                  <div className="text-lg font-bold text-black font-mono">{order.id}</div>
                </div>
                <div className="hidden sm:block">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Date</div>
                  <div className="font-bold">{order.date}</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Status</div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-[10px] font-bold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                    {order.status}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total</div>
                  <div className="font-bold text-lg">${order.total.toFixed(2)}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Items ({order.items.length})</div>
                  <div className="flex -space-x-3 overflow-hidden">
                    {order.items.map((item: any, i: number) => (
                      <img 
                        key={i} 
                        src={item.image} 
                        className="w-12 h-16 object-cover rounded-lg border-2 border-white shadow-sm"
                        alt={item.title}
                      />
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Est. Delivery</div>
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="text-green-500" size={16} />
                      <span className="font-medium text-gray-700">{order.estimatedDelivery}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

declare global {
  interface Window {
    toastTimer: any;
  }
}

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [activeCategory, setActiveCategory] = useState('');
  const [cart, setCart] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const handleProductClick = useCallback((product: any) => setSelectedProduct(product), []);
  const handleCloseProductModal = useCallback(() => setSelectedProduct(null), []);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [activeSupportModal, setActiveSupportModal] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Auth state
  const [user, setUser] = useState<any>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [authError, setAuthError] = useState('');
  const [verificationEmail, setVerificationEmail] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      setShowAuthModal(false);
    } catch (error: any) {
      setAuthError(error.message);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    
    if (isSignUp) {
      if (password !== confirmPassword) {
        setAuthError('Passwords do not match');
        return;
      }
      // Simple frontend check for password reuse prevention
      const usedPasswords = JSON.parse(localStorage.getItem(`pw_history_${email}`) || '[]');
      if (usedPasswords.includes(password)) {
        setAuthError('You have recently used this password. Please choose a new one.');
        return;
      }
    }

    try {
      if (isSignUp) {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        
        // Save to password history to prevent future reuse
        const usedPasswords = JSON.parse(localStorage.getItem(`pw_history_${email}`) || '[]');
        localStorage.setItem(`pw_history_${email}`, JSON.stringify([...new Set([...usedPasswords, password])]));
        
        await sendEmailVerification(userCred.user);
        await logOut();
        setVerificationEmail(email);
      } else {
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        if (!userCred.user.emailVerified) {
          await logOut();
          setVerificationEmail(email);
        } else {
          setShowAuthModal(false);
        }
      }
    } catch (error: any) {
      if (isSignUp && error.code === 'auth/email-already-in-use') {
        setAuthError('User already exists. Please sign in');
      } else if (!isSignUp && (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential')) {
        setAuthError('Email or password is incorrect');
      } else {
        setAuthError(error.message);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && !currentUser.emailVerified) {
        setUser(null);
        setVerificationEmail(currentUser.email || '');
      } else {
        setUser(currentUser);
        if (currentUser && currentUser.emailVerified) {
          setVerificationEmail('');
          setShowAuthModal(false);
          // Load orders from localStorage if they exist
          const savedOrders = localStorage.getItem(`orders_${currentUser.uid}`);
          if (savedOrders) setOrders(JSON.parse(savedOrders));
        }
      }
      setIsAuthReady(true);
      setDataLoaded(true);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await logOut();
      showToast("Signed out successfully");
      setCurrentView('home');
      setShowAuthModal(true); // Always return to auth page (modal) on logout to match guest flow
    } catch (error) {
      showToast("Failed to log out.");
    }
  };

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (window.toastTimer) clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => setToast(null), 3000);
  }, []);

  const handleAddToCart = useCallback((product: any, size: string = 'M') => {
    if (!user) {
      showToast("Please sign in or sign up to proceed to pick up items");
      setShowAuthModal(true);
      return;
    }
    setCart(prev => [...prev, { ...product, selectedSize: size }]);
    showToast(`Added ${product.title} to bag`);
  }, [user, showToast]);

  const handleCheckout = useCallback(() => {
    if (cart.length === 0) return;
    
    const newOrder = {
      id: `TT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      date: new Date().toLocaleDateString(),
      items: [...cart],
      total: cart.reduce((sum, item) => sum + item.price, 0),
      status: 'Processing',
      estimatedDelivery: '3-5 business days'
    };
    
    setOrders(prev => {
      const updated = [newOrder, ...prev];
      localStorage.setItem(`orders_${user?.uid || 'guest'}`, JSON.stringify(updated));
      return updated;
    });
    
    setCart([]);
    setIsCartOpen(false);
    setCurrentView('orders');
    showToast(`Order ${newOrder.id} placed successfully!`);
  }, [cart, orders, user, showToast]);

  const handleRemoveFromCart = useCallback((index: number) => {
    setCart(prev => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  }, []);

  const handleAddToWishlist = useCallback((product: any) => {
    if (!user) {
      showToast("Please sign in or sign up to proceed to pick up items");
      setShowAuthModal(true);
      return;
    }
    setWishlist(prev => {
      if (prev.some(p => p.id === product.id)) {
        showToast(`Removed ${product.title} from wishlist`);
        return prev.filter(p => p.id !== product.id);
      } else {
        showToast(`Added ${product.title} to wishlist`);
        return [...prev, product];
      }
    });
  }, [user, showToast]);

  const handleRemoveFromWishlist = useCallback((id: number) => {
    setWishlist(prev => prev.filter(p => p.id !== id));
  }, []);

  const handleCloseAuthModal = useCallback(() => {
    setShowAuthModal(false);
    setVerificationEmail('');
    setAuthError('');
    setPassword('');
    setConfirmPassword('');
  }, []);

  const renderAuthModal = () => {
    if (!showAuthModal) return null;

    if (verificationEmail) {
      return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="max-w-md w-full px-6 py-12 bg-white rounded-3xl shadow-xl text-center relative">
            <button onClick={handleCloseAuthModal} className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors">
              <X size={24} />
            </button>
            <div className="flex justify-center mb-8">
              <Logo />
            </div>
            <h2 className="text-2xl font-bold mb-4 font-serif">Verify Your Email</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              We have sent you a verification email to <span className="font-bold text-black">{verificationEmail}</span>. Please verify it and log in.
            </p>
            <button 
              onClick={async () => {
                await logOut();
                setVerificationEmail('');
                setIsSignUp(false);
                setAuthError('');
                setPassword('');
              }}
              className="w-full bg-black text-white font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-gray-900 transition-colors"
            >
              Login
            </button>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <div className="max-w-md w-full px-6 py-12 bg-white rounded-3xl shadow-xl relative">
          <button onClick={handleCloseAuthModal} className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors">
            <X size={24} />
          </button>
          <div className="flex justify-center mb-8">
            <Logo />
          </div>
          <h2 className="text-2xl font-bold text-center mb-6 font-serif">
            {isSignUp ? 'Create an Account' : 'Welcome Back'}
          </h2>
          
          <button 
            type="button" 
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50 transition-colors mb-6 shadow-sm"
          >
            <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z" fill="#4285F4"/>
              <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z" fill="#34A853"/>
              <path d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03296C-0.371021 20.0012 -0.371021 28.0109 3.03296 34.7825L11.0051 28.6006Z" fill="#FBBC05"/>
              <path d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24515C36.2058 2.21396 30.4101 -0.0699699 24.48 0.00161733C15.4056 0.00161733 7.10718 5.11644 3.03296 13.2296L11.0051 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="h-px bg-gray-200 flex-1"></div>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Or with email</span>
            <div className="h-px bg-gray-200 flex-1"></div>
          </div>
          
          <form onSubmit={handleAuth} className="space-y-4">
            {authError && (
              <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
                {authError}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-black transition-colors"
                placeholder="Enter your email"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-black transition-colors"
                  placeholder="Enter your password"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {isSignUp && (
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Confirm Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-black transition-colors"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>
            )}
            
            <button 
              type="submit"
              className="w-full bg-black text-white font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-gray-900 transition-colors mt-2"
            >
              {isSignUp ? 'Sign Up' : 'Log In'}
            </button>
          </form>
          
          <div className="mt-8 text-center text-sm font-medium text-gray-500">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button 
              onClick={() => { setIsSignUp(!isSignUp); setAuthError(''); }}
              className="text-black font-bold uppercase tracking-wider hover:underline"
            >
              {isSignUp ? 'Log In' : 'Sign Up'}
            </button>
          </div>
        </div>
      </motion.div>
    );
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
      <AnimatePresence>
        {renderAuthModal()}
      </AnimatePresence>

      {/* Modals placed OUTSIDE the backdrop-blur wrapper so position:fixed works perfectly relative to the screen */}
      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        onProductClick={setSelectedProduct}
      />

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            onClose={handleCloseProductModal}
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
            wishlist={wishlist}
          />
        )}
      </AnimatePresence>

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={useCallback(() => setIsCartOpen(false), [])}
        cart={cart}
        onRemove={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      <WishlistDrawer 
        isOpen={isWishlistOpen}
        onClose={useCallback(() => setIsWishlistOpen(false), [])}
        wishlist={wishlist}
        onRemove={handleRemoveFromWishlist}
        onAddToCart={handleAddToCart}
      />

      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] bg-black text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 font-medium"
          >
            <Check size={18} className="text-green-400" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-white/95 backdrop-blur-sm">
        <Navbar 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
          currentView={currentView}
          setCurrentView={setCurrentView}
          cartCount={cart.length}
          wishlistCount={wishlist.length}
          onSearchClick={() => setIsSearchOpen(true)}
          onCartClick={() => setIsCartOpen(true)}
          onWishlistClick={() => setIsWishlistOpen(true)}
          user={user}
          onLogin={() => setShowAuthModal(true)}
          onLogout={handleLogout}
          onSupportClick={setActiveSupportModal}
        />
        
        {currentView === 'home' ? (
          <>
            <Hero user={user} onLogin={useCallback(() => setShowAuthModal(true), [])} onLogout={handleLogout} setCurrentView={setCurrentView} />
            
            <TrendingSection 
              onProductClick={handleProductClick} 
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
              wishlist={wishlist}
            />
            
            <FeaturedProducts 
              activeCategory={activeCategory} 
              onProductClick={handleProductClick}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
              wishlist={wishlist}
            />
            
            <PromoSection setCurrentView={setCurrentView} setActiveCategory={setActiveCategory} />
          </>
        ) : currentView === 'orders' ? (
          <OrdersView orders={orders} onBack={useCallback(() => setCurrentView('home'), [])} />
        ) : (
          <AboutSection />
        )}
        
        <Footer setCurrentView={setCurrentView} setActiveCategory={setActiveCategory} onSupportClick={setActiveSupportModal} />
      </div>

      <AnimatePresence>
        {activeSupportModal && SUPPORT_SECTIONS[activeSupportModal] && (
          <FooterModal 
            title={SUPPORT_SECTIONS[activeSupportModal].title}
            content={SUPPORT_SECTIONS[activeSupportModal].render()}
            onClose={() => setActiveSupportModal(null)}
          />
        )}
      </AnimatePresence>

      <ChatbotWidget />
    </div>
  );
}
