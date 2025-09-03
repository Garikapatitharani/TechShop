import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Navigation from './routing/Navigation';
import { ProductsProvider } from './contextAPI/ProductsContext'; 

export default function App() {
  return (
    <ProductsProvider>
      <div>
        <Header/>
        <Navigation/>
        <Footer/>
      </div>
    </ProductsProvider>
  );
}