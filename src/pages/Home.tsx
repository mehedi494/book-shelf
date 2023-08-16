import { Button } from '@/components/ui/button';
import banner from '@/assets/images/pngwing.com.png';
import hero from '@/assets/images/img9.jpeg';
import { Link } from 'react-router-dom';
import Footer from '@/layouts/Footer';

export default function Home() {
  return (
    <>
      <div className="flex justify-between items-center h-[calc(100vh-80px)] max-w-7xl mx-auto ">
        <div>
          <h1 className="text-6xl font-black text-primary mb-2">
            VRL  A NEW DIRECTION
          </h1>
          <p className="text-secondary font-semibold text-xl">
            Grow up your communication advanced knowledge
          </p>
          <div className="text-primary mt-20">
            <p>positive thinking books so that you can change your mind and take more advantage of the splendors</p>
          
          </div>
          <Button className="mt-5">Learn more</Button>
        </div>
        <div className="relative -right-48">
          <img className='w-3/4' src={banner} alt="" />
        </div>
      </div>
      <div className="mb-96">
        <div>
          <img className="mx-auto" src={hero} alt="" />
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-5xl font-black text-primary uppercase mt-10">
           Grow up your knowledge
          </h1>
          <Button className="mt-10" asChild>
            <Link to="/products">Browse all books here</Link>
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
}
