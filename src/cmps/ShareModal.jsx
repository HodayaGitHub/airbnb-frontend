import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import share from '../assets/img/svgs/share.svg'
import x from '../assets/img/svgs/x.svg'

import facebook  from '../assets/img/svgs/facebook.svg'
import twitter  from '../assets/img/svgs/twitter.svg'
import whatsapp  from '../assets/img/svgs/whatsapp.svg'
import copyLink  from '../assets/img/svgs/copyLink.svg'
import { showErrorMsg, showSuccessMsg, showlinkCopiedSuccessMsg } from '../services/event-bus.service'
import { UserMsg } from './UserMsg.jsx'
import { FacebookShareButton, FacebookIcon, TwitterShareButton,TwitterIcon, WhatsappShareButton } from 'react-share';
import { CloseIcon } from '../services/icons.service.jsx';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 520,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

export default function ShareModal({stayImg, stay,  averageRating}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCopyLink = () => {
    const currentURL = window.location.href;

    navigator.clipboard.writeText(currentURL).then(
      function () {
        console.log('URL copied to clipboard');
        showlinkCopiedSuccessMsg(`✅ Link copied`)
      },
      function (err) {
        console.error('Unable to copy to clipboard', err);
      }
    );
  }


  return (
    <div className='share-btn'>
      <button className='share' onClick={handleOpen}> <img src={share} alt="share-icon" />Share</button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}className='share-modal'>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Share this place
            </Typography>
              <div className='little-img'>
                <div className='img'><img className='tiny-img' src={stayImg} alt="" /></div>
                <div className='descipition'>
                <p className='stay-contents'>
                {stay.type === 'House' ? 'Entire ' + stay.type : stay.type} in{' '}
                {stay.loc.city} • 🟊 {averageRating.toFixed(1)} • {stay.bedrooms} bedroom
                {stay.bedrooms !== 1 && <span>s</span>} • {stay.bedrooms !== 0 ? stay.beds: 1} bed{stay.bedrooms > 1 && stay.beds > 1 && <span>s</span>} • {stay.bathrooms} bathroom{stay.bathrooms !== 1 && <span>s</span>}
          </p>
                  </div>
              </div>

              <section className='share-buttons'>
              {/* <button className='share-to' onClick={() => handleFacebookShare(stay)}>
              <img src={facebook} alt="" />
                Facebook
              </button> */}
                <FacebookShareButton className="share-to" url={window.location.href} quote={`${stay.title} - ${stay.description}`}>
                {/* <button className="share-to"> */}
                  <img src={facebook} alt="" />
                  Facebook
                {/* </button> */}
              </FacebookShareButton>

              {/* <button className='share-to' >
              <img src={twitter} alt="" />
                Twitter
              </button> */}

<TwitterShareButton className="share-to" url={window.location.href} title={stay.title} via="yourTwitterHandle">
                {/* <button className="share-to"> */}
                  <img src={twitter} alt="" />
                  Twitter
                {/* </button> */}
              </TwitterShareButton>
              {/* <button className='share-to'>
              <img src={whatsapp} alt="" />
                WhatsApp
              </button> */}

<WhatsappShareButton className="share-to" url={window.location.href} title={stay.title}>
                {/* <button className="share-to"> */}
                  <img src={whatsapp} alt="" />
                  WhatsApp
                {/* </button> */}
              </WhatsappShareButton>

              <button className='share-to'  onClick={handleCopyLink}>
              <img src={copyLink} alt="" />
                Copy Link
              </button>
              </section>
            
            <button  className='close-share-modal' onClick={handleClose}><CloseIcon/></button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}