import { Category } from "@/app/admin/(dashboard)/category/columns";
import { addCategory, updateCategory } from "@/app/admin/action";
import { useToast } from "@/hooks/use-toast";
import { categorySchema, CategorySchema } from "@/schemas/admin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Row } from "@tanstack/react-table";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ButtonLoading } from "../custom/button-loading";
import FileUploader from "../custom/file-uploader";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface CategoryFormProps {
  className?: string;
  row?: Row<Category>; // Row data from the table component with original category data
  action: "add" | "edit" | "display";
  onClose?: () => void;
  categoryId?: string;
}

const CategoryForm = ({
  row,
  action,
  onClose,
  categoryId = "",
}: CategoryFormProps) => {
  const { toast } = useToast();
  const [showLoaderBtn, setShowLoaderBtn] = useState(false);

  const form = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: row?.original.name || "",
      image: row?.original.image || "",
    },
  });

  const handleFileChange = (file: File) => {
    form.setValue("image", file);
  };

  const onSubmit = async (data: CategorySchema) => {
    setShowLoaderBtn(true);
    // Handle form submission logic
    const formData = new FormData();
    formData.set("name", data.name);
    if (data.image) {
      formData.set("image", data.image);
    }
    if (categoryId) {
      formData.set("categoryId", categoryId);
    }
    if (action === "add") {
      const response = await addCategory(formData);
      if (response.status) {
        if (onClose) {
          onClose();
        }
      } else {
        toast({
          variant: "destructive",
          title: response.message,
          duration: 2000,
        });
      }
    } else {
      const id = row?.original?._id as string;
      const response = await updateCategory(formData, id);
      if (response.status) {
        if (onClose) {
          onClose();
        }
      } else {
        toast({
          variant: "destructive",
          title: response.message,
          duration: 2000,
        });
      }
    }
    setShowLoaderBtn(false);
  };

  return (
    <Form {...form}>
      <form
        className="grid items-start gap-4"
        onSubmit={form.handleSubmit(onSubmit)} // Use handleSubmit for form submission
      >
        <div className="grid gap-2">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field} // Spread field props
                    type="text"
                    placeholder="Enter category name"
                    id="name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-2">
          <FormField
            name="image"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <FileUploader
                    initialImage={row?.original.image || ""}
                    onFileChange={handleFileChange}
                    {...field} // Spread field props for form integration
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {!showLoaderBtn ? (
          <Button type="submit">Save changes</Button>
        ) : (
          <ButtonLoading classes="w-full" />
        )}
      </form>
    </Form>
  );
};

export default CategoryForm;
