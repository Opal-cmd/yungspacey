import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Soundbank } from "@/components/Soundbank";
import { Services } from "@/components/Services";
import { Contact } from "@/components/Contact";
import { JsonLd } from "@/components/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:text-black"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main" className="bg-black">
        <Hero />
        <Soundbank />
        <Services />
        <Contact />
      </main>
    </>
  );
}
