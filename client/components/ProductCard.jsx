import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <div className="overflow-hidden rounded-lg border bg-white shadow-sm transition hover:shadow-md">
      {/* Product Image */}
      <div className="relative h-44 w-full">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>

      {/* Product Info */}
      <div className="p-3">
        <h2 className="truncate text-base font-semibold text-gray-900">
          {product.name}
        </h2>

        <p className="mt-1 line-clamp-2 text-xs text-gray-500">
          {product.description}
        </p>

        <div className="mt-2 flex items-center justify-between">
          <p className="text-lg font-bold text-gray-900">
            ₹{product.price.toLocaleString("en-IN")}
          </p>

          <p
            className={`text-xs font-medium ${
              product.stock > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {product.stock > 0 ? `${product.stock} left` : "Out of stock"}
          </p>
        </div>

        <Link 
        href={`/products/${product._id}`}
        className="mt-3 block w-full rounded-md bg-black px-3 py-2 text-center text-sm font-medium text-white transition hover:bg-gray-800">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;