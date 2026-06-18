import * as z from "zod";

export const blogSectionSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Section title is required"),
  content: z.string().min(1, "Section content is required"),
  image: z.string().optional(),
});

export const blogPostSchema = z.object({
  title: z.string().min(3, "Post title must be at least 3 characters"),
  category: z.string().min(1, "Please select a category"),
  featuredImage: z.string().min(1, "A featured image is required"),
  sections: z.array(blogSectionSchema).min(1, "You need at least one article section"),
});

export const uploadMediaSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  status: z.enum(["Publish", "Draft"]),
  mediaFiles: z.array(z.string()).min(1, "Please upload at least one media file"),
  project: z.string().min(1, "Project linkage is required"),
  program: z.string().min(1, "Please select an active target program"),
});

export type UploadMediaFormValues = z.infer<typeof uploadMediaSchema>;
export type BlogPostFormValues = z.infer<typeof blogPostSchema>;
export type BlogSectionValues = z.infer<typeof blogSectionSchema>;