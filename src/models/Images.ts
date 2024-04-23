// ZOD
// TypeScript-first schema validation with static type inference

import { z } from "zod";

// this schema defines the expected structure of an object containing basic information about a paginated collection of images, including the current page number, number of images per page, URLs or identifiers for the previous and next pages (if available), and the total number of images in the collection.
const BasicImageSchema = z.object({
  page: z.number(),
  per_page: z.number(),
  prev_page: z.string().optional(),
  next_page: z.string().optional(),
  total_results: z.number(),
});
//this schema defines the expected structure of an object representing a single photo, including its unique identifier, dimensions, URL, alternative text, and optionally a blurred version of the photo's data URL.
const PhotoSchema = z.object({
  id: z.number(),
  width: z.number(),
  height: z.number(),
  url: z.string(),
  src: z.object({
    large: z.string(),
  }),
  alt: z.string(),
  blurredDataUrl: z.string().optional(),
});
// So, the ImagesSchemaWithPhotos schema represents an object that contains all the properties defined in BasicImageSchema, such as pagination information (page, per_page, prev_page, next_page, total_results), along with an additional property called photos, which is an array of objects representing individual photos according to the structure defined in the PhotoSchema.
export const ImagesSchemaWithPhotos = BasicImageSchema.extend({
  photos: z.array(PhotoSchema),
});
// these lines allow you to use TypeScript types that reflect the structure defined in your Zod schemas (PhotoSchema and ImagesSchemaWithPhotos). This helps ensure type safety and consistency when working with data that adheres to these schemas.
export type Photo = z.infer<typeof PhotoSchema>;

export type ImagesResult = z.infer<typeof ImagesSchemaWithPhotos>;
