export type ProductType = {
    _id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    quantity: number;
    category:string;
    __v:number;
  };

  const URL = 'http://localhost:8000'
  
// Define a type for the cart item (adjust according to your API response structure)
interface CartItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}

export const fetchUserCartFromDatabase = async (userId: string): Promise<CartItem[]> => {
  try {
    const response = await fetch(`${URL}/cart/${userId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error('Error fetching user cart:', error);
    throw new Error('Failed to fetch user cart data');
  }
};


  export const getAllProducts = async (): Promise<ProductType[]> => {
    try {
      const response = await fetch(`${URL}/products`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data: ProductType[] = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return []; 
    }
  };
  export const getProductById = async (id: string): Promise<ProductType> => {
    try {
      const response = await fetch(`${URL}/products/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      const data: ProductType = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error; 
    }
  };
  