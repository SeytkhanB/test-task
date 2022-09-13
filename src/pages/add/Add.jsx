
import {useState, useContext, useEffect} from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Context } from '../../Context';
import {useNavigate} from 'react-router-dom'
import { nanoid } from 'nanoid';

import AddPrice from './AddPrice'
import AddPhoto from './AddPhoto'

export default function Add() {
  const [isValid, setIsValid] = useState(true)
  const [statusState, setStatusState] = useState('active')
  const [nameInputState, setNameInputState] = useState('')
  const [descInputstate, setDescInputState] = useState('')
  const [state, setState] = useState({
    checkboxState: true,
    priceState: ''
  })
  const [imagesState, setImagesState] = useState([])
  const [imageURLsState, setImageURLsState] = useState([])

  const {storeProduct} = useContext(Context)

  useEffect(() => {
    if (imagesState.length < 1) return
    let newImageUrls = []
    imagesState.forEach(image => newImageUrls.push(URL.createObjectURL(image)))
    newImageUrls = newImageUrls.map(item => {
      return {
        item: item,
        id: nanoid()
      }
    })
    setImageURLsState(newImageUrls)
  }, [imagesState])


  function onImageChange(e) {
    setImagesState([...e.target.files])
  }

  function removeImage(id) {
    setImageURLsState(prevState => (
      prevState.filter(img => img.id !== id)
    ))
  }


  const navigate = useNavigate()
  function cancel() {
    navigate('/products')
  }

  function addPriceState(event) {
    const {name, value, type, checked} = event.target
    setState(prevState => ({
        ...prevState,
        [name]: type === "checkbox" ? checked : value
    }))
  }


  function storeData() {
    const isNum = /^\d+$/.test(state.priceState)
    if (
      nameInputState.length > 0 && 
      descInputstate.length > 0 &&
      imageURLsState.length > 0 &&
      isNum
    ) {
      storeProduct({
        id: nanoid(),
        name: nameInputState,
        description: descInputstate,
        price: state.priceState,
        status: statusState,
        img: imageURLsState[0],
        imgFile: imagesState
      }) 
      navigate('/products')
    }
   setIsValid(false)
  }

  return (
    <div className='add-page'>
      <div className='add-info'>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div>
            <h3>Name of product</h3>
            <input 
              placeholder='Name'
              type="text"
              value={nameInputState}
              onChange={e => setNameInputState(e.target.value)}
            />
          </div>

          <div>
            <h3>Status of product</h3>
            <select 
              value={statusState}
              onChange={(e) => setStatusState(e.target.value)}
            >
              <option value="active">Active</option>
              <option value="archive">Archive</option>
            </select>
          </div>
        </div>

        <h3>Description</h3>
        <ReactQuill 
          theme="snow" 
          value={descInputstate} 
          onChange={setDescInputState}
          placeholder={'Description'}
        />
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <AddPhoto
          removeImage={removeImage}
          onImageChange={onImageChange}
          imageURLsState={imageURLsState}
        />

        {
          !isValid && 
          <div className='error-message'>
            <h2>Something went wrong!</h2>
            <p>
              Make sure you have filled <br/>
              in all fields correctly!
            </p>
          </div>
        }
      </div>

      <AddPrice 
        addPriceState={addPriceState}
        state={state}
      />

    <div className='add-save-container'>
      <button onClick={cancel}>Cancel</button>

      <button onClick={storeData}>Click</button>
    </div>
    </div>
  )
}