import BookReview from '@/components/BookReview';
import { Button } from '@/components/ui/button';
import { useSingleProductsQuery } from '@/redux/features/products/productApi';
import { useEffect, useState } from 'react';


import { useParams } from 'react-router-dom';
import { IBook } from './../types/globalTypes';

export default function BookDetails() {
  const { id } = useParams();
  // const { data: product } = useSingleProductsQuery(id);
const [data, setData]= useState([])
  useEffect(() => {
    fetch("../../public/data.json").then(res=>res.json()).then(data=>setData(data))
  },[])
const product:IBook  = data.find((x:IBook) => x._id === id)

  return (
    <>
      <div className="flex max-w-7xl mx-auto items-center border-b border-gray-300">
        <div className="w-[50%]">
          <img src={product?.image} alt="" />
        </div>
        <div className="w-[50%] space-y-3">
          <h1 className="text-3xl font-semibold">{product?.title}</h1>
          <p className="text-xl">Author: {product?.author}</p>
          <p className="text-xl">Published: {product?.publication_date}</p>
          {/* <ul className="space-y-1 text-lg">
            {product?.reviews?.map((feature:string) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul> */}
          <Button>Add to cart</Button>
        </div>
      </div>
      
      <BookReview id={id!} />
    </>
  );
}
