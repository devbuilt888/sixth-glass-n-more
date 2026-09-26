import { Suspense, useLayoutEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './i18n/Language';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Next from './pages/Next';

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <LanguageProvider>
      <ScrollManager />
      <Nav />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/next" element={<Next />} />
        </Routes>
      </Suspense>
      <Footer />
    </LanguageProvider>
  );
}
