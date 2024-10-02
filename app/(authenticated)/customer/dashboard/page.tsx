import { HomeOutlined, HistoryOutlined, ShoppingCartOutlined } from '@ant-design/icons';

const dashboard = () =>{
    return(
        <nav className="bg-[#543310] p-4 flex justify-between items-center justify-center">
      <div className="flex items-center space-x-2">
        <img src="/logo.svg" alt="Warung Kopi" className="w-12 h-12 text-align-center justify-center" />
        <h1 className="text-white text-[25px] text-xl font-bold text-align-center justify-center">WARπ</h1>
      </div>
      <div className="flex space-x-5">
      <a href="#" className="text-white flex items-center ">
          <button className="flex items-center bg-[#A67B5B] text-white px-4 py-2 rounded-[8px]">
            <HomeOutlined style={{ fontSize: '16px' }} />
            <span className="text-[12px] ml-2">Home</span>
          </button>
        </a>
        <a href="#" className="text-white flex items-center ">
          <button className="flex items-center bg-[#A67B5B] text-white px-4 py-2 rounded-[8px]">
            <HistoryOutlined style={{ fontSize: '16px' }} />
            <span className="text-[12px] ml-2">History</span>
          </button>
        </a>
                <a href="#" className="text-white flex items-center ">
        <div style={{ width: '25px', height: '25px' }} className="flex justify-center items-center">
            <ShoppingCartOutlined style={{ fontSize: '30px', color: 'white' }} />
        </div>
        </a>
      </div>
    </nav>
    )
}
export default dashboard;