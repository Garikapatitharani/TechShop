import { Link } from "react-router-dom";
import { FaStar, FaArrowRight, FaTags, FaTruck, FaShieldAlt, FaRegCreditCard } from "react-icons/fa";
import productsData from "../contextAPI/ProductsData.js";
import { addToCart } from "../rtk-store/cartSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";


export default function Home() {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);
 
  

  const featuredProducts = productsData.slice(0, 5);

  const chunkSize = 4;
  const slides = [];
  for (let i = 0; i < featuredProducts.length; i += chunkSize) {
    slides.push(featuredProducts.slice(i, i + chunkSize));
  }



  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setAdded(product.id);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <>
      <div id="carouselExampleIndicators" className="position-sticky carousel slide" data-bs-ride="carousel" data-bs-interval="2000">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>

        <div className="carousel-inner bg-black pt-6 min-h-[400px]">

          <div className="carousel-item active">
            <div className="flex flex-col md:flex-row items-center justify-between gap-10 h-[500px] container">
              <div className="text-section px-20 text-white max-w-md">
                <h5 className="text-sm">Sony WH-XB910N</h5>
                <h1 className="text-2xl font-bold">Give Your Favourite Music a Boost.</h1>
                <h6 className="mt-2 text-lg">₹9,999</h6>
                <p className="line-through text-gray-400">₹12,499</p>
                <Link to={`/product/7`}>
                <button className="bg-red-500 px-4 py-2 text-white rounded mt-3">Shop now</button>
             </Link>
              </div>
              <div className="image-section flex justify-center">
                <img src="/products/sonyXb910n-1.png" className="h-80 px-10" alt="sony" />
              </div>
            </div>
          </div>

          <div className="carousel-item">
            <div className="flex flex-col md:flex-row items-center justify-between gap-10 h-[500px] container">
              <div className="text-section px-20 text-white max-w-md">
                <h5 className="text-sm">JBL Live 660NC</h5>
                <h1 className="text-2xl font-bold">Keep The Noise Out, or In. You Choose.</h1>
                <h6 className="mt-2 text-lg">₹11,999</h6>
                <p className="line-through text-gray-400">₹13,099</p>
                <Link to={`/product/1`}>
                <button className="bg-red-500 px-4 text-white py-2 mt-3 rounded">Shop now</button>
                </Link>
              </div>
              <div className="image-section flex justify-center">
                <img src="/products/jbl500bt-2.png" className="h-80 px-10" alt="JBL" />
              </div>
            </div>
          </div>

          <div className="carousel-item">
            <div className="flex flex-col md:flex-row items-center justify-between gap-10 h-[500px] container">
              <div className="text-section px-20 text-white max-w-md">
                <h5 className="text-sm">boAt Airdopes 131</h5>
                <h1 className="text-2xl font-bold">Featherweight For Comfort All-Day</h1>
                <h6 className="mt-2 text-lg">₹1,099</h6>
                <p className="line-through text-gray-400">₹2,199</p>
                <Link to={`/product/3`}>
                <button className="bg-red-500 px-4 py-2 mt-3 text-white rounded">Shop now</button>
             </Link>
              </div>
              <div className="image-section flex justify-center">
                <img src="/products/boat131-3.png" className="h-80 px-10" alt="Airdopes" />
              </div>
            </div>
          </div>

        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>



      {/* pricing */}
      <div className="container bg-black">
        <h2 className="text-center text-white mb-4">Featured Products</h2>
        <div id="productCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {slides.map((group, index) => (
              <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
                <div className="row justify-content-center">
                  {group.map((product) => (
                    <div className="col-md-3 text-white text-center" key={product.id}>
                      <img src={product.heroImage} className="img-fluid mb-3" alt={product.title} style={{ height: "200px", objectFit: "contain" }} />
                      <h6 className="text-white">{product.title}</h6>
                      <p className="text-white fw-bold">{product.finalPrice}{""}
                        <span className="text-gray-500 p-2 text-decoration-line-through">{product.originalPrice}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Controls */}
          <button className="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon"></span>
          </button>

          {/* Indicators */}
          <div className="carousel-indicators">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#productCarousel"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
              ></button>
            ))}
          </div>
        </div>
      </div>




      {/* Products */}
      <div className="bg-black min-h-screen">
        <h1 className="bg-black text-white text-center mb-0 pt-8 pb-2">Top Products</h1>
        <ul className="flex text-white gap-6 mx-106 mt-4 ">
          <li><Link to='/all-products' className="hover:bg-red-500 text-white p-2 rounded no-underline" >All</Link></li>
          <li><Link to='/headphones' className="hover:bg-red-500 text-white no-underline rounded p-2">HeadPhones </Link></li>
          <li><Link to='/earbuds' className="hover:bg-red-500 text-white no-underline rounded p-2">Earbuds</Link></li>
          <li><Link to='/earphones' className="hover:bg-red-500 text-white no-underline rounded p-2">Earphones</Link></li>
          <li><Link to='/neckbands' className="hover:bg-red-500 text-white no-underline rounded p-2">Neckbands</Link></li>
        </ul>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-black">
          {/* First 11 products */}
          {productsData.slice(0, 11).map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="border rounded-lg p-4 shadow-lg hover:shadow-xl">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-40 object-cover rounded-md"
              />
              <h2 className="text-lg text-white font-semibold mt-2">{product.title}</h2>
              <p className="text-white">{product.info}</p>
              <p className="font-bold text-white">₹{product.finalPrice}</p>
              <p className="line-through text-white text-sm"> ₹{product.originalPrice}</p>
              <div className="flex items-center gap-1 mt-2">
                {Array.from({ length: Math.round(product.rateCount || 0) }).map(
                  (_, i) => (
                    <FaStar key={i} style={{ color: "red" }} />
                  ))}
                <span className="text-sm text-gray-400">  ({product.rateCount}) </span>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleAddToCart(product);
                }}
                className={`mt-6 px-6 py-2 mt-2 rounded transition-colors ${added === product.id
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-red-500 text-white"
                  }`}>
                {added === product.id ? "Added" : "Add to Cart"}
              </button>
            </Link>
          ))}

          <Link
            to="/all-products"
            className="border rounded-lg p-4 flex flex-col justify-center items-center 
                     bg-black text-white shadow-lg hover:shadow-xl">
            <h2 className="text-xl font-semibold mb-2">Browse All Products</h2>
            <button className="mt-4 px-4 py-2 size-6 text-white rounded-lg"><FaArrowRight /></button>
          </Link>

        </div>
      </div>




      {/* Advantages card */}

      <h1 className="bg-black text-white text-center mb-0 pt-4">Our Advantages</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 h-40 gap-6 bg-black " >
        <div className=" flex items-center gap-3 p-3 bg-black" >
          <i ><FaTruck size={28} className="text-red-500 " /></i>
          <div>
            <h5 className="text-white">Express Delivery</h5>
            <p className="text-gray-500">Ships in 24 Hours</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-black">
            <i class=" text-red-500"><FaShieldAlt size={28} /></i>
          <div>
          <h5 class=" text-white">Brand Warranty</h5>
          <p class="text-gray-500">100% Original products</p>
          </div>
        </div>
        <div className=" flex items-center gap-3 p-3 bg-black">
            <i className="text-red-500 "><FaTags size={28} /></i>
          <div>
          <h5 className=" text-white">Exciting Deals</h5>
          <p className="text-gray-500">On all prepaid orders</p>
        </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-black">
            <i className="text-red-500"><FaRegCreditCard size={28} /></i>
          <div>
          <h5 className="text-white">Secure Payments</h5>
          <p className="text-gray-500">SSL/Secure certificate </p>
        </div>
        </div>
      </div>
    </>
  );
}


