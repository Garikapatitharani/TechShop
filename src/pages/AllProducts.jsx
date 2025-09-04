import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import productsData from "../contextAPI/ProductsData.js";
import { addToCart } from "../rtk-store/cartSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

export default function AllProducts() {
  const dispatch = useDispatch()

  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [price, setPrice] = useState(15000);

  const handleCheckbox = (value, type) => {
    if (type === "brand") {
      setSelectedBrand((prev) =>
        prev.includes(value) ? prev.filter((b) => b !== value) : [...prev, value]
      );
    } else if (type === "category") {
      setSelectedCategory((prev) =>
        prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
      );
    }
  };

  const filteredProducts = productsData.filter((p) => {
    const brandMatch =
      selectedBrand.length === 0 || selectedBrand.includes(p.brand);
    const categoryMatch =
      selectedCategory.length === 0 || selectedCategory.includes(p.category);
    const priceMatch = p.finalPrice <= price;

    return brandMatch && categoryMatch && priceMatch;
  });

  // Sorting products
  const [sortOption, setSortOption] = useState("Latest");

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "PriceLow":
        return a.finalPrice - b.finalPrice;
      case "PriceHigh":
        return b.finalPrice - a.finalPrice;
      case "TopRated":
        return b.ratings - a.ratings;
      case "Featured":
        return b.featured === true ? -1 : 1;
      case "Latest":
      default:
        return b.id - a.id;
    }
  });

  return (
    <div className="bg-black min-h-screen p-6 flex">
      {/* ===== Left Sidebar ===== */}
      <div className="w-64 bg-[#111] text-white p-4 rounded-lg mr-6">

        <div className="pt-4">
          <h2 className="font-bold mb-2">Sort By</h2>
          <hr className="mb-2" />
          <ul className="space-y-1 text-gray-300">
            <li
              className={`cursor-pointer hover:text-red-500 ${sortOption === "Latest" ? "text-red-500" : ""}`}
              onClick={() => setSortOption("Latest")}
            >
              Latest
            </li>
            <li
              className={`cursor-pointer hover:text-red-500 ${sortOption === "Featured" ? "text-red-500" : ""}`}
              onClick={() => setSortOption("Featured")}
            >
              Featured
            </li>
            <li
              className={`cursor-pointer hover:text-red-500 ${sortOption === "TopRated" ? "text-red-500" : ""}`}
              onClick={() => setSortOption("TopRated")}
            >
              Top Rated
            </li>
            <li
              className={`cursor-pointer hover:text-red-500 ${sortOption === "PriceLow" ? "text-red-500" : ""}`}
              onClick={() => setSortOption("PriceLow")}
            >
              Price (Lowest First)
            </li>
            <li
              className={`cursor-pointer hover:text-red-500 ${sortOption === "PriceHigh" ? "text-red-500" : ""}`}
              onClick={() => setSortOption("PriceHigh")}
            >
              Price (Highest First)
            </li>
          </ul>
        </div>



        <h2 className="text-xl pt-4 font-semibold mb-4">Filter By</h2>
        <hr />
        {/* Brand Filter */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Brands</h3>
          <div className="flex flex-col gap-2">
            {["JBL", "boAt", "Sony"].map((brand) => (
              <label key={brand}
                className="items-center gap-4 mb-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="accent-red-500"
                  checked={selectedBrand.includes(brand)}
                  onChange={() => handleCheckbox(brand, "brand")}
                />
                <span>{brand}</span>
              </label>
            ))}
          </div>
        </div>


        {/* Category Filter */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Category</h3>
          <div className="flex flex-col gap-2">

            {["Headphones", "Earbuds", "Earphones", "Neckbands"].map((cat) => (
              <label key={cat}
                className="flex items-center gap-4 mb-2 cursor-pointer ">
                <input
                  type="checkbox"
                  className="accent-red-500"
                  checked={selectedCategory.includes(cat)}
                  onChange={() => handleCheckbox(cat, "category")}
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>
        </div>


        {/* Price Filter */}
        <div>
          <h3 className="font-semibold mb-2">Price</h3>
          <input
            type="range"
            min="500"
            max="20000"
            step="500"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full accent-red-500"
          />
          <p className="mt-2">Up to ₹{price}</p>
        </div>
      </div>



      {/* Products */}
      <div >
        <h1 className="text-white text-center text-2xl mb-6">All Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="border rounded-lg p-4 shadow-lg hover:shadow-xl"  >
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-3/4 h-40 object-cover rounded-md 
                transform transition-transform duration-300 hover:scale-75 "
              />
              <h2 className="text-lg text-white font-semibold mt-2">
                {product.title}
              </h2>
              <p className="text-white">{product.info}</p>
              <p className="font-bold text-white">₹{product.finalPrice}</p>
              <p className="line-through text-white text-sm">
                ₹{product.originalPrice}
              </p>

              <div className="flex items-center gap-1 mt-2">
                {Array.from({ length: Math.round(product.rateCount || 0) }).map(
                  (_, i) => (
                    <FaStar key={i} style={{ color: "red" }} />
                  )
                )}
                <span className="text-sm text-gray-400">
                  ({product.rateCount})
                </span>
              </div>
              <button className="bg-red-500 text-white p-2 mt-2 " onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
