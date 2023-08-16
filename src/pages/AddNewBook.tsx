import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AddNewBook() {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-80px)] gap-10 text-primary">
      <div className="max-w-3xl w-full">
        <h1 className="mb-2">
          <b>Add New Book</b>
        </h1>
        <div className="h-[60vh] border border-gray-300 rounded-md p-10 overflow-auto">
          <div className="flex gap-5">
            <div className="w-full space-y-5">
              <div>
                <Label htmlFor="title">Book Title</Label>
                <Input type="text" id="title" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="author">Book Author Name</Label>
                <Input type="text" id="author" className="mt-2" />
              </div>
            </div>
            <div className="w-full space-y-5">
              <div>
                <Label htmlFor="genres">Book Genres</Label>
                <Input type="text" id="genres" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="year">Book Publication year</Label>
                <Input type="number" id="year" className="mt-2" />
              </div>
            </div>
          </div>

          <Button className="w-full mt-10">Submit</Button>
        </div>
      </div>
    </div>
  );
}
