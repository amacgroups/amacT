import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Products from '@/components/Products';
import WhyChooseUs from '@/components/WhyChooseUs';
import Process from '@/components/Process';
import QuoteSection from '@/components/QuoteSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-emerald-500 selection:text-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Products />
        <WhyChooseUs />
        <Process />
        <QuoteSection />
      </main>
      <Footer />
    </div>
  );
}
