interface Product {
    id: number;
    name: string;
    price: string;
    sold: string;
  }
  
  export default function ProductCard({ product }: { product: Product }) {
    return (
      <div className="border rounded-md p-4">
        <img src="/coffee.jpg" alt={product.name} className="w-full h-40 object-cover rounded-md" />
        <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-500">{product.price}</p>
        <p className="text-gray-400 text-sm">{product.sold} sold</p>
        <button className="w-full mt-4 bg-brown-500 text-white py-2 rounded-md">Add to cart</button>
      </div>
    );
  }
  