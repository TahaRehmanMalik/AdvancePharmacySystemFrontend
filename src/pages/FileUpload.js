import React, { useState } from 'react';
import { useAlert } from 'react-alert';

function FileUploadForm() {
  const alert = useAlert();
  const [file, setFile] = useState(null);

  const fileChangeHandler = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!file) {
      alert.error('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('image_url', file);

    try {
      const response = await fetch('http://localhost:8080/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('upload-data', data);
        alert.success('Image uploaded successfully');
      } else {
        alert.error('Error uploading image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert.error('Error uploading image');
    }
  };

  return (
    <>
      <div className='text-center'>
        <h1 className='m-10 text-xl font-bold text-blue-400'>Image Upload Here</h1>
        <div className='flex flex-col items-center'>
          <form onSubmit={onSubmitHandler}>
            <input type="file" onChange={fileChangeHandler} />
            <button className='my-3 p-2 border-2 border-blue-400 text-xl rounded-lg hover:bg-sky-500 hover:text-white' type='submit'>Upload</button>
          </form>
        </div>
        <h1 className='my-40 flex align-middle justify-center text-xl'>Go back to <a href='/' className='text-blue-400 font-bold'>Home</a> Page</h1>
      </div>
    </>
  );
}

export default FileUploadForm;
