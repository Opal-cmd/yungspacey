import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Soundbank } from "@/components/Soundbank";
import { Services } from "@/components/Services";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <main className="bg-black">
      <Nav />
      <Hero />
      <Soundbank />
      <Services />
      <Contact />
    </main>
  );
}
