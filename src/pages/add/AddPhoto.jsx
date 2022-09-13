
export default function AddPhoto(props) {

  return (
    <div className='add-img'>
      <h3>Add image</h3>
      <input 
        type="file" 
        multiple 
        accept='image/*'
        onChange={props.onImageChange}
      />
      <br />
      { 
        props.imageURLsState.map(img => (
          <div key={img.id}>
            <img 
              width='100px' 
              src={img.item}
            />
            <button 
              onClick={() => props.removeImage(img.id)}
            >
              Delete
            </button>
          </div>
        ))
      }
    </div>
  )
}