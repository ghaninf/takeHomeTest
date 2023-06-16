'use client'

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

import { CardProduct, Pagination } from "@/components"
import { convertBase64ToImageSrc } from "@/libs"
import { AuthService, ProductService } from "@/services"

const Products = () => {
  const router = useRouter();
  const [state, setState] = useState({
    user: '',
    page: []
  })
  const [page, setPage] = useState({
    page: 0,
    limit: 10,
    total: 10
  })
  const [products, setProducts] = useState([])
  
  const getData = (page, limit) => {
    ProductService.getList({ page: page, limit: limit })
      .then(res => {
        const data = res.data.map(product => ({
          ...product,
          url: convertBase64ToImageSrc(product.base64)
        }))
        setProducts(data)
        setPage(prev => ({
          ...prev,
          total: res?.page?.total || 0
        }))
      })
      .catch(error => {
        alert(error.message)
      })
  }

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    const page = window.location.pathname.split('');
    setState({
      user: user,
      page: page
    })
  }, [])

  useEffect(() => {
    // getData(page.page, page.limit)
    setProducts([
      { _id: '1', name: 'product 1', price: 10000, sell: 12000, stock: 10, imageURL: 'https://wingscorp.com/wp-content/uploads/2020/10/sk-softergent-red.png' },
      { _id: '2', name: 'product 1', price: 10000, sell: 12000, stock: 10, imageURL: 'https://wingscorp.com/wp-content/uploads/2020/10/sk-softergent-red.png' },
      { _id: '3', name: 'product 1', price: 10000, sell: 12000, stock: 10, imageURL: 'https://wingscorp.com/wp-content/uploads/2020/10/sk-softergent-red.png' },
      { _id: '4', name: 'product 1', price: 10000, sell: 12000, stock: 10, imageURL: 'https://wingscorp.com/wp-content/uploads/2020/10/sk-softergent-red.png' },
      { _id: '5', name: 'product 1', price: 10000, sell: 12000, stock: 10, imageURL: 'https://wingscorp.com/wp-content/uploads/2020/10/sk-softergent-red.png' },
      { _id: '6', name: 'product 1', price: 10000, sell: 12000, stock: 10, imageURL: 'https://wingscorp.com/wp-content/uploads/2020/10/sk-softergent-red.png' },
      { _id: '7', name: 'product 1', price: 10000, sell: 12000, stock: 10, imageURL: 'https://wingscorp.com/wp-content/uploads/2020/10/sk-softergent-red.png' },
      { _id: '8', name: 'product 1', price: 10000, sell: 12000, stock: 10, imageURL: 'https://wingscorp.com/wp-content/uploads/2020/10/sk-softergent-red.png' },
      { _id: '9', name: 'product 1', price: 10000, sell: 12000, stock: 10, imageURL: 'https://wingscorp.com/wp-content/uploads/2020/10/sk-softergent-red.png' },
      { _id: '10', name: 'product 1', price: 10000, sell: 12000, stock: 10, imageURL: 'https://wingscorp.com/wp-content/uploads/2020/10/sk-softergent-red.png' },
      { _id: '11', name: 'product 1', price: 10000, sell: 12000, stock: 10, imageURL: 'https://wingscorp.com/wp-content/uploads/2020/10/sk-softergent-red.png' },
      { _id: '12', name: 'product 1', price: 10000, sell: 12000, stock: 10, imageURL: 'https://wingscorp.com/wp-content/uploads/2020/10/sk-softergent-red.png' },
      { _id: '13', name: 'product 1', price: 10000, sell: 12000, stock: 10, imageURL: 'https://wingscorp.com/wp-content/uploads/2020/10/sk-softergent-red.png' },
      { _id: '14', name: 'product 1', price: 10000, sell: 12000, stock: 10, imageURL: 'https://wingscorp.com/wp-content/uploads/2020/10/sk-softergent-red.png' },
      { _id: '15', name: 'product 1', price: 10000, sell: 12000, stock: 10, imageURL: 'https://wingscorp.com/wp-content/uploads/2020/10/sk-softergent-red.png' },
      { _id: '16', name: 'product 1', price: 10000, sell: 12000, stock: 10, imageURL: 'https://wingscorp.com/wp-content/uploads/2020/10/sk-softergent-red.png' },
    ])
  }, [page.page])

  const handlePagination = (page) => {
    setPage(prev => ({
      ...prev,
      page: page
    }))
  }

  const navigateTo = (id) => {
    router.push(`/${state.user && state.page[1] === 'manage' ? 'manage' : 'products'}/${id}`)
  }

  return(
    <div className="relative z-0">
      <div className="flex flex-row justify-between items-center">
        <h1>Products</h1>
      </div>
      <div className={`relative mt-12 grid grid-cols-5 gap-x-8 gap-y-6`}>
        {
          products.slice(page.page * page.limit, (page.page + 1) * page.limit).map((product, key) => (
            <CardProduct key={key} item={product} isAdmin={false} open={navigateTo} />
          ))
        }
      </div>
      <Pagination page={page} callback={handlePagination} />
    </div>
  )
}

export default Products