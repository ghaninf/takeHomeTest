'use client'

import { useEffect, useState } from "react";
import Image from "next/image";

import { Breadcrumbs} from "@/components";
import { ProductService } from "@/services"
import { generateCurrency } from "@/utils";
import { convertBase64ToImageSrc } from "@/libs";

const ProductDetails = () => {
  const [product, setProduct] = useState({
    _id: '',
    imageURL: '',
    name: '',
    price: 0,
    sell: 0,
    stock: 0
  });

  useEffect(() => {
    ProductService.getDetail(page[2])
      .then(res => {
        setProduct({
          ...res,
          imageURL: convertBase64ToImageSrc(res.base64)
        });
      })
      .catch(error => {
        alert(error.message)
      })
  }, [])

  return(
    <div className="relative z-0">
      <div className="flex flex-row justify-between items-center">
        <Breadcrumbs title={product?.name} />
      </div>
      <div className={'relative mt-8 flex flex-row flex-nowrap gap-x-8'}>
        <div className="relative w-full max-w-[400px] h-auto max-h-[400px] cursor-pointer border border-zinc-300 rounded overflow-hidden">
          <Image
            fill
            sizes={'100%'}
            src={product?.imageURL}
            alt="product_image"
            className="block w-full h-full object-cover"
          />
        </div>
        <div>
          <h3>Product Detail</h3>
          <div className="grid grid-cols-8 gap-x-4">
            <h4 className="row-start-1 col-start-1">Name</h4>
            <h4 className="row-start-1 col-start-2 col-end-8"> : {product?.name}</h4>
            <h4 className="row-start-2 col-start-1">Price</h4>
            <h4 className="row-start-2 col-start-2 col-end-8"> : Rp {generateCurrency(product?.sell)}</h4>
            <h4 className="row-start-3 col-start-1">Stock</h4>
            <h4 className="row-start-3 col-start-2 col-end-8"> : {product?.stock}</h4>
          </div>
        </div>
      </div>
    </div>
  )
}


export default ProductDetails