'use client';

export default function AnnouncementBar() {
  // MASTER SWITCH: Change to 'false' to hide the banner completely
  const isActive = true; 

  if (!isActive) return null;

  return (
    <div className="bg-amber-700 px-4 py-2 text-center w-full z-50">
      <p className="text-[10px] font-medium tracking-[0.2em] text-white uppercase sm:text-xs">
        ✨ Festive Sale: Free Shipping on all orders over ₹1000 ✨
      </p>
    </div>
  );
}