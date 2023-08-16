import BookCard from '@/components/BookCard';


// import { useToast } from '@/components/ui/use-toast';

import { IBook } from '@/types/globalTypes';
import { useEffect, useState } from 'react';
import {FaFilter} from "react-icons/fa"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// import { useEffect, useState } from 'react';

export default function Allbooks() {
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
    <div className="grid grid-cols-12 max-w-7xl mx-auto relative ">
      <div className="col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start sticky top-16 h-[calc(100vh-80px)]">
       
        <div className="space-y-3 ">
          <h1 className="text-2xl uppercase">FILTER <FaFilter className="inline"/></h1>
          <div className="max-w-xl">
            <div className="flex items-center space-x-2">
              <Input placeholder="By genre" name="genre" id="genre"></Input>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Input
                placeholder="By publication year"
                name="genre"
                id="genre"
              ></Input>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Button className='w-full' variant={'secondary'}>Find</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-9 grid grid-cols-3 gap-10 pb-20">
        {productsData?.map((product: IBook) => (
          <BookCard product={product} />
        ))}
      </div>
    </div>
  );
}
