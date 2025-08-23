
import React from 'react';
import { ToastProvider } from './hooks/useToast';
import Header from './components/Header';
import Hero from './components/Hero';
import CoreValues from './components/CoreValues';
import Examples from './components/Examples';
import Footer from './components/Footer';

function App(): React.ReactNode {
  return (
    <ToastProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main id="top">
          <Hero />
          <CoreValues />
          <Examples />
        </main>
        <Footer />
      </div>
    </ToastProvider>
  );
}

export default App;
