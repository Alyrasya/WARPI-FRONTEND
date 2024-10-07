import Navbar from './components/Navbar';
import Banner from './components/Banner';
import ProductCard from './components/ProductCard';
import Pagination from './components/Pagination';

export default function HomePage() {
  const products = [
    { id: 1, name: "Coffe", price: "Rp139.900", sold: "4rb+" },
    { id: 2, name: "Coffe", price: "Rp139.900", sold: "4rb+" },
    { id: 3, name: "Coffe", price: "Rp139.900", sold: "4rb+" },
    // Tambahkan produk lainnya sesuai kebutuhan
  ];

  return (
    <div>
      <Navbar />
      <Banner />
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-brown-500 text-white rounded-full">All</button>
            <button className="px-4 py-2 bg-gray-200 text-brown-500 rounded-full">Food</button>
            <button className="px-4 py-2 bg-gray-200 text-brown-500 rounded-full">Drinks</button>
          </div>
          <div>
            <input className="border rounded-md p-2" placeholder="Search menu" />
            <button className="ml-2 p-2 bg-brown-500 text-white rounded-md">Filter</button>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-6 mt-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="grid grid-cols-4 gap-6 mt-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="grid grid-cols-4 gap-6 mt-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Pagination />
      </div>
    </div>
  );
}

