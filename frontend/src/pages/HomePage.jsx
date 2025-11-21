import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';
import Statistics from '../components/Statistics';
import CategorySection from '../components/CategorySection';
import SectionTransition from '../components/SectionTransition';
import Footer from '../components/Footer';

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <SectionTitle />
      <CategorySection />
      <SectionTransition />
      <Statistics />
      <Footer />
    </>
  );
}

export default HomePage;

