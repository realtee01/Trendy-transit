const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Add imports
content = content.replace(
  'import { createPortal } from "react-dom";',
  'import { createPortal } from "react-dom";\nimport { Routes, Route, useNavigate, useLocation, Link } from "react-router-dom";'
);

// 2. Replace useState
content = content.replace(
  'const [currentView, setCurrentView] = useState("home");',
  `const location = useLocation();
  const navigate = useNavigate();
  // We handle nested routes by grabbing the first path segment or default to home.
  const pathSegment = location.pathname.split('/')[1] || 'home';
  const currentView = pathSegment;
  const setCurrentView = useCallback((view) => {
    navigate(view === 'home' ? '/' : \`/\${view}\`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigate]);`
);

// 3. Replace the massive ternary conditional render with <Routes>
const oldConditional = `{currentView === "home" ? (
          <>
            <Hero setCurrentView={setCurrentView} />
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
            <PromoSection
              setCurrentView={setCurrentView}
              setActiveCategory={setActiveCategory}
            />
          </>
        ) : currentView === "orders" ? (
          <OrdersView
            orders={orders}
            onBack={() => setCurrentView("profile")}
          />
        ) : currentView === "profile" ? (
          <ProfileDashboard
            user={user}
            orders={orders}
            wishlistCount={wishlist.length}
            onLogout={handleLogout}
            onNavigate={setCurrentView}
          />
        ) : currentView === "lookbook" ? (
          <LookbookView onBack={() => setCurrentView("home")} />
        ) : (
          <AboutSection />
        )}`;

const newRoutes = `<Routes>
          <Route path="/" element={
            <>
              <Hero setCurrentView={setCurrentView} />
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
              <PromoSection
                setCurrentView={setCurrentView}
                setActiveCategory={setActiveCategory}
              />
            </>
          } />
          <Route path="/orders" element={
            <OrdersView
              orders={orders}
              onBack={() => setCurrentView("profile")}
            />
          } />
          <Route path="/profile" element={
            <ProfileDashboard
              user={user}
              orders={orders}
              wishlistCount={wishlist.length}
              onLogout={handleLogout}
              onNavigate={setCurrentView}
            />
          } />
          <Route path="/lookbook" element={
            <LookbookView onBack={() => setCurrentView("home")} />
          } />
          <Route path="/about" element={
            <AboutSection />
          } />
          <Route path="*" element={
             <AboutSection />
          } />
        </Routes>`;

content = content.replace(oldConditional, newRoutes);

fs.writeFileSync('src/App.tsx', content);
console.log('App.tsx updated.');
