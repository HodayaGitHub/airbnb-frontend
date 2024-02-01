import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { MainHeader } from '../../cmps/MainHeader';
import { uploadService } from '../../services/upload.service.js';
import Addimg from '../../assets/img/svgs/Addimg.svg';

export function Page8({ stay, updateStay, handleSubmit}) {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [images, setImages] = useState(Array.from({ length: 3 }, () => ''));
  const [stayToEdit, setStayEdit] = useState(stay);

  useEffect(() => {
    // Displaying image previews when the images state changes
    console.log('Updated images:', images);
  }, [images]);

  async function uploadImg(ev, index) {
    ev.stopPropagation()
    console.log('clicked');
    setIsUploading(true);

    try {
      const { secure_url } = await uploadService.uploadImg(ev);
      // const secure_url = 'placeholder_url';

      setImages((prevImages) => {
        const updatedImages = [...prevImages];
        updatedImages[index] = secure_url;
        return updatedImages;
      });

      setStayEdit((prevStay) => {
        const updatedStay = { ...prevStay, imgUrls: [...prevStay.imgUrls, secure_url] };
        console.log('updatedStay', updatedStay)
        updateStay(updatedStay);
        return updatedStay;

      });

      // const newStay = {
      //   ...stay,
      //   labels: updatedLabels,
      // };

    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false);
    }
  }



  return (
    <section className='step8'>
      <MainHeader />
      <h1>Choose at least 5 photos</h1>
      <p>Drag to reorder</p>
      <div className='upload-imgs'>
        {images.map((image, index) => (
          <section key={index} className='upload-imgs-item'>
            <label htmlFor={`imgUpload${index + 1}`} className='custom-btn'>
              <img
                className={isUploading ? 'Addimg bigImg' : 'Addimg'}
                src={image} // Display the image from the array
                alt=''
              />
            </label>
            <input
              type="file"
              onChange={(ev) => uploadImg(ev, index)}
              accept="img/*"
              id={`imgUpload${index + 1}`}
              className='imgUpload'
            />
          </section>
        ))}
      </div>
      <button onClick={handleSubmit}>Next</button>
    </section>
  );
}
