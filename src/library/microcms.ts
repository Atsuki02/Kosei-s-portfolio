import { createClient } from "microcms-js-sdk";
import type {
  MicroCMSListResponse,
  MicroCMSQueries,
  MicroCMSImage,
} from "microcms-js-sdk";

type imageSrc = {
  url: string;
};

export type Gallery = {
  title: string;
  date: string;
  image: {
    fieldId: string;
    image: MicroCMSImage;
    alt: string;
  };
  imageSrc: imageSrc;
  category: string[];
  content: string;
};

export type MainImage = {
  title: string;
  date: string;
  image: {
    fieldId: string;
    image: MicroCMSImage;
    alt: string;
  };
  imageSrc: imageSrc;
  category: string[];
  content: string;
};

export type GalleriesResponse = MicroCMSListResponse<Gallery>;
export type MainImageResponse = MicroCMSListResponse<MainImage>;

const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});

export const getMainImage = async (queries?: MicroCMSQueries) => {
  return await client.get<MainImageResponse>({
    endpoint: "mainimage",
    queries,
  });
};

export const getGalleries = async (queries?: MicroCMSQueries) => {
  return await client.get<GalleriesResponse>({
    endpoint: "galleries",
    queries,
  });
};

export const getGalleryList = async (
  galleryId: string,
  queries?: MicroCMSQueries
) => {
  return await client.getListDetail<Gallery>({
    endpoint: "vouge",
    contentId: galleryId,
    queries,
  });
};
