import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {
    const[title, setTitle] = useState('');
    const[value, setValue] = useState('');
    const[searchParams, setSearchParams] = useSearchParams();
    const pasteid = searchParams.get("pasteid")
    const dispatch = useDispatch();
    const allPastes = useSelector((state) => state.paste.pastes);
    
    useEffect(() => {
         if(pasteid){
          const paste = allPastes.find((p) => p._id === pasteid);
          setTitle(paste.title);
          setValue(paste.content);
         }
    }, [pasteid])

    function createPaste(){
      const paste = {
        title: title,
        content: value,
        _id: pasteid ||
            Date.now().toString(36),
        createAt: new Date().toISOString(),
        }

        
        

        if(pasteid){
          //create
          dispatch(updateToPastes(paste));
        } 
        else{
          dispatch(addToPastes(paste));
        }

        setTitle('');
        setValue('');
        setSearchParams({});
    }

  return (
    <div>
      <div className='flex flex-row gap-7 place-content-between'>
        <input 
          className='p-2 rounded-2xl mt-2 w-[66%] pl-4'
          type='text'
          placeholder='enter title here'
          value={title}
          onChange={(e) => setTitle(e.target.value)} 
          />

          <button 
            onClick={createPaste}
            className='p-2 rounded-2xl mt-2'>
            {
                pasteid ? "update My Paste" : "Create My Paste"
            }
          </button>
    </div>
    <div>
      <textarea
        className='rounded-2xl mt-4 min-w-[500px] p-4'
        value={value}
        placeholder='enter content here'
        onChange={(e) => setValue(e.target.value)}
        rows={20}
      />
    </div>
    </div>
  )
}

export default Home
