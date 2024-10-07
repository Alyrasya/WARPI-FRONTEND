export default function Pagination() {
    return (
      <div className="flex justify-between items-center mt-8">
        <button className="text-brown-500">&larr; Prev</button>
        <div className="flex space-x-2">
          <button className="bg-brown-500 text-white px-4 py-2 rounded-md">1</button>
          <button className="px-4 py-2 rounded-md">2</button>
          <button className="px-4 py-2 rounded-md">3</button>
          {/* Tambahkan pagination sesuai kebutuhan */}
        </div>
        <button className="text-brown-500">Next &rarr;</button>
      </div>
    );
  }
  