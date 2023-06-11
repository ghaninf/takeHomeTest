import { useContext, useEffect, useState } from "react"
import { UserContext } from "../layout"
import { ProductService } from "../services"
import { Breadcrumbs, Button, PopupConfirmation } from "../components"

import IconDelete from '../assets/icon-delete-white.svg';
import IconEdit from '../assets/icon-pen-edit-white.svg';
import { useLocation, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const { user, pageURL } = useContext(UserContext)
  const navigate = useNavigate();
  const [state, setState] = useState({
    _id: '1', imageURL: 'https://down-id.img.susercontent.com/file/id-11134207-7qul6-lfyy7f3x9bzx8b', name: 'Kemeja laki-laki - Hitam', price: 80000, sell: 120000, stock: 5
  })
  const [popup, setPopup] = useState(null)

  useEffect(() => {
    // ProductService.getDetail(pageURL[2])
    //   .then(res => {
    //     setState(res)
    //   })
    //   .catch(error => {
    //     console.log(error.message)
    //   })
  }, [])

  const handleDelete = () => {
    setPopup(<PopupConfirmation />)
  }

  const handleEdit = () => {
    navigate(`/manage/${pageURL[2]}/update`)
  }

  return(
    <div className="relative z-0">
      <div className="flex flex-row justify-between items-center">
        <Breadcrumbs title={state?.name} />
        {
          user && pageURL[1] === 'manage' ?
            <div className="flex flex-row gap-4">
              <Button text="Delete Product" icon={IconDelete} positionIcon={'left'} onClick={handleDelete} typeColor={'secondary'} />
              <Button text="Edit Product" icon={IconEdit} positionIcon={'left'} onClick={handleEdit} typeColor={'primary'} />
            </div>
          : ''
        }
      </div>
      <div className={`relative mt-12 flex flex-row flex-nowrap`}>
        <div className="relative w-96 min-w-[384px] h-full max-h-[384px]">
          <img src={state?.imageURL} alt="product_image" className="w-full h-auto object-cover" />
        </div>
        <div>
          <h3>Product Detail</h3>
          <div className="grid grid-cols-8 gap-x-4">
            <h4 className="row-start-1 col-start-1">Name</h4>
            <h4 className="row-start-1 col-start-2 col-end-8"> : {state?.name}</h4>
            <h4 className="row-start-2 col-start-1">Price</h4>
            <h4 className="row-start-2 col-start-2 col-end-8"> : {state?.price}</h4>
            <h4 className="row-start-3 col-start-1">Stock</h4>
            <h4 className="row-start-3 col-start-2 col-end-8"> : {state?.stock}</h4>
          </div>
        </div>
      </div>
      {popup}
    </div>
  )
}


export default ProductDetails