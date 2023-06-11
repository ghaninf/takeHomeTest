import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';

import { UserContext } from "../layout"
import { Button, Input } from "../components";
import { ProductService } from "../services"

const FormProduct = () => {
  const { pageURL } = useContext(UserContext)
  const navigate = useNavigate();
  const [state, setState] = useState({
    input: {
      name: '',
      price: 0,
      sell: 0,
      stock: 0,
      file: null,
      url: null
    },
    errors: {
      name: '',
      price: '',
      sell: '',
      stock: '',
      url: ''
    },
    disabled: false,
    success: false
  })

  const formatFile = ['jpg', 'jpeg', 'png'];
  
  const spec = {
    name: { name: 'name', title: 'Name', placeholder: 'Enter product name', type: 'string' },
    price: { name: 'price', title: 'Price', placeholder: 'Enter product price', type: 'number' },
    sell: { name: 'sell', title: 'Sell', placeholder: 'Enter product sell', type: 'number' },
    stock: { name: 'stock', title: 'Stock', placeholder: 'Enter product stock', type: 'number' },
    file: { name: 'file', placeholder: 'Attach product\'s image', type: 'file', accept:".jpg, .jpeg, .png" },
  }

  const schema = yup.object().shape({
    name: yup.string().required('This field is required').typeError('This field must alphabetical'),
    price: yup.number().required('This field is required').typeError('This field must numerical'),
    sell: yup.number().required('This field is required').typeError('This field must numerical'),
    stock: yup.number().required('This field is required').typeError('This field must numerical'),
    url: yup.string().required('This field is required').typeError('This field must alphabetical'),
  })

  useEffect(() => {
    if (pageURL[3]) {
      ProductService.getDetail(pageURL[3])
        .then(res => {
          setState(prev => ({
            ...prev,
            input : res
          }))
        })
        .catch(error => {
          console.log(error.message)
        })
    }
  }, [])

  const navigateManage = () => {
    navigate('/manage');
  }

  const handleChange = (e) => {
    let errors = state.errors;
    errors[e.target.name] = ''
    setState(prev => ({
      ...prev,
      input: {
        ...prev.input,
        [e.target.name]: e.target.value
      },
      errors: errors,
      disabled: false
    }))
  }

  const handleFileChange = (e) => {
    let errors = state.errors
    errors['url'] = ''
    if (!formatFile.includes(e.target.files[0].name.split('.')[1])) {
      errors['url'] = 'File Extention must .jpg, .jpeg, .png'
    }
    if (!formatFile.includes(e.target.files[0].type.split('/')[1])) {
      errors['url'] = 'File Format Type must image/jpg, image/jpeg, image/png'
    }
    if(e.target.files[0].size > 100000){
      errors['url'] = 'File Too Large, Expected size 100Kb'
    }
    if (errors['url'] !== '') {
      setState(prev => ({
        ...prev,
        errors: errors
      }))
    }

    setState(prev => ({
      ...prev,
      input: {
        ...prev.input,
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      },
      fileIsNew: true,
      errors: errors,
      disabled: false
    }));
  }

  const handleValidate = async () => {
    try {
      await schema.validate(state.input, { abortEarly: false })
    } catch (error) {
      let errors = state.errors;
      error.inner.forEach(el => {
        errors[el.path] = el.errors[0];
      });
      setState(prev => ({
        ...prev,
        errors: errors,
        disabled: true
      }))
    }
  }

  const handleSubmit = async () => {
    await handleValidate();
    const service = state.input?._id
    ? ProductService.create(state.input)
    : ProductService.update(state.input.id, state.input)
    
    service
      .then(() => {
        navigateManage()
      })
      .catch(error => {
        console.log(error.message)
      })
  }

  return(
    <div>
      <h1>Form Product</h1>
      <div className="relative mt-8 flex flex-row flex-nowrap gap-x-8">
        <div className="relative w-full max-w-[400px] h-auto max-h-[400px] flex flex-col gap-2">
          <label htmlFor="file" className="text-zinc-600 font-medium">File Image</label>
          <label htmlFor="file" className="relative w-full max-w-[400px] h-auto max-h-[400px] cursor-pointer border border-zinc-300 rounded overflow-hidden">
            {
              state.input?.url
              ? <img src={state.input.url} alt="preview" className="block w-full h-full object-cover" />
              : <div className="h-[400px] text-center flex justify-center items-center">Choose Product's Image <br /> with format .jpg, .jpeg, .png</div>
            }
            <input
              {...spec.file}
              id={spec.file.name}
              defaultValue={''}
              onChange={handleFileChange}
              className={'hidden'}
            />
          </label>
          <span className='text-red-500'>{state.errors?.url}</span>
        </div>
        <div className="relative w-full flex flex-col gap-4 justify-start">
          <Input
            {...spec.name}
            value={state.input.name}
            onChange={handleChange}
            error={state.errors?.name}
          />
          <Input
            {...spec.price}
            value={state.input.price}
            onChange={handleChange}
            error={state.errors?.price}
          />
          <Input
            {...spec.sell}
            value={state.input.sell}
            onChange={handleChange}
            error={state.errors?.sell}
          />
          <Input
            {...spec.stock}
            value={state.input.stock}
            onChange={handleChange}
            error={state.errors?.stock}
          />
        </div>
      </div>
      <div className="relative flex flex-row flex-nowrap gap-8 justify-center items-center">
        <Button
          text={'Cancel'}
          typeColor={'secondary'}
          onClick={navigateManage}
        />
        <Button
          text={'Login'}
          typeColor={'primary'}
          onClick={handleSubmit}
        />
      </div>
    </div>
  )
}

export default FormProduct