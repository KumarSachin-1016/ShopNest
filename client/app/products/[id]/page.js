"use client";

import { useEffect, useState } from "react";
import { api } from "../../../lib/api";
import Image from "next/image";

export default function ProductDetails({ params }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { id } = await params;

        const data = await api(`/products/${id}`);

        setProduct(data.product);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params]);

  if (loading) {
    return <p>Loading product...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
  <main className="w-full px-6 py-10">
    <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
      
      {/* Product Image */}
      <div className="relative h-96  overflow-hidden rounded-xl border bg-white">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-6"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Product Information */}
      <div className="flex flex-col justify-center">
        <h1 className="text-3xl font-bold text-gray-900">
          {product.name}
        </h1>

        <p className="mt-4 text-gray-600">
          {product.description}
        </p>

        <p className="mt-6 text-3xl font-bold text-gray-900">
          ₹{product.price.toLocaleString("en-IN")}
        </p>

        <p
          className={`mt-3 font-medium ${
            product.stock > 0
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {product.stock > 0
            ? `${product.stock} items available`
            : "Out of stock"}
        </p>

        {product.stock > 0 && (
          <button className="mt-8 w-full rounded-lg bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800 md:w-64">
            Add to Cart
          </button>
        )}
      </div>
    </div>
  </main>
);
}