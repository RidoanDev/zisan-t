import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <Toaster 
      position="top-left"
      expand={true}
      toastOptions={{
        className: 'rounded-2xl shadow-lg',
        style: {
          background: 'hsl(135, 75%, 32%)',
          color: 'white',
          border: 'none',
          fontSize: '0.875rem',
          padding: '0.875rem 1.25rem',
          minWidth: '280px',
          maxWidth: '420px',
        },
      }}
    />
  </>
);
