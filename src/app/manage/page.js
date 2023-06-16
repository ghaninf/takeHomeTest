'use client'

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

import { Button, CardProduct, Pagination, PopupConfirmation } from "@/components"
import { convertBase64ToImageSrc } from "@/libs"
import { AuthService, ProductService } from "@/services"

import IconAdd from '@/public/icon-button-plus.svg';

const Manage = () => {
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
  const [popup, setPopup] = useState(null)
  
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
      { _id: '1', name: 'product 1', price: 10000, sell: 12000, stock: 10 },
      { _id: '2', name: 'product 1', price: 10000, sell: 12000, stock: 10 },
      { _id: '3', name: 'product 1', price: 10000, sell: 12000, stock: 10 },
      { _id: '4', name: 'product 1', price: 10000, sell: 12000, stock: 10 },
      { _id: '5', name: 'product 1', price: 10000, sell: 12000, stock: 10 },
      { _id: '6', name: 'product 1', price: 10000, sell: 12000, stock: 10 },
      { _id: '7', name: 'product 1', price: 10000, sell: 12000, stock: 10 },
      { _id: '8', name: 'product 1', price: 10000, sell: 12000, stock: 10 },
      { _id: '9', name: 'product 1', price: 10000, sell: 12000, stock: 10 },
      { _id: '10', name: 'product 1', price: 10000, sell: 12000, stock: 10 },
      { _id: '11', name: 'product 1', price: 10000, sell: 12000, stock: 10 },
      { _id: '12', name: 'product 1', price: 10000, sell: 12000, stock: 10 },
      { _id: '13', name: 'product 1', price: 10000, sell: 12000, stock: 10 },
      { _id: '14', name: 'product 1', price: 10000, sell: 12000, stock: 10 },
      { _id: '15', name: 'product 1', price: 10000, sell: 12000, stock: 10 },
      { _id: '16', name: 'product 1', price: 10000, sell: 12000, stock: 10 },
    ])
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
        alert(error.message)
      })
  }

  const openPopup = (id) => {
    setPopup(<PopupConfirmation confirm={() => handleDelete(id)} cancel={() => setPopup(null)} />)
  }

  const handleEdit = (id) => {
    router.push(`/manage/update/${id}`)
  }

  const navigateTo = (id) => {
    router.push(`/${state.user && state.page[1] === 'manage' ? 'manage' : 'products'}/${id}`)
  }

  const handleAdd = () => {
    router.push('/manage/create')
  }

  return(
    <div className="relative z-0">
      {popup}
      <div className="flex flex-row justify-between items-center">
        <h1>Products</h1>
        {
          state.user && state.page[1] === 'manage' ?
            <Button text="Add Product" icon={IconAdd} positionIcon={'left'} onClick={handleAdd} typeColor={'primary'} /> : ''
        }
      </div>
      <div className={`relative mt-12 grid grid-cols-5 gap-x-8 gap-y-6`}>
        {
          products.slice(page.page * page.limit, (page.page + 1) * page.limit).map((product, key) => (
            <CardProduct key={key} item={product} isAdmin={state.user && state.page[1] === 'manage'} open={navigateTo} edit={handleEdit} delete={openPopup} />
          ))
        }
      </div>
      <Pagination page={page} callback={handlePagination} />
    </div>
  )
}

export default Manage