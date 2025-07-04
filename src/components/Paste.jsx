import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast'

const Paste = () => {

    const pastes = useSelector((state) => state.paste.pastes);
    console.log(pastes)
    const[searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();

    const filteredData = pastes.filter(
      (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    function handleDelete(pasteid){
      dispatch(removeFromPastes(pasteid))
    }


  return (
    <div>
      <input 
        className='p-2 rounded-2xl min-w-[200] mt-5'
        type="search"
        placeholder='search here'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className='flex flex-col gap-5 mt-5'>   
      {
        filteredData.length > 0 &&
        filteredData.map(
          (paste) => {
            return (
              <div>
                <div className='border' key={paste?._id}>
                  {paste.title}
                </div>
                <div>
                  {paste.content}
                </div>
                <div className='flex flex-row gap-4 place-content-evenly'>
                  <button>
                    <a href={`/?pasteid=${paste?._id}`}>
                    Edit
                    </a>
                  </button>
                  <button>
                    <a href={`/pastes/${paste?._id}`}>
                      View
                    </a>
                  </button>
                  <button onClick={() => handleDelete(paste?._id)}>
                    Delete
                  </button>
                  <button onClick={() => {
                    navigator.clipboard.writeText(paste.content)
                    toast.success("copied to clipboard")
                  }}>
                    Copy
                  </button>
                  <button>
                    Share
                  </button>
                </div>
                <div>
                  {paste.createdAt}
                </div>
              </div>
            )
          }
        )
      }
                  
      </div>
    </div>
  )
}

export default Paste
