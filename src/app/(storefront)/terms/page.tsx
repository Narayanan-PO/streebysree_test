export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8 min-h-[70vh]">
      <h1 className="mb-8 text-2xl font-light tracking-widest text-blue-950 uppercase text-center">
        Terms & Privacy
      </h1>
      <div className="mb-12 mx-auto h-[1px] w-16 bg-amber-700"></div>

      <div className="space-y-8 text-sm font-light leading-relaxed text-gray-600">
        <section>
          <h2 className="text-sm font-medium tracking-widest text-blue-950 uppercase mb-3">Privacy Policy</h2>
          <p>At StreebySree, we value your privacy. We only collect the information necessary to process your orders and improve your shopping experience. We do not sell or share your personal information (including your WhatsApp number and shipping details) with third parties for marketing purposes.</p>
        </section>

        <section>
          <h2 className="text-sm font-medium tracking-widest text-blue-950 uppercase mb-3">Terms of Service</h2>
          <p>By placing an order with us, you agree to our shipping and return policies. All products remain the property of StreebySree until full payment is received. We reserve the right to modify prices and product availability at any time without prior notice.</p>
        </section>

        <section>
          <h2 className="text-sm font-medium tracking-widest text-blue-950 uppercase mb-3">Product Accuracy</h2>
          <p>We make every effort to display the colors and details of our jewelry as accurately as possible. However, due to differences in monitor displays and lighting, the actual colors may vary slightly from what you see on your screen.</p>
        </section>
      </div>
    </div>
  );
}