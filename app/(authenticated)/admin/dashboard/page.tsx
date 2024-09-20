export default function DashboardPage() {
    return (
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white p-6 shadow rounded">
            <h3 className="text-xl">Total Category</h3>
            <p className="text-2xl font-bold">50</p>
          </div>
          <div className="bg-white p-6 shadow rounded">
            <h3 className="text-xl">Total Product</h3>
            <p className="text-2xl font-bold">50</p>
          </div>
          <div className="bg-white p-6 shadow rounded">
            <h3 className="text-xl">Total Cashier</h3>
            <p className="text-2xl font-bold">50</p>
          </div>
          <div className="bg-white p-6 shadow rounded">
            <h3 className="text-xl">Total Transaction</h3>
            <p className="text-2xl font-bold">50</p>
          </div>
          <div className="bg-white p-6 shadow rounded">
            <h3 className="text-xl">Total Monthly Income</h3>
            <p className="text-2xl font-bold">Rp. 1.000.000.000,00</p>
          </div>
          <div className="bg-white p-6 shadow rounded">
            <h3 className="text-xl">All Total Income</h3>
            <p className="text-2xl font-bold">Rp. 1.000.000.000,00</p>
          </div>
        </div>
    );
  }