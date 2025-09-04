import React from "react";

export default function Signup({ setShowSignup, setShowLogin }) {
  return (
    <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center px-2">
      <div class="bg-black px-6 py-4 rounded shadow-md text-black w-full">
        <h1 class="mb-8 text-xl text-white ">Sign up</h1>
        <p className="text-white">
          <span>Already have an account?</span>
          <button
            className="px-1 text-white font-semibold"
            onClick={() => {
              setShowSignup(false);
              setShowLogin(true);
            }}
          >
            Login
          </button>
        </p>
        <input
          type="text"
          class="block border border-grey-light w-full p-2 text-white rounded mb-4"
          name="fullname"
          placeholder="Full Name" />

        <input
          type="text"
          class="block border border-grey-light w-full p-2 text-white rounded mb-4"
          name="email"
          placeholder="Email" />

        <input
          type="password"
          class="block border border-grey-light w-full p-2 text-white rounded mb-4"
          name="password"
          placeholder="Password" />
        <input
          type="password"
          class="block border border-grey-light w-full text-white p-2 rounded mb-4"
          name="confirm_password"
          placeholder="Confirm Password" />

        <button
          type="submit"
          class="w-full text-center p-2 rounded text-white bg-red-500 cursor-pointer focus:outline-none my-1"
        >Signup
        </button>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-500"></div>
          <span className="px-4 text-white text-sm">or login with</span>
          <div className="flex-grow border-t border-gray-500"></div>
        </div>

        <div class="text-center text-sm text-white mt-3">
          By signing up, you agree to the
          <a class="no-underline border-b border-grey-dark text-grey-dark" href="#">
            Terms of Service
          </a> and
          <a class="no-underline border-b border-grey-dark text-grey-dark" href="#">
            Privacy Policy
          </a>
        </div>
      </div>


    </div>
  )
}