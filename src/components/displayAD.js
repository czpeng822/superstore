import React from 'react';
import Slider from 'react-slick';
import { Container } from '@mui/material';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ad1 from '../images/ad/ad1.png';
import ad2 from '../images/ad/ad2.png';
import ad3 from '../images/ad/ad3.png';
import ad4 from '../images/ad/ad4.png';
import ad5 from '../images/ad/ad5.png';
import ad6 from '../images/ad/ad6.png';
import ad7 from '../images/ad/ad7.png';
import ad8 from '../images/ad/ad8.png';
import ad9 from '../images/ad/ad9.png';

function DisplayAD() {
  const images = [
    { src: ad1, url: 'URL' },
    { src: ad2, url: 'URL' },
    { src: ad3, url: 'URL' }
  ];

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true
  };

  return (
    <Container maxWidth="xl" style={{ display: 'flex', flexDirection: 'column' , marginLeft: '30px'  }}>
      <div style={{ flex: '1' }}>
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <a href={image.url} target="_blank" rel="noopener noreferrer">
                <img src={image.src} alt={`Ad ${index + 1}`} style={{ width: '100%', height: '400px', borderRadius: '10px', cursor: 'pointer'}} />
              </a>
            </div>
          ))}
        </Slider>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <img src={ad4} alt="Ad 4" style={{ width: 'calc(33% - 10px)', height: '220px', borderRadius: '10px', cursor: 'pointer'}} />
        <img src={ad5} alt="Ad 5" style={{ width: 'calc(33% - 10px)', height: '220px', borderRadius: '10px', cursor: 'pointer'}} />
        <img src={ad6} alt="Ad 6" style={{ width: 'calc(33% - 10px)', height: '220px', borderRadius: '10px', cursor: 'pointer'}} />        
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>       
        <img src={ad7} alt="Ad 7" style={{ width: 'calc(33% - 10px)', height: '220px', borderRadius: '10px', cursor: 'pointer'}} />
        <img src={ad8} alt="Ad 8" style={{ width: 'calc(33% - 10px)', height: '220px', borderRadius: '10px', cursor: 'pointer'}} />
        <img src={ad9} alt="Ad 9" style={{ width: 'calc(33% - 10px)', height: '220px', borderRadius: '10px', cursor: 'pointer'}} />
      </div>
    </Container>
  );
}

export default DisplayAD;
