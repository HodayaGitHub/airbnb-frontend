import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { MainHeader } from '../../cmps/MainHeader';
import { uploadService } from '../../services/upload.service.js';
import Addimg from '../../assets/img/svgs/Addimg.svg';
import { useSelector } from 'react-redux'

export function Page9({ stay, updateStay }) {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [images, setImages] = useState(Array.from({ length: 3 }, () => ''));
  const [stayToEdit, setStayEdit] = useState(stay);
  const [loadingIndex, setLoadingIndex] = useState(null);

  useEffect(() => {
    updateStay(stayToEdit);
    setLoadingIndex(null)

  }, [stayToEdit]);

  async function uploadImg(ev, index) {
    ev.stopPropagation()
    console.log('clicked');
    setIsUploading(true);

    try {

      setLoadingIndex(index)

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

        return updatedStay
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
    <section className='step9'>
      <MainHeader />
      <h1>Choose at least 5 photos</h1>
      <p>Drag to reorder</p>
      <div className='upload-imgs'>
        {images.map((image, index) => (
          <section key={index} className='upload-imgs-item'>
            <label htmlFor={`imgUpload${index + 1}`} className='custom-btn'>
              {index === loadingIndex ?
                (
                  <span class="mini-lodaer" >
                    <span class="let1">l</span>
                    <span class="let2">o</span>
                    <span class="let3">a</span>
                    <span class="let4">d</span>
                    <span class="let5">i</span>
                    <span class="let6">n</span>
                    <span class="let7">g</span>
                  </span>
                ) : (
                  <img
                    className={isUploading ? 'Addimg bigImg' : 'Addimg'}
                    src={image} // Display the image from the array
                    alt=''
                  />)}
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
    </section>
  );
}
