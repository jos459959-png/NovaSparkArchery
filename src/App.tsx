import Navigation from './components/Navigation';
import ChatWidget from './components/ChatWidget';
import Hero from './sections/Hero';
import About from './sections/About';
import Categories from './sections/Categories';
import InstagramFeed from './sections/InstagramFeed';
import Footer from './sections/Footer';
import './App.css';

function App() {
  return (
    <div className="relative min-h-screen bg-black">
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <Categories />
        <InstagramFeed />
        <Footer />
      </main>
      
      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
}

export default App;
