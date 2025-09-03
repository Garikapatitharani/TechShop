import React, { useContext } from "react";
import productsData from'../contextAPI/ProductsData.js'
import ProductCard from "../components/Card";

export default function EarPhones(){
   const earphones = productsData.filter(
    (item) => item.category === "Earphones"
  );
    
  return(
    <>
      <div className="grid grid-cols-1 bg-black sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
        {earphones.map((item)=>(
           <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </>
  );
}


