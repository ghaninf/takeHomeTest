import { generateCurrency } from "../../utils";

import iconDelete from '../../assets/icon-delete-gray.svg';
import iconEdit from '../../assets/icon-pen-edit-gray.svg';

export default function CardProduct(props) {
  return(
    <div className="relative w-full min-h-[360px] max-h-[360px] p-4 border rounded box-border drop-shadow bg-white cursor-pointer hover:drop-shadow-lg hover:-mt-1 hover:-ml-1 ">
      {
        props?.isAdmin &&
        <div className="absolute top-4 right-4 flex flex-col z-10">
          <img onClick={() => props.edit(props.item._id)} src={iconEdit} alt="edit" className="w-[24px] h-[24px] border border-zinc-300 cursor-pointer bg-white hover:bg-stone-300" />
          <img onClick={() => props.delete(props.item._id)} src={iconDelete} alt="delete" className="w-[24px] h-[24px] border border-zinc-300 cursor-pointer bg-white hover:bg-stone-300" />
        </div>
      }
      <div onClick={() => props.open(props.item._id)} className="relative flex flex-col gap-2 justify-start">
        <div className="relative max-w-[159px] max-h-[159px] min-h-[159px] mb-4 overflow-hidden">
          <img src={props.item.imageURL} alt="product" className="relative w-full h-full max-h-auto object-cover" />
        </div>
        <h4>{props.item.name}</h4>
        <h4>Rp {generateCurrency(props.item.sell)}</h4>
        <h5>Stock: {props.item.stock}</h5>
      </div>
    </div>
  )
}