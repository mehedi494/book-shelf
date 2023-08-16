import BookCard from '@/components/BookCard';

// import { useToast } from '@/components/ui/use-toast';

import { IBook } from '@/types/globalTypes';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// import { useEffect, useState } from 'react';

export default function WishList() {
  const [productsData, setProductsData] = useState([]);

  // const { toast } = useToast();

  // let productsData;

  useEffect(() => {
    fetch('../public/data.json')
      .then((res) => res.json())
      .then((data) => setProductsData(data));
  }, []);

  // const productsData = data
  // if (status) {
  //   productsData = data?.data?.filter(
  //     (item: { status: boolean; price: number; }) => item.status === true && item.price < priceRange
  //   );
  // } else if (priceRange > 0) {
  //   productsData = data?.data.filter((item: { price: number; }) => item.price < priceRange);
  // } else {
  //   productsData = data?.data;
  // }

  return (
    <div>
      
          <h1 className='text-4xl text-center uppercase text-green-600 mb-5'>your wishlist page</h1>
          <div className="grid  max-w-7xl mx-auto  ">
        <div className="col-span-9 grid grid-cols-4 gap-5 pb-10">
          {productsData?.map((product: IBook) => (
            <BookCard product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
