"use client";
import ProductVariantDataTable, {
  Variant,
} from "@/app/admin/(dashboard)/product/add/data-table";
import { addProduct, updateProduct } from "@/app/admin/action";
import { Button } from "@/components/ui/button";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-upload";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { CloudUpload, Paperclip } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ButtonLoading } from "../custom/button-loading";
import { Textarea } from "../ui/textarea";
import { ImageScrollArea } from "../custom/image-scrollarea";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  images: z.array(z.any()),
  price: z.string().min(1, "Price is required"),
  quantity: z.string().min(1, "Quantity is required"),
});

export default function ProductForm({
  initialValues = {
    name: "",
    category: "",
    description: "",
    images: [],
    price: "",
    quantity: "",
  },
  productVariants = [],
  categories = [],
  type = "add",
  id = "",
  productImages = [],
}: {
  initialValues?: z.infer<typeof formSchema>;
  categories: { _id: string; name: string }[];
  productVariants?: Variant[];
  type?: "add" | "edit";
  id?: string;
  productImages?: any[];
}) {
  const [showLoaderBtn, setShowLoaderBtn] = useState(false);
  const [variants, setVariants] = useState<Variant[]>(productVariants);
  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });
  const router = useRouter();

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setShowLoaderBtn(true);
      const formData = new FormData();
      formData.set("name", values.name);
      formData.set("categoryId", values.category);
      formData.set("description", values.description);
      formData.set("price", values.price);
      formData.set("quantity", values.quantity);
      formData.set("description", values.description);

      for (const image of values?.images) {
        if (typeof image === "object" && "path" in image) {
          formData.append("images", image);
        }
      }
      // Handle product variants
      formData.set("productVariants", JSON.stringify(variants)); // Convert the array to a JSON string

      let response: any = { status: 1, message: "", data: {} };
      if (type === "add") {
        response = await addProduct(formData);
        if (response?.status) {
          const id: string = response?.data?._id;
          const type: string = response?.data?.type;
          router.push(`/admin/product/${type}?id=${id}`);
        }
      } else {
        response = await updateProduct(formData, id);
      }
      if (response.status) {
        form.setValue("images", []);
        toast({
          title: response.message,
          duration: 2000,
        });
      } else {
        toast({
          variant: "destructive",
          title: response.message,
          duration: 2000,
        });
      }
      setShowLoaderBtn(false);
    } catch (error: any) {
      setShowLoaderBtn(false);
      toast({
        variant: "destructive",
        title: error.message,
        duration: 2000,
      });
    }
  };

  return (
    <>
      <div className="space-y-8 max-w-3xl mx-auto">
        <h1 className="font-bold text-2xl">
          {initialValues?.name || "New Product"}
        </h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-8 max-w-3xl mx-auto pb-10 pt-5"
        >
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter product name"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-6">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select product category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category._id} value={category._id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Price" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Quantity"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <div className="grid w-full gap-1.5">
                    <Textarea
                      placeholder="Type your product description here."
                      id="description"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <ImageScrollArea images={productImages} />
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload product images</FormLabel>
                <FormControl>
                  <FileUploader
                    value={field.value}
                    onValueChange={(files) => field.onChange(files)}
                    dropzoneOptions={dropZoneConfig}
                    className="relative bg-background rounded-lg p-2"
                  >
                    <FileInput
                      id="fileInput"
                      className="outline-dashed outline-1 outline-slate-500"
                    >
                      <div className="flex items-center justify-center flex-col p-8 w-full">
                        <CloudUpload className="text-gray-500 w-10 h-10" />
                        <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>
                          &nbsp; or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG, or GIF
                        </p>
                      </div>
                    </FileInput>
                    <FileUploaderContent>
                      {field.value.map((file, i) => {
                        return (
                          <FileUploaderItem key={i} index={i}>
                            <Paperclip className="h-4 w-4 stroke-current" />
                            <span>{file.name}</span>
                          </FileUploaderItem>
                        );
                      })}
                    </FileUploaderContent>
                  </FileUploader>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <FormLabel>Add Variants</FormLabel>
            <ProductVariantDataTable
              data={variants}
              setVariants={setVariants}
            />
          </div>
          {!showLoaderBtn ? (
            <Button type="submit" className="w-full">
              Save changes
            </Button>
          ) : (
            <ButtonLoading classes="w-full" />
          )}
        </form>
      </Form>
    </>
  );
}
