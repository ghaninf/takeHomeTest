import { useEffect, useState } from "react"
import Image from 'next/image'

import IconArrowLeft from '../../public/icon-arrow-left-pagination.svg';
import IconArrowRight from '../../public/icon-arrow-right-pagination.svg';

export default function Pagination({ page, callback }) {
  const [state, setState] = useState({
    page: 1,
    lastPage: 2,
    totalIndex: 5,
    pagination: [],
    hiddenPrev: true,
    hiddenNext: false
  })
  
  useEffect(() => {
    setState(prev => ({
      ...prev,
      lastPage: Math.ceil(page?.total / page?.limit),
      pagination: generateIndex(page.page + 1, Math.ceil(page?.total / page?.limit))
    }))
  }, [page.page])

  const generateIndex = (page, lastPage) => {
    let pagination = state.pagination
    if (!pagination.includes(page)) {
      pagination = []
      for (let index = page; index < state.totalIndex + page; index++) {
        if (index > lastPage) {
          pagination.push('')
          continue;
        }
        pagination.push(index)
      }
    }
    return pagination
  }
  
  const paginate = (index) => {
    callback(index)
    setState(prev => ({
      ...prev,
      page: index,
      hiddenPrev: index === 0 ? true : false,
      hiddenNext: index >= state.lastPage - 1 ? true : false
    }))
  }

  return(
    <div className="relative w-full h-auto mt-12">
      <div className="relative flex flex-row flex-nowrap gap-x-8 justify-center items-center">
      <span onClick={() => state.hiddenPrev ? null : paginate(page.page - 1)} className={`${state.hiddenPrev ? 'opacity-50' : 'text-zinc-500 cursor-pointer hover:text-zinc-700'}`}>
        <Image
          alt="prev"
          src={IconArrowLeft}
          width={12}
          height={12}
        />
      </span>
        {
          state.pagination.map((el, key) => (
            <span key={key} onClick={() => el === '' ? null : paginate(key)} className={`text-xl cursor-pointer ${el === page.page + 1 ? 'text-zinc-700 border-b border-zinc-700' : 'text-zinc-500 hover:text-zinc-700 hover:drop-shadow-lg hover:-mt-2'}`}>{el}</span>
          ))
        }
      <span onClick={() => state.hiddenNext ? null : paginate(page.page + 1)} className={`${state.hiddenNext ? 'opacity-50' : 'text-zinc-500 cursor-pointer hover:text-zinc-700'}`}>
        <Image
          alt="next"
          src={IconArrowRight}
          width={12}
          height={12}
        />
      </span>
      </div>
    </div>
  )
}