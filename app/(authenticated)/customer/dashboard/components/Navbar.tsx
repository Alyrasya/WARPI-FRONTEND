import {
  ShoppingCartOutlined,
  HomeOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
export default function Navbar() {
  return (
    <nav className="bg-[#543310] p-4 flex justify-between items-center text-white border-8 border-[#A67B5B]">
      <div className="flex items-center">
        <img src="/logo.svg" alt="logo" className="h-10 mr-4" />
        <h1 className="text-2xl font-inter">WAR</h1>
      </div>
      <div className="flex space-x-8">
        <a
          href="#"
          className="bg-[#A67B5B] text-white hover:bg-[#8a5a3f] border border-[#A67B5B] px-4 py-2 rounded-[8px] flex items-center"
        >
          <HomeOutlined className="mr-2" /> {/* Add Home icon */}
          Home
        </a>
        <a
          href="#"
          className="bg-[#A67B5B] text-white hover:bg-[#8a5a3f] border border-[#A67B5B] px-4 py-2 rounded-[8px] flex items-center"
        >
          <HistoryOutlined className="mr-2" /> {/* Add History icon */}
          History
        </a>
        <a href="#" className="text-white flex items-center">
          <ShoppingCartOutlined className="mr-2 w-6 h-6" />{" "}
          {/* Set the size of the icon */}
        </a>
      </div>
    </nav>
  );
}
