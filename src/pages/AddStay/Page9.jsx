import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { MainHeader } from '../../cmps/MainHeader';
import { uploadService } from '../../services/upload.service.js';
import Addimg from '../../assets/img/svgs/Addimg.svg';
import { useSelector } from 'react-redux'

export function Page9({ stay, updateStay }) {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [images, setImages] = useState(Array.from({ length: 4 }, () => ''));
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
      <h1>Choose at least 2 photos</h1>
      <div className='upload-imgs'>
        {images.map((image, index) => (
          <section key={index} className='upload-imgs-item'>
            <label htmlFor={`imgUpload${index + 1}`} className='custom-btn'>
              {index === loadingIndex ? (
                  <span className="mini-loader"></span>
                ) : (
                <>
                  {image && (
                    <img
                      className='img'
                      src={image}
                      alt=''
                    />
                  )}
                  {!image && (
                    <img className='svg' src={Addimg} alt="" />
                  )}
                </>
              )}
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