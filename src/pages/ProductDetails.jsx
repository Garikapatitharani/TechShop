import { useParams } from "react-router-dom";
import { useProducts } from "../contextAPI/ProductsContext";
import {  FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../rtk-store/cartSlice";
import { useEffect, useState } from "react";
import { FaRegCircleUser } from 'react-icons/fa6'
import { Link } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();
  const { products } = useProducts();
  const product = products.find((item) => item.id.toString() === id);
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("Specifications");

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  useEffect(()=>{
    if(product){
      setSelectedImage(product.images[0]);
    }
  },[product]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]); 

  if (!product) {
    return <h1 className="text-center text-red-500">Product not found</h1>;
  }

  const discount = product.originalPrice - product.finalPrice;
  const percentage = Math.round((discount / product.originalPrice) * 100);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <>
      {/* Product Section */}
      <div className="p-6 mt-10 flex bg-black gap-8">
        {/* Product Images */}
        <div className="w-1/2 flex gap-4">
          <div className="flex flex-col gap-4">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index}`}
                onClick={() => setSelectedImage(img)}
                className={`w-24 h-24 object-contain border m-4 cursor-pointer p-1
                ${selectedImage === img ? "border-red-500" : "border"}`}
              />
            ))}
          </div>
          <div className="flex-1">
            <img
              src={selectedImage}
              alt={product.title}
              className="w-full h-full rounded"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="text-white my-4 w-2/4 px-30">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-lg">{product.info}</p>
          <div className="flex items-center gap-1 mt-2">
            {Array.from({ length: Math.round(product.rateCount || 0) }).map((_, i) => (
              <FaStar key={i} style={{ color: "red" }} />
            ))}
            <span className="text-sm text-gray-400"> | {product.ratings} Ratings</span>
          </div>
          <hr />
          <div className="my-4">
            <h3 className="text-green-600 text-2xl font-semibold mt-2">
              ₹{product.finalPrice}
              <span className="line-through text-lg text-gray-400 p-4">₹{product.originalPrice}</span>
            </h3>
          </div>
          <p className="text-green-400 text-lg">
            You save: ₹{discount}
            <span className="text-green-400 text-lg font-semibold">
              {" "}
              ({percentage}%)
            </span>
            <span className="mx-20 bg-green-500 text-white rounded p-2 cursor-pointer">
              ✔ In Stock
            </span>
          </p>
          <p className="text-gray-400">(inclusive of all taxes)</p>
          <hr />
          <div className="mt-4 my-8 text-gray-500">
            <p className="text-gray-300 font-bold my-4">Offers and Discounts</p>
            <span className="mt-6 border p-2 text-gray-500"> No Cost EMI on Credit Card </span>
            <span className="border p-2 m-4 text-gray-500 "> Pay Later & Avail Cashback</span>
          </div>
          <hr />
          <button
            onClick={handleAddToCart}
            className={`px-6 py-2 my-4 rounded-lg transition-colors ${added
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-red-500 text-white "
              }`}
          >
            {added ? "Added" : "Add to Cart"}
          </button>
        </div>
      </div>



      {/* Specifications, Overview, Reviews */}
      <div className="bg-black flex flex-col items-center justify-center text-white p-6">
        <ul className="flex gap-8 mb-6">
          {["Specifications", "Overview", "Reviews"].map((tab) => (
            <li
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer rounded p-2 transition ${activeTab === tab ? "bg-red-600" : "hover:bg-red-500"
                }`} >{tab}
            </li>
          ))}
        </ul>

        <div className="bg-black rounded-lg w-full px-0 max-w-8xl p-6">
          {activeTab === "Specifications" && (
            <div>
              <ul className="space-y-3">
                {[
                  { label: "Brand", value: product.brand },
                  { label: "Model", value: product.title },
                  { label: "Generic Name", value: product.info },
                  { label: "Headphone Type", value: product.type },
                  { label: "Connectivity", value: product.connectivity },
                  { label: "Microphone", value: product.microphone ? "Yes" : "No" },
                ].map((spec, index) => (
                  <li key={index} className="flex">
                    <span className="font-semibold w-40 text-gray-500">{spec.label}</span>
                    <span className="text-white">{spec.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>


        {activeTab === "Overview" && (
          <div>
            <p>The <span className="text-xl font-bold text-red-500">{product.title}</span> Headphones provide with fabulous sound quality</p>
            <li className="text-gray-400">Sound Tuned to Perfection</li>
            <li className="text-gray-400">Comfortable to wear</li>
            <li className="text-gray-400">Long Hours Playback Time</li>
            <br></br>
            <p className="text-gray-500">
              Buy <span className="text-white">{product.title}</span> Which offers you with fabulous music experience by providing you with awesome sound
              quality that you can never move on from. Enjoy perfect flexibility and mobility with amazing musical quality with these
              Headphones giving you a truly awesome audio experience. It blends with expectional sound quality and a range of smart features for an unrivalled listening experience.
            </p>
          </div>
        )}

        {activeTab === "Reviews" && (
          <div className="bg-black rounded-lg w-[1400px] p-4">
            {[
              {
                id: 1,
                name: "Atharva Kumar",
                date: "4 Aug 2022",
                rating: 5,
                review: "Sound is Awesome and as I expected, love it.",
              },
              {
                id: 2,
                name: "Ritika Sen",
                date: "15 July 2022",
                rating: 4,
                review: "Very good and awesome product",
              },
              {
                id: 3,
                name: "Bhavesh Joshi",
                date: "10 June 2022",
                rating: 4,
                review: "Super amazing product!!!",
              },
              {
                id: 4,
                name: "Anandi Gupta",
                date: "17 June 2022",
                rating: 5,
                review: "Nice sound",
              },
              {
                id: 5,
                name: "Arif Khan",
                date: "27 April 2022",
                rating: 4,
                review: "Great sound is a bit flat.",
              },
              {
                id: 6,
                name: "Salmon Raj",
                date: "2 April 2022",
                rating: 3,
                review: "Very Good but still has flaws.",
              },

            ].map((r) => (
              <div
                key={r.id} className="flex space-x-4 mb-4" >
                <div className="w-10 h-10 rounded-full flex items-center bg-white text-gray-500 justify-center">
                  <FaRegCircleUser size={35} />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h5>{r.name}</h5>
                  </div>

                  <div className="flex text-red-500">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i}
                        className={i < r.rating ? "text-red-500" : "text-gray-500"} />
                    ))}
                    <span className="text-sm text-gray-400 px-1"> | {r.date}</span>
                  </div>

                  <p className="text-gray-300 mt-1">{r.review}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>


      {/* Related Products */}
      <div className="bg-black text-white p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Related Products</h2>

        <div className="grid grid-cols-4 gap-6">
          {products
            .filter((p) => p.category === product.category && p.id !== product.id)
            .map((related) => (
              <Link
                key={related.id}
                to={`/product/${related.id}`}
                className="border border-gray-700 rounded-lg p-4 hover:shadow-lg transition"
              >
                <img
                  src={related.images[0]}
                  alt={related.title}
                  className="w-full h-40 object-contain"
                />
                <h3 className="text-lg text-white font-semibold mt-2">{related.title}</h3>
                <p className="text-gray-400">{related.info}</p>
                <hr />
                <p className="text-white font-bold text-2xl mt-1">₹{related.finalPrice}
                  <span className="text-gray-500 text-xl p-3 line-through">₹{related.originalPrice}</span> </p>
                <button className="bg-red-500 text-white py-2 w-70 " onClick={(e) => { e.preventDefault(); dispatch(addToCart(related)) }}>Add to Cart</button>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
}
