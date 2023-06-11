import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { UserContext } from "../layout"
import { Button, CardProduct, Pagination } from "../components"

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
  
  useEffect(() => {
    setProducts([
      { _id: '1', imageURL: 'https://down-id.img.susercontent.com/file/id-11134207-7qul6-lfyy7f3x9bzx8b', name: 'Kemeja laki-laki - Hitam', price: 80000, sell: 120000, stock: 5 },
      { _id: '2', imageURL: 'https://down-id.img.susercontent.com/file/id-11134207-7qul6-lfyy7f3x9bzx8b', name: 'Kemeja laki-laki - Hitam', price: 80000, sell: 120000, stock: 5 },
      { _id: '3', imageURL: 'https://down-id.img.susercontent.com/file/id-11134207-7qul6-lfyy7f3x9bzx8b', name: 'Kemeja laki-laki - Hitam', price: 80000, sell: 120000, stock: 5 },
      { _id: '4', imageURL: 'https://down-id.img.susercontent.com/file/id-11134207-7qul6-lfyy7f3x9bzx8b', name: 'Kemeja laki-laki - Hitam', price: 80000, sell: 120000, stock: 5 },
      { _id: '5', imageURL: 'https://down-id.img.susercontent.com/file/id-11134207-7qul5-lfyy7f3xaqkd95', name: 'Kemeja laki-laki - Hitam', price: 80000, sell: 120000, stock: 5 },
      { _id: '6', imageURL: 'https://down-id.img.susercontent.com/file/id-11134207-7qul5-lfyy7f3xaqkd95', name: 'Kemeja laki-laki - Hitam', price: 80000, sell: 120000, stock: 5 },
      { _id: '7', imageURL: 'https://down-id.img.susercontent.com/file/id-11134207-7qul5-lfyy7f3xaqkd95', name: 'Kemeja laki-laki - Hitam', price: 80000, sell: 120000, stock: 5 },
      { _id: '8', imageURL: 'https://images.tokopedia.net/img/cache/700/product-1/2017/7/7/3453155/3453155_2fd813d6-d997-4c21-bd0f-df19d5e6fe5c_1000_1074.jpg.webp?ect=4g', name: 'Kemeja laki-laki - Hitam', price: 80000, sell: 120000, stock: 5 },
      { _id: '9', imageURL: 'https://images.tokopedia.net/img/cache/700/product-1/2017/7/7/3453155/3453155_2fd813d6-d997-4c21-bd0f-df19d5e6fe5c_1000_1074.jpg.webp?ect=4g', name: 'Kemeja laki-laki - Hitam', price: 80000, sell: 120000, stock: 5 },
      { _id: '10', imageURL: 'https://images.tokopedia.net/img/cache/700/product-1/2017/7/7/3453155/3453155_2fd813d6-d997-4c21-bd0f-df19d5e6fe5c_1000_1074.jpg.webp?ect=4g', name: 'Kemeja laki-laki - Hitam', price: 80000, sell: 120000, stock: 5 },
      { _id: '11', imageURL: 'https://down-id.img.susercontent.com/file/id-11134207-7qul6-lfyy7f3x9bzx8b', name: 'Kemeja laki-laki - Hitam', price: 80000, sell: 120000, stock: 5 },
      { _id: '12', imageURL: 'https://down-id.img.susercontent.com/file/id-11134207-7qul6-lfyy7f3x9bzx8b', name: 'Kemeja laki-laki - Hitam', price: 80000, sell: 120000, stock: 5 },
      { _id: '13', imageURL: 'https://down-id.img.susercontent.com/file/id-11134207-7qul6-lfyy7f3x9bzx8b', name: 'Kemeja laki-laki - Hitam', price: 80000, sell: 120000, stock: 5 },
      { _id: '14', imageURL: 'https://down-id.img.susercontent.com/file/id-11134207-7qul6-lfyy7f3x9bzx8b', name: 'Kemeja laki-laki - Hitam', price: 80000, sell: 120000, stock: 5 },
    ])
    // ProductService.getList({ page: page.page, limit: page.limit })
    //   .then(res => {
    //     setProducts(res.data)
    //     setPage(prev => ({
    //       ...prev,
    //       total: res.page.total
    //     }))
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
  }, [page.page])

  const handlePagination = (page) => {
    setPage(prev => ({
      ...prev,
      page: page
    }))
  }

  const handleEdit = (id) => {
    navigate(`/manage/${id}/update`)
  }

  const handleDelete = () => {

  }

  const navigateTo = (id) => {
    navigate(`/${user && pageURL[1] === 'manage' ? 'manage' : 'product'}/${id}`)
  }

  const handleAdd = () => {
    navigate('/product/create')
  }

  return(
    <div className="relative z-0">
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
            <CardProduct key={key} item={product} isAdmin={user && pageURL[1] === 'manage'} open={navigateTo} edit={handleEdit} delete={handleDelete} />
          ))
        }
      </div>
      <Pagination page={page} callback={handlePagination} />
    </div>
  )
}

export default Products