import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CircleX } from "lucide-react";
import { deleteProductImage } from "@/app/admin/action";
import { DrawerDialog } from "./drawer-dialog";

export interface IDeleteProductImage {
  productImageId: string;
  fileId: string;
}

export function ImageScrollArea({ images }: { images: any }) {
  const deleteImage = async (request: IDeleteProductImage) => {
    await deleteProductImage(request);
  };
  return (
    images?.length > 0 && (
      <ScrollArea className="w-full flex justify-center items-center whitespace-nowrap rounded-md border">
        <div className="flex justify-center items-center w-max space-x-4 p-4">
          {images?.map((image: any, index: number) => (
            <figure key={`Image ${index}`} className="shrink-0 relative">
              <div className="overflow-hidden rounded-md border border-gray-300 p-2 bg-white cursor-pointer">
                <DrawerDialog
                  button={
                    <Image
                      src={image.name}
                      alt={image.name}
                      className="aspect-[3/4] h-fit w-fit object-cover"
                      width={60}
                      height={60}
                    />
                  }
                >
                  <div className="flex justify-center py-2">
                    <Image
                      src={image.name}
                      alt={image.name}
                      className="aspect-[3/4] h-fit w-fit object-cover"
                      width={300}
                      height={300}
                    />
                  </div>
                </DrawerDialog>
              </div>
              <div className="absolute top-[-9] right-[-9] rounded-full shadow">
                <CircleX
                  className="w-5 h-5 text-red-500 cursor-pointer"
                  onClick={async () =>
                    await deleteImage({
                      productImageId: image?._id,
                      fileId: image?.fileId,
                    })
                  }
                />
              </div>
            </figure>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    )
  );
}
