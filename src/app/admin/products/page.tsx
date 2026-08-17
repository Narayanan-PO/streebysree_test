export default function AdminProducts() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Products</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your jewelry inventory and prices.</p>
        </div>
        <button className="bg-blue-950 text-white px-4 py-2 text-sm font-medium rounded-md hover:bg-blue-900 transition-colors shadow-sm">
          + Add Product
        </button>
      </div>

      {/* Placeholder for the Data Table */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-12 text-center">
        <p className="text-sm text-gray-400">Inventory table will load here...</p>
      </div>
    </div>
  );
}