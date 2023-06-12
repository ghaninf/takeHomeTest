import { useContext, useEffect, useState } from "react"
import {  useNavigate } from "react-router-dom";

import { UserContext } from "../layout"
import { ProductService } from "../services"
import { Breadcrumbs, Button, PopupConfirmation } from "../components"
import { generateCurrency } from "../utils";

import IconDelete from '../assets/icon-delete-white.svg';
import IconEdit from '../assets/icon-pen-edit-white.svg';
import { convertBase64ToImageSrc } from "../libs";

const ProductDetails = () => {
  const { user, pageURL } = useContext(UserContext);
  const navigate = useNavigate();
  const [state, setState] = useState({
    _id: '',
    name: '',
    price: 0,
    sell: 0,
    stock: 0
  });
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    ProductService.getDetail(pageURL[2])
      .then(res => {
        setState({
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
        navigate('/manage');
      })
      .catch(error => {
        alert(error.message)
      })
  }

  const openPopup = () => {
    setPopup(<PopupConfirmation confirm={() => handleDelete(pageURL[2])} cancel={() => setPopup(null)} />);
  }

  const handleEdit = () => {
    navigate(`/manage/update/${pageURL[2]}`);
  }

  return(
    <div className="relative z-0">
      {popup}
      <div className="flex flex-row justify-between items-center">
        <Breadcrumbs title={state?.name} />
        {
          user && pageURL[1] === 'manage' ?
            <div className="flex flex-row gap-4">
              <Button text="Delete Product" icon={IconDelete} positionIcon={'left'} onClick={openPopup} typeColor={'secondary'} />
              <Button text="Edit Product" icon={IconEdit} positionIcon={'left'} onClick={handleEdit} typeColor={'primary'} />
            </div>
          : ''
        }
      </div>
      <div className={'relative mt-8 flex flex-row flex-nowrap gap-x-8'}>
        <div className="relative w-full max-w-[400px] h-auto max-h-[400px] cursor-pointer border border-zinc-300 rounded overflow-hidden">
          <img src={state?.imageURL} alt="product_image" className="block w-full h-full object-cover" />
        </div>
        <div>
          <h3>Product Detail</h3>
          <div className="grid grid-cols-8 gap-x-4">
            <h4 className="row-start-1 col-start-1">Name</h4>
            <h4 className="row-start-1 col-start-2 col-end-8"> : {state?.name}</h4>
            <h4 className="row-start-2 col-start-1">Price</h4>
            <h4 className="row-start-2 col-start-2 col-end-8"> : Rp {generateCurrency(state?.sell)}</h4>
            <h4 className="row-start-3 col-start-1">Stock</h4>
            <h4 className="row-start-3 col-start-2 col-end-8"> : {state?.stock}</h4>
          </div>
        </div>
      </div>
    </div>
  )
}


export default ProductDetails