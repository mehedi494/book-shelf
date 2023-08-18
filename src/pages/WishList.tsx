import BookCard from '@/components/BookCard';
import { useAppSelector } from '@/redux/app/hook';

// import { useToast } from '@/components/ui/use-toast';

import { IBook } from '@/types/globalTypes';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// import { useEffect, useState } from 'react';

export default function WishList() {

  const { wishlist,total } = useAppSelector((state) => state.wishlist)
 
  // const [productsData, setProductsData] = useState([]);

  // const { toast } = useToast();

  // let productsData;

  // useEffect(() => {
  //   fetch('../public/data.json')
  //     .then((res) => res.json())
  //     .then((data) => setProductsData(data));
  // }, []);

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
      
      <h1 className='text-xl text-end  m-4 text-muted-foreground mb-5'>Wishlist total: <b>{ total}</b>  </h1>
          <div className="grid  max-w-7xl mx-auto  ">
        <div className="col-span-9 grid grid-cols-4 gap-5 pb-10">
          {wishlist?.map((product: IBook) => (
            <BookCard product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
