import { z } from "zod";

// Define the schema
export const categorySchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  image: z
    .union([z.instanceof(File), z.string().min(1, "Image is required")]) // Either File or non-empty string
    .refine((image) => {
      // If it's a File, ensure it has a valid size
      if (image instanceof File) {
        return image.size > 0; // Ensure the file is not empty
      }
      // If it's a string, ensure it's not empty
      return image.length > 0;
    }, "Image is required"),
});

// Define the TypeScript type
export type CategorySchema = z.infer<typeof categorySchema>;
