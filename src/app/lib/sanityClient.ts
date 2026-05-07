import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanity = createClient({
    projectId: "wabyqlub",
    dataset: "production",
    useCdn: true,
    apiVersion: "2024-03-11",
});

const builder = imageUrlBuilder(sanity);

export function urlFor(source: any) {
    return builder.image(source);
}

export function getFileUrl(source: any) {
    if (!source || !source.asset || !source.asset._ref) return "";
    const ref = source.asset._ref;
    // Разбор ID для файлов (htm, pdf)
    const [_file, id, extension] = ref.split('-');
    return `https://cdn.sanity.io/files/${sanity.config().projectId}/${sanity.config().dataset}/${id}.${extension}`;
}