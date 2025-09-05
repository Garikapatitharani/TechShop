import { useParams } from "react-router-dom";
import { useProducts } from "../contextAPI/ProductsContext";
import { FaStar } from "react-icons/fa";
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
  useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

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
      <div className="p-4 md:p-6 mt-6 flex flex-col lg:flex-row  bg-black gap-6 lg:gap-8">
        {/* Product Images */}
        <div className="w-full lg:w-1/2 flex flex-col sm:flex-row gap-4">
          <div className="flex sm:flex-col gap-2 sm:gap-4 overflow-x-auto sm:overflow-y-auto">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index}`}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 sm:w-24 sm:h-24 object-contain border cursor-pointer p-1 rounded transition
                ${selectedImage === img ? "border-red-500" : "border-gray-600"}`}
              />
            ))}
          </div>
          <div className="flex-1">
            <img
              src={selectedImage}
              alt={product.title}
              className="w-full h-auto max-h-[400px] sm:max-h-[500px] object-contain rounded"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full lg:w-1/2 text-white">
          <h1 className="text-2xl sm:text-3xl font-bold">{product.title}</h1>
          <p className="text-base sm:text-lg">{product.info}</p>

          <div className="flex items-center gap-1 mt-2">
            {Array.from({ length: Math.round(product.rateCount || 0) }).map((_, i) => (
              <FaStar key={i} className="text-red-500" />
            ))}
            <span className="text-sm text-gray-400"> | {product.ratings} Ratings</span>
          </div>
          <hr className="my-2" />
          <div className="my-4 border-gray-700">
            <h3 className="text-green-600 text-xl sm:text-2xl font-semibold">
              ₹{product.finalPrice}
              <span className="line-through text-lg text-gray-400 ml-2 sm:ml-4">₹{product.originalPrice}</span>
            </h3>
          </div>
          <p className="text-green-400 text-base sm:text-lg mt-2">
            You save: ₹{discount}  ({percentage}%)

            <span className="inline-block bg-green-500 text-white rounded px-2 sm:px-3 py-1 ml:2 sm:ml-4">
              ✔ In Stock
            </span>
          </p>
          <p className="text-gray-400">(inclusive of all taxes)</p>
          <hr className="my-4" />
          <div className="mt-2 mb-6 text-gray-500">
            <p className="text-gray-300 font-bold mb-2">Offers and Discounts</p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <span className="border p-2 text-gray-500"> No Cost EMI on Credit Card </span>
              <span className="border p-2 text-gray-500 "> Pay Later & Avail Cashback</span>
            </div>
          </div>
          <hr />
          <button
            onClick={handleAddToCart}
            className={`px-6 py-2 mt-2 sm:mt-6 w-full sm:w-2/3 md:w-1/2 rounded-lg transition-colors ${added ? "bg-green-600 text-white hover:bg-green-700" : "bg-red-500 text-white "
              }text-white`}
          >
            {added ? "Added" : "Add to Cart"}
          </button>
        </div>
      </div>



      {/* Specifications, Overview, Reviews */}
      <div className="bg-black flex flex-col items-center text-white p-4 sm:p-6">
        <ul className="flex flex-wrap gap-2 sm:gap-4 justify-center mb-4 sm:mb-6">
          {["Specifications", "Overview", "Reviews"].map((tab) => (
            <li
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer rounded px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base transition ${activeTab === tab ? "bg-red-600" : "hover:bg-red-500"
                }`}
            >
              {tab}
            </li>
          ))}
        </ul>

        <div className="bg-black rounded-lg w-full max-w-5xl p-4 sm:p-6">
          {activeTab === "Specifications" && (
            <div>
              <ul className="space-y-3 text-sm sm:text-base">
                {[
                  { label: "Brand", value: product.brand },
                  { label: "Model", value: product.title },
                  { label: "Generic Name", value: product.info },
                  { label: "Headphone Type", value: product.type },
                  { label: "Connectivity", value: product.connectivity },
                  { label: "Microphone", value: product.microphone ? "Yes" : "No" },
                ].map((spec, index) => (
                  <li key={index} className="flex flex-col sm:flex-row sm:items-center">
                    <span className="font-semibold w-full sm:w-40 text-gray-500">{spec.label}</span>
                    <span className="text-white">{spec.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>


        {activeTab === "Overview" && (
          <div>
            <p className="text-sm sm:text-base">The
              <span className="text-lg sm:text-xl font-bold text-red-500">{product.title}</span> Headphones provide with fabulous sound quality</p>
            <li className="text-gray-400">Sound Tuned to Perfection</li>
            <li className="text-gray-400">Comfortable to wear</li>
            <li className="text-gray-400">Long Hours Playback Time</li>
            <br></br>
            <p className="text-gray-500 mt-4 text-sm sm:text-base">
              Buy <span className="text-white">{product.title}</span> Which offers you with fabulous music experience by providing you with awesome sound
              quality that you can never move on from. Enjoy perfect flexibility and mobility with amazing musical quality with these
              Headphones giving you a truly awesome audio experience. It blends with expectional sound quality and a range of smart features for an unrivalled listening experience.
            </p>
          </div>
        )}

        {activeTab === "Reviews" && (
          <div className="bg-black rounded-lg w-full p-2 sm:p-4">
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
                key={r.id} className="flex space-x-3 sm:space-x-4 mb-3 sm:mb-4" >
                <div className="w-8 h-8 sm:w-10 h-10 rounded-full flex items-center bg-white text-gray-500 justify-center">
                  <FaRegCircleUser size={35} className="sm-size-35" />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h5 className="text-sm sm:text-base">{r.name}</h5>
                  </div>

                  <div className="flex text-red-500 text-xs sm:text-sm">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i}
                        className={i < r.rating ? "text-red-500" : "text-gray-500"} />
                    ))}
                    <span className=" text-gray-400 px-1"> | {r.date}</span>
                  </div>

                  <p className="text-gray-300 mt-1 text-sm sm:text-base">{r.review}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>


      {/* Related Products */}
      <div className="bg-black text-white p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">Related Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
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
                  className="w-full h-32 sm:h-40 object-contain"
                />
                <h3 className="text-base sm:text-lg font-semibold mt-2">{related.title}</h3>
                <p className="text-gray-400 text-sm sm:text-base">{related.info}</p>
                <hr />
                <p className="text-white font-bold text-2xl mt-1">₹{related.finalPrice}
                  <span className="text-gray-500 text-sm sm:text-xl ml-2 line-through">₹{related.originalPrice}</span> </p>
                <button
                  onClick={handleAddToCart}
                  className={`px-6 py-2 mt-2 sm:mt-6 w-full sm:w-2/3 md:w-1/2 rounded-lg transition-colors ${added ? "bg-green-600 text-white hover:bg-green-700" : "bg-red-500 text-white "
                    }text-white`}
                >
                  {added ? "Added" : "Add to Cart"}
                </button>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
}
