import React, { useContext } from "react";
import productsData from'../contextAPI/ProductsData.js'
import ProductCard from "../components/Card";


export default function HeadPhones(){
   const headphones = productsData.filter(
    (item) => item.category === "Headphones"
  );

  return(
    <>
      <div className="grid grid-cols-1 bg-black sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
        {headphones.map((item)=>(
           <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </>
  );
}


