import type { ImagesResult } from "@/models/Images";
import { ImagesSchemaWithPhotos } from "@/models/Images";

export default async function fetchImages(
    // defining the parameter for the function and its type
  url: string
  // here we have defined the return type of the funtion either it is going to be the imagesresult or undefined
): Promise<ImagesResult | undefined> {
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: process.env.PEXELS_API_KEY,
      },
    });

    if (!res.ok) throw new Error("fetch images error!\n");
    // setting the images result with data in json format. and the type will be as we have defined in schema.
    const imagesResults: ImagesResult = await res.json();

    //parse data with zod schema
    const parsedData = ImagesSchemaWithPhotos.parse(imagesResults);
    if (parsedData.total_results === 0) return undefined;

    return parsedData;
  } catch (e) {
    if (e instanceof Error) console.log(e.stack);
  }
}
