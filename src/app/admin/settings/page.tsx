'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type StoreSettings = {
  id: number;
  store_name: string | null;
  store_logo: string | null;
  whatsapp_number: string | null;
  promo_banner_active: boolean;
  promo_banner_text: string | null;
  hero_image: string | null;
  hero_tagline: string | null;
  hero_title: string | null;
  hero_description: string | null;
  about_philosophy_p1: string | null;
  about_philosophy_p2: string | null;
  // NEW: Homepage story teaser fields
  story_title: string | null;
  story_text: string | null;
  story_image: string | null;
};

type Category = {
  id: string;
  name: string;
  image_url: string;
};

// NEW: Testimonial type
type Testimonial = {
  id: string;
  customer_name: string;
  quote: string;
  rating: number;
  is_active: boolean;
};

export default function SettingsAdmin() {
  const [activeTab, setActiveTab] = useState<'settings' | 'categories' | 'testimonials'>('settings');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Settings State
  const [settings, setSettings] = useState<StoreSettings>({
    id: 1,
    store_name: "Stree by Sree",
    store_logo: "",
    whatsapp_number: "8891027146",
    promo_banner_active: false,
    promo_banner_text: "",
    hero_image: "",
    hero_tagline: "",
    hero_title: "",
    hero_description: "",
    about_philosophy_p1: "",
    about_philosophy_p2: "",
    story_title: "",
    story_text: "",
    story_image: ""
  });

  // Categories State
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryForm, setCategoryForm] = useState({ name: "", image_url: "" });

  // NEW: Testimonials State
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [testimonialForm, setTestimonialForm] = useState({
    customer_name: "",
    quote: "",
    rating: 5,
    is_active: true
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setIsLoading(true);

    // Fetch Settings
    const { data: settingsData } = await supabase
      .from('store_settings')
      .select('*')
      .eq('id', 1)
      .single();

    if (settingsData) setSettings(settingsData);

    // Fetch Categories
    const { data: catData } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (catData) setCategories(catData);

    // NEW: Fetch Testimonials
    const { data: testimonialData } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (testimonialData) setTestimonials(testimonialData);

    setIsLoading(false);
  }

  // --- IMAGE UPLOAD HANDLER (added 'story' target) ---
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: 'hero' | 'category' | 'logo' | 'story') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `ui_${Math.random()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage.from('product-images').upload(fileName, file);

    if (uploadError) {
      alert('Upload failed: ' + uploadError.message);
      setIsUploading(false);
      return;
    }

    const { data } = supabase.storage.from('product-images').getPublicUrl(fileName);

    if (target === 'hero') {
      setSettings({ ...settings, hero_image: data.publicUrl });
    } else if (target === 'logo') {
      setSettings({ ...settings, store_logo: data.publicUrl });
    } else if (target === 'story') {
      setSettings({ ...settings, story_image: data.publicUrl });
    } else {
      setCategoryForm({ ...categoryForm, image_url: data.publicUrl });
    }

    setIsUploading(false);
  };

  // --- SETTINGS SAVE HANDLER ---
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const { error } = await supabase.from('store_settings').upsert(settings);
    setIsSaving(false);

    if (error) {
      alert("Error saving settings: " + error.message);
    } else {
      alert("Store settings updated successfully!");
    }
  };

  // --- CATEGORY SAVE HANDLER ---
  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    let dbError = null;

    if (editingCategory) {
      const { error } = await supabase
        .from('categories')
        .update(categoryForm)
        .eq('id', editingCategory.id);
      dbError = error;
    } else {
      const { error } = await supabase
        .from('categories')
        .insert([categoryForm]);
      dbError = error;
    }

    if (dbError) {
      alert("Database Error: " + dbError.message + "\n\n(Hint: You probably need to turn off Row Level Security for the 'categories' table in Supabase!)");
    } else {
      setEditingCategory(null);
      setCategoryForm({ name: "", image_url: "" });
      fetchData();
      alert("Category saved successfully!");
    }

    setIsSaving(false);
  };

  // --- CATEGORY DELETE HANDLER ---
  const handleDeleteCategory = async (id: string, name: string) => {
    if (!window.confirm(`Delete category "${name}"?`)) return;
    await supabase.from('categories').delete().eq('id', id);
    fetchData();
  };

  // --- NEW: TESTIMONIAL SAVE HANDLER ---
  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    let dbError = null;

    if (editingTestimonial) {
      const { error } = await supabase
        .from('testimonials')
        .update(testimonialForm)
        .eq('id', editingTestimonial.id);
      dbError = error;
    } else {
      const { error } = await supabase
        .from('testimonials')
        .insert([testimonialForm]);
      dbError = error;
    }

    if (dbError) {
      alert("Database Error: " + dbError.message + "\n\n(Hint: You may need to turn off Row Level Security for the 'testimonials' table in Supabase!)");
    } else {
      setEditingTestimonial(null);
      setTestimonialForm({ customer_name: "", quote: "", rating: 5, is_active: true });
      fetchData();
      alert("Testimonial saved successfully!");
    }

    setIsSaving(false);
  };

  // --- NEW: TESTIMONIAL DELETE HANDLER ---
  const handleDeleteTestimonial = async (id: string, name: string) => {
    if (!window.confirm(`Delete testimonial from "${name}"?`)) return;
    await supabase.from('testimonials').delete().eq('id', id);
    fetchData();
  };

  if (isLoading) {
    return (
      <div className="p-8 text-stone-500 uppercase tracking-widest text-xs animate-pulse">
        Loading Store Data...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-stone-900">Store Settings</h1>
        <p className="mt-1 text-sm text-stone-500">Control your storefront display, promotions, and branding.</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-200 mb-8">
        <button
          onClick={() => setActiveTab('settings')}
          className={`pb-4 px-6 text-xs font-bold tracking-[0.2em] uppercase transition-colors ${
            activeTab === 'settings' ? 'border-b-2 border-blue-900 text-blue-900' : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          Global Settings
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          className={`pb-4 px-6 text-xs font-bold tracking-[0.2em] uppercase transition-colors ${
            activeTab === 'categories' ? 'border-b-2 border-blue-900 text-blue-900' : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          Categories
        </button>
        {/* NEW TAB */}
        <button
          onClick={() => setActiveTab('testimonials')}
          className={`pb-4 px-6 text-xs font-bold tracking-[0.2em] uppercase transition-colors ${
            activeTab === 'testimonials' ? 'border-b-2 border-blue-900 text-blue-900' : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          Testimonials
        </button>
      </div>

      {/* --- TAB 1: GLOBAL SETTINGS --- */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveSettings} className="space-y-8 bg-white p-8 rounded-lg shadow-sm border border-stone-200">

          {/* Brand Identity */}
          <div>
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-widest mb-4 border-b border-stone-100 pb-2">
              Brand Identity
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold tracking-wider text-stone-700 uppercase mb-2">Store Name</label>
                <input
                  type="text"
                  value={settings.store_name || ""}
                  onChange={e => setSettings({...settings, store_name: e.target.value})}
                  className="w-full border border-stone-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-blue-900"
                />
              </div>
              <div>
                <label className="block text-xs font-bold tracking-wider text-stone-700 uppercase mb-2">Store Logo (Optional)</label>
                <div className="flex items-center gap-4">
                  {settings.store_logo && (
                    <img src={settings.store_logo} alt="Logo preview" className="h-10 object-contain border border-stone-200 p-1" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'logo')}
                    className="text-sm text-stone-500 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-stone-100 file:text-stone-700 hover:file:bg-stone-200"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Promotional Banner */}
          <div>
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-widest mb-4 border-b border-stone-100 pb-2 mt-8">
              Promotional Banner
            </h3>
            <div className="flex items-center gap-3 mb-4">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.promo_banner_active}
                  onChange={e => setSettings({...settings, promo_banner_active: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-900"></div>
                <span className="ml-3 text-sm font-medium text-gray-700">
                  {settings.promo_banner_active ? 'Banner is Active' : 'Banner is Hidden'}
                </span>
              </label>
            </div>
            <div>
              <label className="block text-xs font-bold tracking-wider text-stone-700 uppercase mb-2">Banner Text</label>
              <input
                type="text"
                value={settings.promo_banner_text || ""}
                onChange={e => setSettings({...settings, promo_banner_text: e.target.value})}
                placeholder="✨ Festive Sale: Free Shipping on all orders over ₹1000 ✨"
                className="w-full border border-stone-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-blue-900"
              />
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-widest mb-4 border-b border-stone-100 pb-2 mt-8">
              Contact Details
            </h3>
            <label className="block text-xs font-bold tracking-wider text-stone-700 uppercase mb-2">WhatsApp Number</label>
            <input
              type="text"
              value={settings.whatsapp_number || ""}
              onChange={e => setSettings({...settings, whatsapp_number: e.target.value})}
              className="w-full max-w-md border border-stone-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-blue-900"
            />
          </div>

          {/* Hero Section */}
          <div>
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-widest mb-4 border-b border-stone-100 pb-2 mt-8">
              Hero Section (Homepage)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-xs font-bold tracking-wider text-stone-700 uppercase mb-2">Hero Tagline</label>
                <input
                  type="text"
                  value={settings.hero_tagline || ""}
                  onChange={e => setSettings({...settings, hero_tagline: e.target.value})}
                  className="w-full border border-stone-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-blue-900"
                />
              </div>
              <div>
                <label className="block text-xs font-bold tracking-wider text-stone-700 uppercase mb-2">Hero Title</label>
                <input
                  type="text"
                  value={settings.hero_title || ""}
                  onChange={e => setSettings({...settings, hero_title: e.target.value})}
                  className="w-full border border-stone-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-blue-900"
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-xs font-bold tracking-wider text-stone-700 uppercase mb-2">Hero Description</label>
              <textarea
                rows={2}
                value={settings.hero_description || ""}
                onChange={e => setSettings({...settings, hero_description: e.target.value})}
                className="w-full border border-stone-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-blue-900"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-xs font-bold tracking-wider text-stone-700 uppercase mb-2">Background Image</label>
              <div className="flex items-center gap-4">
                {settings.hero_image && (
                  <img src={settings.hero_image} alt="Hero preview" className="h-20 w-32 object-cover rounded border border-stone-200" />
                )}
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'hero')}
                    className="text-sm text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-stone-100 file:text-stone-700 hover:file:bg-stone-200"
                  />
                  {isUploading && <p className="text-xs text-blue-900 mt-1">Uploading...</p>}
                </div>
              </div>
            </div>
          </div>

          {/* NEW: Homepage Story Teaser Section */}
          <div>
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-widest mb-4 border-b border-stone-100 pb-2 mt-8">
              Homepage Story Teaser
            </h3>
            <p className="text-xs text-stone-500 mb-4">This appears as a short "Our Heritage" section on the homepage, with a link to your full About page.</p>
            <div className="mb-6">
              <label className="block text-xs font-bold tracking-wider text-stone-700 uppercase mb-2">Section Title</label>
              <input
                type="text"
                value={settings.story_title || ""}
                onChange={e => setSettings({...settings, story_title: e.target.value})}
                placeholder="Our Story"
                className="w-full border border-stone-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-blue-900"
              />
            </div>
            <div className="mb-6">
              <label className="block text-xs font-bold tracking-wider text-stone-700 uppercase mb-2">Story Text</label>
              <textarea
                rows={3}
                value={settings.story_text || ""}
                onChange={e => setSettings({...settings, story_text: e.target.value})}
                placeholder="A short paragraph about your brand's story..."
                className="w-full border border-stone-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-blue-900"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-xs font-bold tracking-wider text-stone-700 uppercase mb-2">Story Image</label>
              <div className="flex items-center gap-4">
                {settings.story_image && (
                  <img src={settings.story_image} alt="Story preview" className="h-20 w-32 object-cover rounded border border-stone-200" />
                )}
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'story')}
                    className="text-sm text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-stone-100 file:text-stone-700 hover:file:bg-stone-200"
                  />
                  {isUploading && <p className="text-xs text-blue-900 mt-1">Uploading...</p>}
                </div>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div>
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-widest mb-4 border-b border-stone-100 pb-2 mt-8">
              About Us Story (Full About Page)
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold tracking-wider text-stone-700 uppercase mb-2">Paragraph 1</label>
                <textarea
                  rows={3}
                  value={settings.about_philosophy_p1 || ""}
                  onChange={e => setSettings({...settings, about_philosophy_p1: e.target.value})}
                  className="w-full border border-stone-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-blue-900"
                ></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold tracking-wider text-stone-700 uppercase mb-2">Paragraph 2</label>
                <textarea
                  rows={3}
                  value={settings.about_philosophy_p2 || ""}
                  onChange={e => setSettings({...settings, about_philosophy_p2: e.target.value})}
                  className="w-full border border-stone-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-blue-900"
                ></textarea>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isSaving || isUploading}
              className="bg-blue-900 text-white px-8 py-3 text-sm font-medium rounded hover:bg-blue-800 transition-colors disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      )}

      {/* --- TAB 2: CATEGORIES --- */}
      {activeTab === 'categories' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Add/Edit Form */}
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm border border-stone-200 h-fit">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-widest mb-6">
              {editingCategory ? "Edit Category" : "Add New Category"}
            </h3>
            <form onSubmit={handleSaveCategory} className="space-y-4">
              <div>
                <label className="block text-xs font-bold tracking-wider text-stone-700 uppercase mb-2">Name</label>
                <input
                  required
                  type="text"
                  value={categoryForm.name}
                  onChange={e => setCategoryForm({...categoryForm, name: e.target.value})}
                  className="w-full border border-stone-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-900"
                />
              </div>
              <div>
                <label className="block text-xs font-bold tracking-wider text-stone-700 uppercase mb-2">Image</label>
                {categoryForm.image_url && (
                  <img src={categoryForm.image_url} alt="Preview" className="h-24 w-24 object-cover rounded-full mb-3 mx-auto border border-stone-200" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'category')}
                  className="w-full text-xs text-stone-500 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-stone-100 file:text-stone-700 hover:file:bg-stone-200"
                />
              </div>
              <div className="pt-4 flex gap-2">
                {editingCategory && (
                  <button
                    type="button"
                    onClick={() => { setEditingCategory(null); setCategoryForm({name:"", image_url:""}); }}
                    className="flex-1 bg-stone-100 text-stone-600 py-2 text-xs font-bold uppercase rounded hover:bg-stone-200"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isSaving || isUploading}
                  className="flex-1 bg-blue-900 text-white py-2 text-xs font-bold uppercase rounded hover:bg-blue-800 disabled:opacity-50"
                >
                  {editingCategory ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>

          {/* List of Categories */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-stone-200 overflow-hidden">
            <table className="w-full text-left text-sm text-stone-600">
              <thead className="bg-stone-50 border-b border-stone-200 text-xs uppercase tracking-wider text-stone-500">
                <tr>
                  <th className="px-6 py-4 font-medium">Image</th>
                  <th className="px-6 py-4 font-medium">Name</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {categories.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center text-stone-400">
                      No categories added yet.
                    </td>
                  </tr>
                ) : (
                  categories.map((cat) => (
                    <tr key={cat.id} className="hover:bg-stone-50">
                      <td className="px-6 py-3">
                        <div className="h-12 w-12 rounded-full overflow-hidden bg-stone-100 border border-stone-200">
                          {cat.image_url ? (
                            <img src={cat.image_url} alt={cat.name} className="h-full w-full object-cover" />
                          ) : (
                            <span className="flex h-full items-center justify-center text-stone-400">
                              {cat.name.charAt(0)}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-stone-900">{cat.name}</td>
                      <td className="px-6 py-4 text-right space-x-4">
                        <button
                          onClick={() => { setEditingCategory(cat); setCategoryForm({name: cat.name, image_url: cat.image_url || ""}); }}
                          className="text-blue-600 hover:text-blue-900 font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(cat.id, cat.name)}
                          className="text-red-500 hover:text-red-700 font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* --- NEW TAB 3: TESTIMONIALS --- */}
      {activeTab === 'testimonials' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Add/Edit Form */}
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm border border-stone-200 h-fit">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-widest mb-6">
              {editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}
            </h3>
            <form onSubmit={handleSaveTestimonial} className="space-y-4">
              <div>
                <label className="block text-xs font-bold tracking-wider text-stone-700 uppercase mb-2">Customer Name</label>
                <input
                  required
                  type="text"
                  value={testimonialForm.customer_name}
                  onChange={e => setTestimonialForm({...testimonialForm, customer_name: e.target.value})}
                  className="w-full border border-stone-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-900"
                />
              </div>
              <div>
                <label className="block text-xs font-bold tracking-wider text-stone-700 uppercase mb-2">Quote</label>
                <textarea
                  required
                  rows={3}
                  value={testimonialForm.quote}
                  onChange={e => setTestimonialForm({...testimonialForm, quote: e.target.value})}
                  className="w-full border border-stone-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-900"
                ></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold tracking-wider text-stone-700 uppercase mb-2">Rating (1-5)</label>
                <select
                  value={testimonialForm.rating}
                  onChange={e => setTestimonialForm({...testimonialForm, rating: parseInt(e.target.value)})}
                  className="w-full border border-stone-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-900"
                >
                  {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} Stars</option>)}
                </select>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={testimonialForm.is_active}
                  onChange={e => setTestimonialForm({...testimonialForm, is_active: e.target.checked})}
                  className="h-4 w-4"
                />
                <label className="text-xs font-bold tracking-wider text-stone-700 uppercase">
                  Show on Homepage
                </label>
              </div>
              <div className="pt-4 flex gap-2">
                {editingTestimonial && (
                  <button
                    type="button"
                    onClick={() => { setEditingTestimonial(null); setTestimonialForm({customer_name:"", quote:"", rating: 5, is_active: true}); }}
                    className="flex-1 bg-stone-100 text-stone-600 py-2 text-xs font-bold uppercase rounded hover:bg-stone-200"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 bg-blue-900 text-white py-2 text-xs font-bold uppercase rounded hover:bg-blue-800 disabled:opacity-50"
                >
                  {editingTestimonial ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>

          {/* List of Testimonials */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-stone-200 overflow-hidden">
            <table className="w-full text-left text-sm text-stone-600">
              <thead className="bg-stone-50 border-b border-stone-200 text-xs uppercase tracking-wider text-stone-500">
                <tr>
                  <th className="px-6 py-4 font-medium">Customer</th>
                  <th className="px-6 py-4 font-medium">Quote</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {testimonials.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-stone-400">
                      No testimonials added yet.
                    </td>
                  </tr>
                ) : (
                  testimonials.map((t) => (
                    <tr key={t.id} className="hover:bg-stone-50">
                      <td className="px-6 py-4 font-medium text-stone-900">{t.customer_name}</td>
                      <td className="px-6 py-4 max-w-xs truncate">{t.quote}</td>
                      <td className="px-6 py-4">
                        {t.is_active ? (
                          <span className="text-emerald-600 text-xs font-bold uppercase">Live</span>
                        ) : (
                          <span className="text-stone-400 text-xs font-bold uppercase">Hidden</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right space-x-4">
                        <button
                          onClick={() => { setEditingTestimonial(t); setTestimonialForm({customer_name: t.customer_name, quote: t.quote, rating: t.rating, is_active: t.is_active}); }}
                          className="text-blue-600 hover:text-blue-900 font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTestimonial(t.id, t.customer_name)}
                          className="text-red-500 hover:text-red-700 font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>
      )}
    </div>
  );
}