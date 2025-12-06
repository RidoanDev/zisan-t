import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { PWAInstallProvider } from "@/context/PWAInstallContext";
import ScrollToTop from "@/components/ScrollToTop";
import ExternalBrowserDetector from "@/components/ExternalBrowserDetector";
import InstallPopup from "@/components/InstallPopup";
import useContentProtection from "@/hooks/useContentProtection";
import Index from "./pages/Index";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Seller from "./pages/Seller";
import AddProduct from "./pages/AddProduct";
import Contact from "./pages/Contact";
import Order from "./pages/Order";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  useContentProtection();
  
  return (
    <>
      <ExternalBrowserDetector />
      <InstallPopup />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/seller" element={<Seller />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/order" element={<Order />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <PWAInstallProvider>
        <CartProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </CartProvider>
      </PWAInstallProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
