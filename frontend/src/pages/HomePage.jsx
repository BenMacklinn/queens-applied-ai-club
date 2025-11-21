import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';
import Statistics from '../components/Statistics';
import CategorySection from '../components/CategorySection';
import Footer from '../components/Footer';

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <SectionTitle />
      <CategorySection />
      <Statistics />
      <Footer />
    </>
  );
}

export default HomePage;

