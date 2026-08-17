export default function ShippingPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8 min-h-[70vh]">
      <h1 className="mb-8 text-2xl font-light tracking-widest text-blue-950 uppercase text-center">
        Shipping & Returns
      </h1>
      <div className="mb-12 mx-auto h-[1px] w-16 bg-amber-700"></div>

      <div className="space-y-8 text-sm font-light leading-relaxed text-gray-600">
        <section>
          <h2 className="text-sm font-medium tracking-widest text-blue-950 uppercase mb-3">Order Processing</h2>
          <p>All orders are processed and confirmed via WhatsApp. Once your order is finalized and payment is received, it will be dispatched within 1-3 business days. You will receive tracking details directly in our WhatsApp chat.</p>
        </section>

        <section>
          <h2 className="text-sm font-medium tracking-widest text-blue-950 uppercase mb-3">Shipping Rates</h2>
          <p>Shipping charges will be calculated and shared with you during the WhatsApp checkout process based on your location.</p>
        </section>

        <section>
          <h2 className="text-sm font-medium tracking-widest text-blue-950 uppercase mb-3">Returns & Exchanges</h2>
          <p>Due to hygiene reasons and the nature of our premium jewelry, we currently do not accept returns or exchanges unless an item arrives damaged. If you receive a damaged item, please share an unboxing video with us on WhatsApp within 24 hours of delivery, and we will be happy to assist you further.</p>
        </section>
      </div>
    </div>
  );
}