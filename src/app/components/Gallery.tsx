import fetchImages from "@/lib/fetchImages";
import { ImagesResult } from "@/models/Images";

import React from "react";

const Gallery = async () => {
  const url = "https://api.pexels.com/v1/curated";
  const images: ImagesResult | undefined = await fetchImages(url);
  if (!images)
    return <h2 className="m-4 text-2xl font-bold">No Images Found</h2>;
  return (
    <section className="px-2 my-3 grid gap-2 grid-cols-gallery">
      {images.photos.map((photo) => (
        <div key={photo.id} className="h-64 bg-gray-200 rounded-xl">{photo.src.large}</div>
      ))}
    </section>
  );
};

export default Gallery;
