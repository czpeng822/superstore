import React from 'react';
import Slider from 'react-slick';
import { Container } from '@mui/material';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function DisplayAD() {
  const images = [
    { src: 'http://localhost:3030/images/ad/ad1.png', url: 'URL' },
    { src: 'http://localhost:3030/images/ad/ad2.png', url: 'URL' },
    { src: 'http://localhost:3030/images/ad/ad3.png', url: 'URL' }
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
        <img src={'http://localhost:3030/images/ad/ad4.png'} alt="Ad 4" style={{ width: 'calc(33% - 10px)', height: '220px', borderRadius: '10px', cursor: 'pointer'}} />
        <img src={'http://localhost:3030/images/ad/ad5.png'} alt="Ad 5" style={{ width: 'calc(33% - 10px)', height: '220px', borderRadius: '10px', cursor: 'pointer'}} />
        <img src={'http://localhost:3030/images/ad/ad6.png'} alt="Ad 6" style={{ width: 'calc(33% - 10px)', height: '220px', borderRadius: '10px', cursor: 'pointer'}} />        
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>       
        <img src={'http://localhost:3030/images/ad/ad7.png'} alt="Ad 7" style={{ width: 'calc(33% - 10px)', height: '220px', borderRadius: '10px', cursor: 'pointer'}} />
        <img src={'http://localhost:3030/images/ad/ad8.png'} alt="Ad 8" style={{ width: 'calc(33% - 10px)', height: '220px', borderRadius: '10px', cursor: 'pointer'}} />
        <img src={'http://localhost:3030/images/ad/ad9.png'} alt="Ad 9" style={{ width: 'calc(33% - 10px)', height: '220px', borderRadius: '10px', cursor: 'pointer'}} />
      </div>
    </Container>
  );
}

export default DisplayAD;
