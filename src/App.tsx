import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import PortfolioSection from './PortfolioSection';
import FooterSection from './FooterSection';
import CategoryPage from './CategoryPage';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-ark-purple to-ark-purple-light text-white font-sans overflow-x-hidden">
      <Navbar />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <FeaturesSection />
                <PortfolioSection />
              </>
            }
          />
          <Route path="/categorie/:slug" element={<CategoryPage />} />
        </Routes>
        <FooterSection />
      </main>
    </div>
  );
}

export default App;
