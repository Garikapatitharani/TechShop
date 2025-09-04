import React from "react";

export default function Login({ setShowLogin, setShowSignup }) {
  return (
    <div>
      <div class=" bg-black xs:p-0 mx-auto md:w-full md:max-w-md">
        <div class="shadow w-full rounded-lg divide-y divide-gray-200">
          <div class=" px-2 py-4 w-full">
            <h1 className="font-bold text-white">Login</h1><br />
            <p className="text-white ">
              <span>New to Tech-Shop?</span>
              <button
                className="text-white font-semibold px-2 hover:text "
                onClick={() => {
                  setShowLogin(false);
                  setShowSignup(true);
                }}
              >
                Create an Account
              </button>
            </p>
            <br />
            <input type="text" placeholder="Email" class="border text-white rounded-lg px-3 py-2 mt-1 text-sm w-full" />
            <input type="text" placeholder="Password" class="border text-white rounded-lg px-3 py-2 mt-3 mb-1 text-sm w-full" />

            <button type="button" class="focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm font-semibold text-center inline-block">
              <span class="inline-block w-full bg-red-500 mr-2 p-2 rounded cursor-pointer ">Login</span>
            </button>

            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-500"></div>
              <span className="px-4 text-white text-sm">or login with</span>
              <div className="flex-grow border-t border-gray-500"></div>
            </div>

            <div class="grid grid-cols-3 gap-2 py-2 px-2 text-white">
              <button className="bg-blue-700">Facebook</button>
              <button className="bg-red-600">Google</button>
              <button className="bg-blue-500">Twitter</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}