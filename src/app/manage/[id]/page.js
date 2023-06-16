'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Breadcrumbs, Button, PopupConfirmation } from "@/components";
import { AuthService, ProductService } from "@/services"
import { generateCurrency } from "@/utils";
import { convertBase64ToImageSrc } from "@/libs";

import IconDelete from '../../../public/icon-delete-white.svg';
import IconEdit from '../../../public/icon-pen-edit-white.svg';

const ManageProductDetail = () => {
  const router = useRouter();
  const [state, setState] = useState({
    page: [],
    user: ''
  })
  const [product, setProduct] = useState({
    _id: '',
    imageURL: '',
    name: '',
    price: 0,
    sell: 0,
    stock: 0
  });
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    const page = window.location.pathname.split('/')
    setState({
      user: user,
      page: page
    })
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

  const handleDelete = (id) => {
    ProductService.delete(id)
      .then(() => {
        router.push('/manage');
      })
      .catch(error => {
        alert(error.message)
      })
  }

  const openPopup = () => {
    setPopup(<PopupConfirmation confirm={() => handleDelete(state.page[2])} cancel={() => setPopup(null)} />);
  }

  const handleEdit = () => {
    router.push(`/manage/update/${state.page[2]}`);
  }

  return(
    <div className="relative z-0">
      {popup}
      <div className="flex flex-row justify-between items-center">
        <Breadcrumbs title={product?.name} />
        {
          state.user && state.page[1] === 'manage' ?
            <div className="flex flex-row gap-4">
              <Button text="Delete Product" icon={IconDelete} positionIcon={'left'} onClick={openPopup} typeColor={'secondary'} />
              <Button text="Edit Product" icon={IconEdit} positionIcon={'left'} onClick={handleEdit} typeColor={'primary'} />
            </div>
          : ''
        }
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


export default ManageProductDetail