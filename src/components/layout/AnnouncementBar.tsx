'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AnnouncementBar() {
  const [isActive, setIsActive] = useState(false);
  const [bannerText, setBannerText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBannerSettings() {
      const { data, error } = await supabase
        .from('store_settings')
        .select('*')
        .eq('id', 1)
        .single();

      if (data) {
        setIsActive(data.banner_active);
        setBannerText(data.banner_text || "");
      }
      setIsLoading(false);
    }
    
    fetchBannerSettings();
  }, []);

  // If it is still loading, or if the banner is turned off in the admin panel, show nothing.
  if (isLoading || !isActive) return null;

  return (
    <div className="bg-amber-700 px-4 py-2 text-center w-full z-50">
      <p className="text-[10px] font-medium tracking-[0.2em] text-white uppercase sm:text-xs">
        {bannerText}
      </p>
    </div>
  );
}