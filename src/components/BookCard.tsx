import { IBook } from '@/types/globalTypes';
import { toast } from './ui/use-toast';
import { Button } from './ui/button';
import { Link, useLocation } from 'react-router-dom';


interface IProps {
  product: IBook;
}

export default function BookCard({ product }: IProps) {
  const {pathname}= useLocation()
  const handleAddProduct = (product: IBook) => {

    
    toast({
      description: 'Product Added',
    });
  };
  return (
    <div>
      <div className="rounded-xl h-[480px] flex flex-col items-start justify-between p-5 overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:scale-[102%] transition-all gap-2">
      
        <Link to={`/product-details/${product._id}`} >
          <img src={product?.image} alt="product" />
          <h1 className="text-xl font-semibold">{product?.title.slice(0,17)}</h1>
        </Link>
     
        <p>Author: {product.author }</p>
        <p className="text-sm">
          Genre: { product?.genre}
        </p>
        <p className="text-sm">
          Published: { product?.publication_date}
        </p>
        
       {pathname !=="/wishlist" && <Button variant="outline" >
          Add to Wishlist
        </Button>}
      </div>
    </div>
  );
}
