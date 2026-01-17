

import HeroSection from "./HeroSection";
import FeaturedProducts from "./FeaturedProducts";
import HowItWorks from './HowItWorks';
import OurMission from './OurMission';

const Home = () => {
  

  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <title>Home | Plateshare</title>
    
      <HeroSection></HeroSection>

    
      <FeaturedProducts></FeaturedProducts>

  
     <HowItWorks></HowItWorks>


      <OurMission></OurMission>

      
    </div>
  );
};

export default Home;






