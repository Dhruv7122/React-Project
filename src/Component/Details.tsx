import React, { useContext } from 'react'
import { ProductType } from '../Service/product'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { addItem } from '../Store/cartSlice';
import { AuthContext } from '../Context/authContext';

export const Details = ({product}:{product:ProductType}) => {
    const { isLoggedIn, setIsLoggedIn,cartLength,setCartlength } = useContext(AuthContext);

    const dispatch = useDispatch();
    const handleAddToCart = () => {
      const id =product._id;
      const name = product.name;
      const price = product.price;
      const quantity = 1;
      const image = product.image
  
      const userId = localStorage.getItem('userData') || null;
      dispatch(addItem({
        id, name, price, quantity, image, userId
      }));
      setCartlength(JSON.parse(localStorage.getItem('cartState')||'')?.length)

  
    };
  return (
    <section className="text-gray-600 body-font overflow-hidden">
    <div className="container px-5 py-24 mx-auto">
      <div className="lg:w-4/5 mx-auto flex flex-wrap">
        <img
          alt="ecommerce"
          className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
          src={product?.image}
          srcSet={`${product?.image} 400w, ${product?.image} 800w, ${product?.image} 1200w, ${product?.image} 1600w`}
          sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 25vw"
        />

        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
            {product?.name}
          </h1>

          <p className="leading-relaxed">
              {product?.description}
            Fam locavore kickstarter distillery. Mixtape chillwave tumeric
            sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo
            juiceramps cornhole raw denim forage brooklyn. Everyday carry +1
            seitan poutine tumeric. Gastropub blue bottle austin listicle
            pour-over, neutra jean shorts keytar banjo tattooed umami
            cardigan.
          </p>
          <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
            
            <div className="flex ml-6 items-center">
              <div className="relative">
                
                
              </div>
            </div>
          </div>
          <div className="flex">
            <span className="title-font font-medium text-2xl text-gray-900">
              ${product?.price}
            </span>
            <button
            onClick={handleAddToCart}
              className="flex ml-auto text-white bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-900 rounded"
            >
              Add To cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}
