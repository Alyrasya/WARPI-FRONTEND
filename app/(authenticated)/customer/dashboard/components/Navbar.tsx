import { ShoppingCartOutlined } from "@ant-design/icons";
export default function Navbar() {
  return (
    <nav className="bg-[#543310] p-4 flex justify-between items-center text-white">
      <div className="flex items-center">
        <img src="/logo.svg" alt="logo" className="h-10 mr-4" />
        <h1 className="text-2xl font-bold">WARπ</h1>
      </div>
      <div className="flex space-x-8">
        <a
          href="#"
          className="text-white hover:text-gray-300 border border-[#A67B5B] px-4 py-2 rounded-[8px] flex items-center"
        >
          Home
        </a>
        <a
          href="#"
          className="text-white hover:text-white border border-[#A67B5B] px-4 py-2 rounded-[8px] flex items-center"
        >
          History
        </a>
        <a
          href="#"
          className="text-white hover:text-gray-300 border border-[#A67B5B] px-4 py-2 rounded-[8px] flex items-center"
        >
          <ShoppingCartOutlined className="mr-2" />
        </a>
      </div>
    </nav>
  );
}
