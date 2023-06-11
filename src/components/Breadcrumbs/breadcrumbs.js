import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../layout";

export default function Breadcrumbs({ title }) {
  const navigate = useNavigate();
  const { pageURL } = useContext(UserContext)
  
  return(
    <div className="flex flex-row flex-nowrap gap-x-4 text-zinc-500">
      <h3 onClick={() => navigate(`/${pageURL[1]}`)} className="capitalize cursor-pointer hover:text-zinc-800">{pageURL[1]}</h3>
      <h3 >{' > '}</h3>
      <h3 >{ title }</h3>
    </div>
  )
}