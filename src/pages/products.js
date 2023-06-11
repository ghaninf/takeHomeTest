import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { UserContext } from "../layout"
import { Button, CardProduct, Pagination, PopupConfirmation } from "../components"

import { ProductService } from "../services"

import IconAdd from '../assets/icon-button-plus.svg';

const Products = () => {
  const { user, pageURL } = useContext(UserContext)
  const navigate = useNavigate();
  const [page, setPage] = useState({
    page: 0,
    limit: 10,
    total: 14
  })
  const [products, setProducts] = useState([])
  const [popup, setPopup] = useState(null)
  
  const getData = (page, limit) => {
    ProductService.getList({ page: page, limit: limit })
      .then(res => {
        setProducts(res.data)
        setPage(prev => ({
          ...prev,
          total: res.page.total
        }))
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    getData(page.page, page.limit)
  }, [page.page])

  const handlePagination = (page) => {
    setPage(prev => ({
      ...prev,
      page: page
    }))
  }

  const handleDelete = (id) => {
    ProductService.delete(id)
      .then(() => {
        getData(page.page, page.limit)
      })
      .catch(error => {
        console.log(error.message)
      })
  }

  const openPopup = (id) => {
    setPopup(<PopupConfirmation confirm={() => handleDelete(id)} cancel={() => setPopup(null)} />)
  }

  const handleEdit = (id) => {
    navigate(`/manage/update/${id}`)
  }

  const navigateTo = (id) => {
    navigate(`/${user && pageURL[1] === 'manage' ? 'manage' : 'products'}/${id}`)
  }

  const handleAdd = () => {
    navigate('/manage/create')
  }

  return(
    <div className="relative z-0">
      {popup}
      <div className="flex flex-row justify-between items-center">
        <h1>Products</h1>
        {
          user && pageURL[1] === 'manage' ?
            <Button text="Add Product" icon={IconAdd} positionIcon={'left'} onClick={handleAdd} typeColor={'primary'} /> : ''
        }
      </div>
      <div className={`relative mt-12 grid grid-cols-5 gap-x-8 gap-y-6`}>
        {
          products.slice(page.page * page.limit, (page.page + 1) * page.limit).map((product, key) => (
            <CardProduct key={key} item={product} isAdmin={user && pageURL[1] === 'manage'} open={navigateTo} edit={handleEdit} delete={openPopup} />
          ))
        }
      </div>
      <Pagination page={page} callback={handlePagination} />
    </div>
  )
}

export default Products