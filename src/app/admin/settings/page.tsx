'use client';

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase"; // Assuming you have your supabase client here!

export default function AdminSettings() {
  const [isActive, setIsActive] = useState(false);
  const [bannerText, setBannerText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch the current settings when the page loads
  useEffect(() => {
    async function fetchSettings() {
      const { data, error } = await supabase
        .from('store_settings')
        .select('*')
        .eq('id', 1) // Grab our master row
        .single();

      if (data) {
        setIsActive(data.banner_active);
        setBannerText(data.banner_text || "");
      }
      setIsLoading(false);
    }
    fetchSettings();
  }, []);

  // Save the changes back to Supabase
  const handleSave = async () => {
    setIsSaving(true);
    const { error } = await supabase
      .from('store_settings')
      .update({ banner_active: isActive, banner_text: bannerText })
      .eq('id', 1);

    setIsSaving(false);
    if (error) {
      alert("Error saving settings!");
    } else {
      alert("Settings saved successfully!");
    }
  };

  if (isLoading) return <div className="p-8">Loading settings...</div>;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Store Settings</h1>
        <p className="mt-1 text-sm text-gray-500">Control your storefront display and promotions.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm max-w-2xl">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-sm font-bold tracking-wider text-gray-800 uppercase mb-4">
            Promotional Banner
          </h3>
          <p className="text-xs text-gray-500 mb-6">
            Turn the top announcement banner on or off, and update its text.
          </p>
          
          <div className="space-y-4">
            {/* The Toggle Switch */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsActive(!isActive)}
                className={`w-12 h-6 rounded-full transition-colors relative ${isActive ? 'bg-emerald-600' : 'bg-gray-300'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${isActive ? 'translate-x-7' : 'translate-x-1'}`}></div>
              </button>
              <span className="text-sm font-medium text-gray-700">
                {isActive ? 'Banner is LIVE' : 'Banner is Hidden'}
              </span>
            </div>

            {/* The Text Input */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Banner Text</label>
              <input 
                type="text" 
                value={bannerText}
                onChange={(e) => setBannerText(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-950 focus:ring-1 focus:ring-blue-950"
              />
            </div>

            {/* Save Button */}
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="bg-blue-950 text-white px-6 py-2 text-sm font-medium rounded-md mt-2 hover:bg-blue-900 transition-colors disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}