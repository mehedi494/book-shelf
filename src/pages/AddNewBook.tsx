import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAddNewBookMutation } from '@/redux/features/books/bookApi';
import { useForm } from 'react-hook-form';
import {toast} from '../components/ui/use-toast'

interface IAddNewbook{
  title: string;
  author: string;
  genre: string;
  publication_date: string;
  image: string;
}

export default function AddNewBook() {

  const [postNewBook, { isSuccess, isError }] = useAddNewBookMutation()
  const {
    register,
    handleSubmit,
  } = useForm<IAddNewbook>();

  const onSubmit = (data: IAddNewbook) => {
    const token = localStorage.getItem('accessToken')
    const options = {
      token, data
    }
    console.log(options)
    postNewBook(options)
  };

  if (isSuccess) {
    toast({
      description: "Success add new book 🎉"
    })
  }
    if (isError) {
      toast({
        description: "Faild to add book ⚠ "
      })
    }



    return (
      <div className="flex justify-center items-center h-[calc(100vh-80px)] gap-10 text-primary">
        <div className="max-w-3xl w-full">
          <h1 className="mb-2">
            <b>Add New Book</b>
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="h-[60vh] border border-gray-300 rounded-md p-10 overflow-auto">
              <div className="flex gap-5">
                <div className="w-full space-y-5">
                  <div>
                    <Label htmlFor="title">Book Title</Label>
                    <Input
                      id="title"
                      placeholder="title"
                      type="text"
                      autoCapitalize="none"
                      autoComplete="text"
                      autoCorrect="off"
                      {...register('title', { required: 'title is required' })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="author">Book Author Name</Label>
                    <Input
                      id="author"
                      placeholder="author"
                      type="text"
                      autoCapitalize="none"
                      autoComplete="text"
                      autoCorrect="off"
                      {...register('author', { required: 'author is required' })}
                    />
                  </div>
                </div>
                <div className="w-full space-y-5">
                  <div>
                    <Label htmlFor="genre">Book Genres</Label>
                    <Input
                      id="genre"
                      placeholder="genre"
                      type="text"
                      autoCapitalize="none"
                      autoComplete="text"
                      autoCorrect="off"
                      {...register('genre', { required: 'genre is required' })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="year">Book Publication year</Label>
                    <Input
                      id="publication"
                      placeholder="publication"
                      type="text"
                      autoCapitalize="none"
                      autoComplete="text"
                      autoCorrect="off"
                      {...register('publication_date', { required: 'publication year is required' })}
                    />
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="image">Image Url</Label>
                <Input
                  id="image"
                  placeholder="image"
                  type="text"
                  autoCapitalize="none"
                  autoComplete="text"
                  autoCorrect="off"
                  {...register('image', { required: 'image is required' })}
                />
              </div>
              <Button className="w-full mt-10">Submit</Button>
            </div>
          </form>
        </div>
      </div>
    );
  }

