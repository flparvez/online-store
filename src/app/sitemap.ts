import { MetadataRoute } from "next";

export default async function sitemap() {
    const response = await fetch(`https://uniquestorebd.netlify.app/api/product/`).then((res) => res.json())
const products = response.products;
    const baseUrl ="https://uniquestorebd.netlify.app/"
const allProducts = products?.map((product:any) =>{
   return {
    url:`${baseUrl}/product/${product?.slug}`,
    lastModified: product?.createdAt,
   }
} )

    return [{
        url: baseUrl,
        lastModified: new Date(),
    },
    ...allProducts
]
}