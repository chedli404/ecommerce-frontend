// filepath: c:\Users\chedli frini\Desktop\full e-commerce\ecommerce\src\pages\Products.tsx
import { ProductType } from "../types/productTypes";
import { useEffect, useState } from "react";
import Product from "../components/Product";
import { getProducts } from "../api/product";
import Sidebar from "../components/SideBar";
import { Category } from "../types/categories";
import Spinner from "../components/Spinner";


const Products = () => {
  const [category, setCategory] = useState<Category>(Category.ALL);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchProducts() {
      const data = await getProducts();
      setProducts(data);
      setFilteredProducts(data);
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    category === Category.ALL
      ? setFilteredProducts(products)
      : setFilteredProducts(products.filter(product => product.category === category));
  }, [category, products]);
 
  useEffect(() => {
    const loadProducts = async () => {
        try {
            const data = await getProducts(); // Fetch products from the API
            setProducts(data);
        } catch (err) {
            console.error('Failed to fetch products:', err);
        } finally {
            setLoading(false); // Stop the spinner once data is fetched
        }
    };

    loadProducts();
}, []);

 
    
  if (loading) {
    return (
    <div className="spinner-container">
      <Spinner/>
    </div>
    )
  }

  return (
    <div className="products-page">
      <Sidebar category={category} setCategory={setCategory} />
      <div className="product-grid">
        {filteredProducts.map((product: ProductType) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
