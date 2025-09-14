import React, { useContext } from "react";
import productsData from'../contextAPI/ProductsData.js'
import ProductCard from "../components/Card";

export default function EarBuds(){
   const earbuds = productsData.filter(
    (item) => item.category === "Earbuds"
  );
    
  return(
    <>
      <div className="grid grid-cols-1 bg-black sm:grid-cols-2 md:grid-cols-4 gap-6 mt-12 p-6">
        {earbuds.map((item)=>(
           <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </>
  );
}

