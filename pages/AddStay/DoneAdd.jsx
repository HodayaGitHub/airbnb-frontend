import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { MainHeader } from '../../cmps/MainHeader';
import { uploadService } from '../../services/upload.service.js';
import Addimg from '../../assets/img/svgs/Addimg.svg';

export function Page8({ stay}) {
    const navigate = useNavigate();

    
    
      

    return (
        <section className='step8'>
            <MainHeader />
            <h1>All Done! click here for view you house</h1>
            <>
            
            </>
            <button onClick={() => navigate('/become-a-host/structure')}>Next</button>
        </section>
    );
}
