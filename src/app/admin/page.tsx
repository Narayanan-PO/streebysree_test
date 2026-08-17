export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
      <p className="mt-2 text-sm text-gray-500">Welcome to your store control center.</p>
      
      {/* Example Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-xs font-bold tracking-wider text-gray-500 uppercase">Total Products</h3>
          <p className="text-3xl font-light text-blue-950 mt-2">--</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-xs font-bold tracking-wider text-gray-500 uppercase">Active Sales</h3>
          <p className="text-3xl font-light text-blue-950 mt-2">Off</p>
        </div>
      </div>
    </div>
  );
}