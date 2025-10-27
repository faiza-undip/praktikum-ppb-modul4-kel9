// src/main.jsx
import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import SplashScreen from "./pages/SplashScreen";
import HomePage from "./pages/HomePage";
import MakananPage from "./pages/MakananPage";
import MinumanPage from "./pages/MinumanPage";
import ProfilePage from "./pages/ProfilePage";
import FavoritePage from "./pages/FavoritePage"; // ✅ tambahkan ini
import DesktopNavbar from "./components/navbar/DesktopNavbar";
import MobileNavbar from "./components/navbar/MobileNavbar";
import "./index.css";
import PWABadge from "./PWABadge";
import RecipeDetailPage from "./pages/RecipeDetailPage";

function AppRoot() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [detailInfo, setDetailInfo] = useState(null); // { type, id }

  const handleSplashComplete = () => setShowSplash(false);
  const handleNavigation = (page) => setCurrentPage(page);

  const onSelectMakanan = (id) => {
    setDetailInfo({ type: "makanan", id });
    setCurrentPage("detail");
  };

  const onSelectMinuman = (id) => {
    setDetailInfo({ type: "minuman", id });
    setCurrentPage("detail");
  };

  const onSeeAllMakanan = () => setCurrentPage("makanan");
  const onSeeAllMinuman = () => setCurrentPage("minuman");

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <HomePage
            onSelectMakanan={onSelectMakanan}
            onSelectMinuman={onSelectMinuman}
            onSeeAllMakanan={onSeeAllMakanan}
            onSeeAllMinuman={onSeeAllMinuman}
          />
        );
      case "makanan":
        return <MakananPage onSelectRecipe={onSelectMakanan} />;
      case "minuman":
        return <MinumanPage onSelectRecipe={onSelectMinuman} />;
      case "favorites": // ✅ halaman baru favorit
        return <FavoritePage onSelectRecipe={onSelectMakanan} />;
      case "profile":
        return <ProfilePage />;
      case "detail":
        return (
          <RecipeDetailPage
            type={detailInfo?.type}
            id={detailInfo?.id}
            onBack={() => setCurrentPage("home")}
          />
        );
      default:
        return <HomePage />;
    }
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Navbar */}
      <DesktopNavbar currentPage={currentPage} onNavigate={handleNavigation} />

      {/* Main Content */}
      <main className="min-h-screen">{renderCurrentPage()}</main>

      {/* Mobile Navbar */}
      <MobileNavbar currentPage={currentPage} onNavigate={handleNavigation} />

      <PWABadge />
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppRoot />
  </StrictMode>
);
