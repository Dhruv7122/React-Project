import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import React, { useContext } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { ProductType } from "../Service/product";
import { useDispatch } from "react-redux";
import { addItem } from "../Store/cartSlice";
import { AuthContext } from "../Context/authContext";

export const ProductCard = ({ product }: { product: ProductType }) => {
  const { isLoggedIn, setIsLoggedIn, cartLength, setCartlength } =
    useContext(AuthContext);
  const dispatch = useDispatch();
  const handleAddToCart = async () => {
    const id = product._id;
    const name = product.name;
    const price = product.price;
    const quantity = 1;
    const image = product.image;

    const userId = localStorage.getItem("userData") || null;
    dispatch(
      addItem({
        id,
        name,
        price,
        quantity,
        image,
        userId,
      })
    );

    console.log(userId,id,quantity);
    if (userId) {
      try {
        const response = await fetch('http://localhost:8000/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            productId: id.toString(),
            quantity,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to add item to cart on server');
        }

        const data = await response.json();
        console.log('Item added to cart on server:', data);
      } catch (error) {
        console.error('Error adding item to cart on server:', error);
      }
    }
    
    setCartlength(JSON.parse(localStorage.getItem("cartState") || "")?.length);
  };

  return (
    <div className="flex flex-col shadow-xl	rounded-lg p-3">
      <Link to={`/products/${product._id}`} className="group relative block">
        <div key={product._id} className="block">
          <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
            <img
              src={product.image}
              alt={product.name}
              className="h-[40rem] sm:h-80 w-full object-cover transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </Link>

      <div className="flex justify-between items-center mt-4 text-black">
        <div className="flex flex-col items-start">
          <h3 className="text-xl">{product.name}</h3>
          <p className="mt-1 text-lg font-medium">${product.price}</p>
        </div>
        <FontAwesomeIcon
          onClick={handleAddToCart}
          icon={faShoppingCart}
          className="ml-2 text-2xl text-gray-700 hover:text-gray-900 cursor-pointer"
        />
      </div>
    </div>
  );
};
