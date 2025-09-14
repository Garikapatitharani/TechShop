import React from "react";
import { useProducts } from "../contextAPI/ProductsContext.jsx";
import ProductCard from "../components/Card";

export default function NeckBands(){
  const { products } = useProducts();

   const neckbands = products.filter(
    (item) => item.category === "Neckbands"
  );
    
  return(
    <>
      <div className="grid grid-cols-1 bg-black sm:grid-cols-2 md:grid-cols-4 gap-6 mt-12 p-6">
        {neckbands.map((item)=>(
           <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </>
  );
}


