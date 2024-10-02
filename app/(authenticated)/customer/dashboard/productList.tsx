import { FilterOutlined } from '@ant-design/icons';

const ProductList = () => {
  const products = [
    { name: 'Coffe', price: 'Rp139.900', sold: '4rb+ sold' },
    // Add more products here
  ];

  return (
    <section className="px-10 py-5">
      <div className="flex justify-between items-center">
        <input type="text" placeholder="Search menu" className="border rounded-full px-4 py-2" />
        <button className="bg-brown-600 text-white px-4 py-2 rounded-full flex items-center space-x-1">
          <FilterOutlined />
          <span>Filter</span>
        </button>
      </div>
      <div className="mt-5 flex space-x-4">
        <button className="bg-brown-600 text-white px-4 py-2 rounded-full">All</button>
        <button className="border rounded-full px-4 py-2">Food</button>
        <button className="border rounded-full px-4 py-2">Drinks</button>
      </div>
      <div className="grid grid-cols-3 gap-5 mt-5">
        {products.map((product, index) => (
          <div key={index} className="border rounded-lg p-4">
            <img src="/coffee.png" alt={product.name} className="w-full h-40 object-cover rounded-md" />
            <h3 className="text-xl mt-2">{product.name}</h3>
            <p>{product.price}</p>
            <p>{product.sold}</p>
            <button className="bg-brown-600 text-white w-full mt-3 p-2 rounded-lg">Add to cart</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductList;
