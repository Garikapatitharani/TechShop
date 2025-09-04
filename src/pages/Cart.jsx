import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../rtk-store/cartSlice";
import cart from '../assets/cart.png'
import { Link } from "react-router-dom";

import { IoTrashOutline } from "react-icons/io5";

function CartPage() {
  const { cartItems, discount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const totalOriginal = cartItems.reduce(
    (sum, item) => sum + item.originalPrice * item.quantity,
    0
  );

  const totalFinal = cartItems.reduce(
    (sum, item) => sum + item.finalPrice * item.quantity,
    0
  );

  const totalSavings = totalOriginal - totalFinal;

  const discountPercent = totalOriginal
    ? Math.round((totalSavings / totalOriginal) * 100)
    : 0;



  return (
    <div className="bg-black text-white min-h-screen mt-10 p-6">
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center">
          <img src={cart} alt="Empty cart" className="w-48 h-40 mt-40" />
          <h2 className="text-center text-xl font-semibold mt-4">Your cart is empty</h2>
          <Link to="/">
            <button className="bg-red-600 text-white px-6 my-2 py-2 rounded-lg font-semibold">
              Start Shopping
            </button>
          </Link>
        </div>
      ) : (

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* LEFT SIDE - Cart Items */}
          <div className="md:col-span-2 space-y-5">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className=" relative border-b border-gray-700 h-60 w-full justify-between items-center p-4 bg-gray-950 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-1/4 h-30 mt-4 object-contain rounded-md"
                  />
                  <div>
                    <h2 className="text-gray-500" >{item.info}
                      {/* <span> */}
                        <button
                          onClick={() => dispatch(removeFromCart(item.id))}
                          className="absolute top-7 right-6 "
                        >
                          <IoTrashOutline size={20} />
                        </button>
                      {/* </span> */}
                    </h2>
                    <p>
                      <span className="text-white font-bold">₹{item.finalPrice}</span>
                    <span className="line-through px-5 text-gray-500">
                      ₹{item.originalPrice}
                    </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 mt-2">
                    <button
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                      className="bg-gray-600 py-1 px-3"
                    >
                      -
                    </button>
                    <span className="text-red-500 bg-black px-3 ">{item.quantity}</span>
                    <button
                      onClick={() => dispatch(increaseQuantity(item.id))}
                      className="bg-gray-600 px-3 py-1"
                    >
                      +
                    </button>
                  </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE - Cart Summary */}
          <div className="bg-gray-950 p-6 rounded-lg h-fit">
            <h2 className="text-2xl font-bold mb-4">
              Order Summary ({cartItems.length} items)
            </h2>

            <p className="text-lg flex justify-between">
              <span>Original Price</span>
              <span className="font-semibold">₹{totalOriginal}</span>
            </p>

            <p className="flex justify-between">
              <span>Discount</span>
              <span className="text-green-500">- ₹{totalSavings}</span>
            </p>

            <p className="flex justify-between">
              <span>Delivery</span>
              <span className="text-green-500">Free</span>
            </p>

            <hr className="my-3" />

            <p className="flex justify-between text-lg font-bold">
              <span>Total Price</span>
              <span>₹{totalFinal}</span>
            </p>

             <Link to='/' className="text-white">
            <button className="mt-2 bg-red-600 w-full p-2">
              Checkout 
            </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
