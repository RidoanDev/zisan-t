import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, SlidersHorizontal, ShoppingBag } from 'lucide-react';
import { products, categories } from '@/data/products';
import { useCart } from '@/context/CartContext';
import BottomNav from '@/components/BottomNav';
import HamburgerMenu from '@/components/HamburgerMenu';
import SearchBar from '@/components/SearchBar';
import Banner from '@/components/Banner';
import CategoryCard from '@/components/CategoryCard';
import ProductCard from '@/components/ProductCard';
import ProductSkeleton from '@/components/ProductSkeleton';
import CategorySkeleton from '@/components/CategorySkeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { getTotalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('default');
  const [isLoading, setIsLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  // Extended loading time for better image preloading
  useEffect(() => {
    const categoryTimer = setTimeout(() => {
      setCategoriesLoading(false);
    }, 1200);
    const productTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);
    return () => {
      clearTimeout(categoryTimer);
      clearTimeout(productTimer);
    };
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.reverse();
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, sortBy]);

  const totalItems = getTotalItems();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-lg border-b border-border">
        <div className="px-4 py-3 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <HamburgerMenu />
              <div className="flex items-center gap-2">
                <img 
                  src="/logo.png" 
                  alt="বিনিময়" 
                  className="w-12 h-12 "
                />
                <span className="text-lg font-bold text-primary">বিনিময়</span>
              </div>
            </div>
            <button
              onClick={() => navigate('/cart')}
              className="relative w-10 h-10 flex items-center justify-center rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-foreground" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center animate-bounce-in">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
      </header>

      <main className="px-4 py-4 max-w-7xl mx-auto space-y-5">
        {/* Banner & Categories - Desktop Layout */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-6 space-y-5 lg:space-y-0">
          {/* Banner */}
          <div>
            <Banner />
          </div>

          {/* Categories */}
          <section>
            <div className="overflow-x-auto lg:overflow-x-visible hide-scrollbar">
              <div className="flex gap-2 lg:grid lg:grid-cols-4 xl:grid-cols-5 lg:gap-3">
                {categoriesLoading ? (
                  // Category Skeleton loading
                  Array.from({ length: 8 }).map((_, index) => (
                    <CategorySkeleton key={index} />
                  ))
                ) : (
                  <>
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="flex-shrink-0 flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 hover:scale-105"
                    >
                      <ShoppingBag className="w-6 h-6 mb-1 text-muted-foreground" />
                      <span className="text-xs font-medium whitespace-nowrap text-foreground">সব</span>
                    </button>
                    {categories.map((category) => (
                      <CategoryCard
                        key={category.id}
                        category={category}
                        isSelected={selectedCategory === category.id}
                        onClick={() => setSelectedCategory(category.id)}
                      />
                    ))}
                  </>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* Products Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-foreground">
            সব পণ্য ({filteredProducts.length})
          </h2>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-36 h-9 bg-card border-border">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              <SelectValue placeholder="সর্ট করুন" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">ডিফল্ট</SelectItem>
              <SelectItem value="price-low">দাম: কম থেকে বেশি</SelectItem>
              <SelectItem value="price-high">দাম: বেশি থেকে কম</SelectItem>
              <SelectItem value="rating">রেটিং</SelectItem>
              <SelectItem value="newest">নতুন</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid - Responsive */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {isLoading ? (
            // Skeleton loading
            Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))
          ) : (
            filteredProducts.map((product, index) => (
              <div
                key={product.id}
                style={{ animationDelay: `${index * 50}ms` }}
                className="animate-slide-up"
              >
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>

        {!isLoading && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">কোনো পণ্য পাওয়া যায়নি</p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Index;
