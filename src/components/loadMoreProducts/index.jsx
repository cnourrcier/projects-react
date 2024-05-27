import { useEffect, useRef, useState } from 'react';
import './styles.css';

export default function LoadMoreData({ url, limit }) {
    // State variables for managing product data, loading status, error messages, and pagination
    const [count, setCount] = useState(0);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasMoreProducts, setHasMoreProducts] = useState(true);

    // References to handle and scroll position
    const scrollRef = useRef(null);
    const previousScrollPosition = useRef(0);

    // Fetches products from the API and updates the state
    async function fetchProducts() {
        try {
            // Save the current scroll position before loading new data
            if (scrollRef.current) {
                previousScrollPosition.current = scrollRef.current.scrollTop;
            }

            // Set loading state to true and clear any previous errors
            setLoading(true);
            setError(null);

            // Fetch data from the API with the given limit and offset
            const res = await fetch(`${url}?limit=${limit}&skip=${count * limit}`);

            // Throw an error if the response is not ok
            if (!res.ok) {
                throw new Error('Error occured. please try again.');
            }

            // Parse the JSON response
            const data = await res.json();

            // Append new products to the existing list
            setProducts((prevData) => [...prevData, ...data.products]);

            // Check if there are more products to load
            if (data.products.length < limit) {
                setHasMoreProducts(false);
            }
        } catch (err) {
            // Set error message in case of a fetch failure
            setError(err.message);
        } finally {
            // Set loading state to false and restore the scroll position
            setLoading(false);
            if (scrollRef.current) {
                scrollRef.current.scrollTop = previousScrollPosition.current;
            }
        }
    }

    // Effect to fetch products when the component mounts or when the count/url changes
    useEffect(() => {
        fetchProducts();
    }, [count, url]);

    // Effect to restore the scroll position after products are updated
    useEffect(() => {
        if (scrollRef.current && !loading) {
            scrollRef.current.scrollTop = previousScrollPosition.current;
        };
    }, [products, loading]);

    // Conditional rendering for loading and error states
    if (loading && products.length === 0) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='load-more-products-container'>
            <h1 className='load-more-products-header'>Load More Products</h1>
            <div
                className='products-container'
            >
                {
                    products?.length
                    && products.map(product => (
                        <div
                            key={product.id}
                            className='product'>
                            <p>{product.id}</p>
                            <img
                                src={product.thumbnail}
                                alt={product.title}
                            />
                            <p>{product.title}</p>
                        </div>
                    ))
                }
            </div>
            {!hasMoreProducts && <p>No more products to load</p>}
            <button
                disabled={!hasMoreProducts}
                className={hasMoreProducts
                    ? 'button'
                    : 'button disabled'
                }
                onClick={() => setCount(count + 1)}
            >
                Load More Products
            </button>
        </div>
    )
}