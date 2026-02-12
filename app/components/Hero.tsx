"use client";

import axios from "axios";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const Hero = () => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setData(response.data);
      } catch (err) {
        setError("Failed to fetch products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-12">
      <h1 className="text-4xl font-semibold text-center mb-12">
        TagGo Frontend Task
      </h1>

      {error && <p className="text-red-400 text-center mb-6">{error}</p>}

      {loading ?
        <div className="flex flex-col items-center justify-center mt-20">
          <div className="w-14 h-14 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-400">Loading products...</p>
        </div>
      : 
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {data.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      }
    </div>
  );
};

export default Hero;



const ProductCard = ({ item }: { item: Product }) => {
  return (
    <div
      className="group bg-gray-900/70 backdrop-blur-md border border-gray-800 
      rounded-2xl p-5 transition-all duration-300 
      hover:shadow-2xl hover:shadow-black/40 hover:-translate-y-2"
    >
      <div className="h-44 flex items-center justify-center bg-white rounded-xl mb-4 p-4 overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="h-full object-contain group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      <span className="inline-block bg-indigo-600/20 text-indigo-400 text-xs px-3 py-1 rounded-full mb-3 capitalize">
        {item.category}
      </span>

      <h2 className="text-lg font-semibold mb-2 line-clamp-2">{item.title}</h2>

      <div className="flex items-center justify-between mt-auto">
        <p className="text-xl font-bold text-green-400">₹ {item.price}</p>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-yellow-400 text-sm">
            {"★".repeat(Math.round(item.rating.rate))}
          </span>
          <span className="text-gray-400 text-sm">({item.rating.count})</span>
        </div>
      </div>
    </div>
  );
};
