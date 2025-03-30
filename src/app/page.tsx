import Appbar from "@/components/Appbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Main from "@/components/Main";
import Samples from "@/components/Samples";

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col justify-between">
      <div className="flex justify-center pt-6">
        <Appbar />
      </div>
      <div className="flex-grow flex flex-col items-center justify-center gap-6 max-sm:gap-5 py-4">
        <Hero />
        <Main />
        <Samples />
      </div>
      <div className="flex justify-center pb-4">
        <Footer />
      </div>
    </div>
  );
}
