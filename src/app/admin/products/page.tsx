'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Product = {
  id: string;
  Name: string;
  Price: number;
  Category: string;
  Description?: string;
  Material?: string;
  Finish?: string;
  Stock?: number;
  Image: string;
  Gallery?: string[];
  DiscountPrice?: number;
  discountprice?: number;
  discount_price?: number;
};

const initialFormState = {
  Name: "",
  Price: "",
  DiscountPrice: "",
  Category: "necklaces",
  Description: "",
  Material: "",
  Finish: "",
  Stock: "1",
  Image: "",
  Gallery: [] as string[]
};

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setIsLoading(true);
    const { data, error } = await supabase.from('products').select('*').order('id', { ascending: false });
    if (error) console.error("Error fetching products:", error.message || error);
    else if (data) setProducts(data);
    setIsLoading(false);
  }

  const openAddModal = () => {
    setFormData(initialFormState);
    setEditingId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setFormData({
      Name: product.Name || "",
      Price: product.Price?.toString() || "",
      // Check all spelling variations just in case
      DiscountPrice: product.DiscountPrice?.toString() || product.discountprice?.toString() || product.discount_price?.toString() || "",
      Category: product.Category || "necklaces",
      Description: product.Description || "",
      Material: product.Material || "",
      Finish: product.Finish || "",
      Stock: product.Stock?.toString() || "1",
      Image: product.Image || "",
      Gallery: product.Gallery || []
    });
    setEditingId(product.id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData(initialFormState);
    setEditingId(null);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isGallery: boolean = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage.from('product-images').upload(filePath, file);

    if (uploadError) {
      alert('Error uploading image: ' + uploadError.message);
      setIsUploading(false);
      return;
    }

    const { data } = supabase.storage.from('product-images').getPublicUrl(filePath);

    if (isGallery) {
      setFormData(prev => ({ ...prev, Gallery: [...prev.Gallery, data.publicUrl] }));
    } else {
      setFormData(prev => ({ ...prev, Image: data.publicUrl }));
    }

    setIsUploading(false);
  };

  const removeGalleryImage = (index: number) => {
    const newGallery = formData.Gallery.filter((_, i) => i !== index);
    setFormData({ ...formData, Gallery: newGallery });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const productData = {
      ...formData,
      Price: parseFloat(formData.Price),
      // If the field is empty, send NULL to the database so it knows there is no discount
      DiscountPrice: formData.DiscountPrice && formData.DiscountPrice.trim() !== "" ? parseFloat(formData.DiscountPrice) : null,
      Stock: parseInt(formData.Stock) || 0,
      Gallery: formData.Gallery.filter(url => url.trim() !== "") 
    };

    let error;
    if (editingId) {
      const { error: updateError } = await supabase.from('products').update(productData).eq('id', editingId);
      error = updateError;
    } else {
      const { error: insertError } = await supabase.from('products').insert([productData]);
      error = insertError;
    }

    setIsSubmitting(false);

    if (error) alert(`Error saving product: ${error.message}`);
    else {
      closeModal();
      fetchProducts();
    }
  };

  async function handleDelete(id: string, name: string) {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) setProducts(products.filter(p => p.id !== id));
  }

  return (
    <div className="relative">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Products</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your jewelry inventory.</p>
        </div>
        <button onClick={openAddModal} className="bg-blue-950 text-white px-4 py-2 text-sm font-medium rounded-md hover:bg-blue-900 transition-colors shadow-sm">
          + Add Product
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500">
              <tr>
                <th className="px-6 py-4 font-medium">Image</th>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-400">Loading inventory...</td></tr>
              ) : products.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-400">No products found.</td></tr>
              ) : (
                products.map((product) => {
                  const discountPrice = product.DiscountPrice || product.discountprice || product.discount_price || null;
                  
                  return (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-3">
                        <div className="h-12 w-12 rounded-md overflow-hidden bg-gray-100 border border-gray-200">
                          <img 
                            src={product.Image || (product.Gallery && product.Gallery.length > 0 ? product.Gallery[0] : "https://via.placeholder.com/150")} 
                            alt={product.Name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">{product.Name}</td>
                      <td className="px-6 py-4 capitalize">{product.Category}</td>
                      <td className="px-6 py-4">
                        {discountPrice ? (
                          <div className="flex flex-col">
                            <span className="text-emerald-600 font-bold">₹{discountPrice}</span>
                            <span className="text-[10px] text-gray-400 line-through">₹{product.Price}</span>
                          </div>
                        ) : (
                          <span>₹{product.Price}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right space-x-4">
                        <button onClick={() => openEditModal(product)} className="text-blue-600 hover:text-blue-800 font-medium">Edit</button>
                        <button onClick={() => handleDelete(product.id, product.Name)} className="text-red-500 hover:text-red-700 font-medium">Delete</button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col">
            
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-xl font-semibold text-gray-800">{editingId ? "Edit Product" : "Add New Product"}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-700 text-2xl leading-none">&times;</button>
            </div>

            <div className="p-6">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                
                {/* UPGRADED: 3-Column Layout for Pricing & Category */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-3">
                    <label className="block text-xs font-bold tracking-wider text-gray-700 uppercase mb-2">Product Name</label>
                    <input required type="text" name="Name" value={formData.Name} onChange={handleFormChange} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-950 focus:border-blue-950" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-wider text-gray-700 uppercase mb-2">Original Price (₹)</label>
                    <input required type="number" name="Price" value={formData.Price} onChange={handleFormChange} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-950 focus:border-blue-950" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-wider text-emerald-700 uppercase mb-2">Sale Price (₹)</label>
                    <input type="number" name="DiscountPrice" value={formData.DiscountPrice} onChange={handleFormChange} placeholder="Leave blank if no sale" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-emerald-700 focus:border-emerald-700" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-wider text-gray-700 uppercase mb-2">Category</label>
                    <select name="Category" value={formData.Category} onChange={handleFormChange} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-950 focus:border-blue-950">
                      <option value="necklaces">Necklaces</option>
                      <option value="earrings">Earrings</option>
                      <option value="bracelets">Bracelets</option>
                      <option value="rings">Rings</option>
                      <option value="sets">Sets</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold tracking-wider text-gray-700 uppercase mb-2">Description</label>
                  <textarea rows={3} name="Description" value={formData.Description} onChange={handleFormChange} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-950 focus:border-blue-950"></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-bold tracking-wider text-gray-700 uppercase mb-2">Material</label>
                    <input type="text" name="Material" value={formData.Material} onChange={handleFormChange} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-950" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-wider text-gray-700 uppercase mb-2">Finish</label>
                    <input type="text" name="Finish" value={formData.Finish} onChange={handleFormChange} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-950" />
                  </div>
                  <div>
                    {/* UPGRADED: Quick Action Out of Stock Button */}
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-bold tracking-wider text-gray-700 uppercase">Stock</label>
                      <button type="button" onClick={() => setFormData({...formData, Stock: "0"})} className="text-[10px] text-red-500 font-bold uppercase hover:underline">
                        Mark Out of Stock
                      </button>
                    </div>
                    <input required type="number" name="Stock" value={formData.Stock} onChange={handleFormChange} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-950" />
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <label className="block text-xs font-bold tracking-wider text-gray-700 uppercase mb-2">Primary Image</label>
                  <div className="flex items-center gap-4">
                    {formData.Image && (
                      <img src={formData.Image} alt="Preview" className="h-16 w-16 object-cover rounded-md border border-gray-200" />
                    )}
                    <div className="flex-1">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, false)} 
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
                      />
                      {isUploading && <p className="text-xs text-blue-600 mt-1">Uploading...</p>}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mt-4">
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-xs font-bold tracking-wider text-gray-700 uppercase">Additional Gallery Images</label>
                    <div className="relative overflow-hidden inline-block cursor-pointer">
                      <button type="button" className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors">
                        + Upload Image
                      </button>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, true)}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {formData.Gallery.length === 0 && (
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider col-span-full">No additional images added.</p>
                    )}
                    {formData.Gallery.map((url, index) => (
                      <div key={index} className="relative group rounded-md overflow-hidden border border-gray-200 h-24">
                        <img src={url} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
                        <button 
                          type="button" 
                          onClick={() => removeGalleryImage(index)} 
                          className="absolute inset-0 bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center font-bold text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-6 pt-6">
                  <button type="button" onClick={closeModal} className="px-6 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Cancel</button>
                  <button type="submit" disabled={isSubmitting || isUploading} className="bg-blue-950 text-white px-8 py-2 text-sm font-medium rounded-md hover:bg-blue-900 transition-colors disabled:opacity-50">
                    {isSubmitting ? "Saving..." : "Save Product"}
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}