import HeroSection from "@/components/Sections/Home/HeroSection";
import RecentVideos from "@/components/Sections/Home/RecentVideos";
import CursosSection from "@/components/Sections/Home/CursosSection";
import LibroSection from "@/components/Sections/Home/LibroSection";
import ContactSection from "@/components/Sections/Home/ContactSection";
import ScrollToTop from "@/components/ScrollToTop";
import usePageTitle from "@/hooks/usePageTitle";

const Home = () => {
  usePageTitle("Cursos, libros, materiales, videos y mucho más...");
  return (
    <>
      <ScrollToTop />
      {/* HERO */}
      <HeroSection />

      {/* RECENT VIDEOS */}
      <section className="bg-black text-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start sm:items-center text-left sm:text-center">
            <h2 className="text-2xl sm:text-3xl font-bold">Videos recientes</h2>
            <p className="mt-2 text-white/80 max-w-2xl">
              Últimos contenidos del canal de YouTube.
            </p>
          </div>
          <div className="mt-6">
            {/* RECENT VIDEOS */}
            <RecentVideos channelId="UC-qOy02aIifNhM6eHMgZeuQ" maxResults={3} />
          </div>

          {/* BTN ver más videos */}
          <div className="mt-8 text-center">
            <a
              href="https://www.youtube.com/@ProfesorSantiago"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md bg-white px-5 py-3 font-semibold text-black hover:bg-white/90 transition"
            >
              Ver mas videos
            </a>
          </div>
        </div>
      </section>

      {/* CURSOS */}
      <CursosSection />

      {/* LIBRO */}
      <LibroSection />

      {/* CONTACTO */}
      <ContactSection />
    </>
  );
};

export default Home;
