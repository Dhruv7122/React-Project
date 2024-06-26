// CashCheckout.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Cashout = () => {
  const history = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [formError, setFormError] = useState("");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate phone number
    if (!validatePhoneNumber(phone)) {
      setPhoneError("Please enter a valid phone number.");
      return;
    } else {
      setPhoneError("");
    }

    // Validate other fields (e.g., name, address)
    if (!name || !phone || !address) {
      setFormError("Please fill in all required fields.");
      return;
    } else {
      setFormError("");
    }

    // Handle form submission logic here
    // For simplicity, we'll just navigate back to the cart page after submission
    history("/cart"); // Redirect back to cart page after cash checkout
  };

  // Basic phone number validation function (change as per your requirements)
  const validatePhoneNumber = (phoneNumber: string) => {
    const phoneRegex = /^[0-9]{10}$/; // Example regex for 10-digit phone number
    return phoneRegex.test(phoneNumber);
  };

  return (
    <section className="py-24 relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
        <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">
          Checkout with Cash
        </h2>
        <form onSubmit={handleFormSubmit} className="max-w-lg mx-auto space-y-6">
          {formError && (
            <p className="text-red-500 text-sm">{formError}</p>
          )}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full p-4 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`mt-1 w-full p-4 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${phoneError ? 'border-red-500' : ''}`}
              required
            />
            {phoneError && (
              <p className="text-red-500 text-sm">{phoneError}</p>
            )}
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Delivery Address
            </label>
            <textarea
              id="address"
              name="address"
              rows={4}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 w-full p-4 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex items-center justify-center mt-6">
            <button
              type="submit"
              className="bg-indigo-600 text-white rounded-md px-6 py-3 font-medium hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
            >
              Confirm Cash Payment
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Cashout;
