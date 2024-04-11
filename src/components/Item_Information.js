import React, { useContext } from 'react';
import { AppContext } from './AppContext';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import ReactImageMagnify from 'react-image-magnify';

function ItemDetails({ product, onClose }) {
    const { setCartItems } = useContext(AppContext);

    const addToCart = (product) => {
        setCartItems(prevItems => {
          const existingProduct = prevItems.find(item => item.id === product.id); 
          if (existingProduct) {
            return prevItems.map (item =>
              item.id === existingProduct.id ? { ...item, quantity: item.quantity + 1 } : item
            );
          } else {
            return [...prevItems, { ...product, quantity: 1 }];
          }
        });
    };

    return (
        <Box
            position="fixed"
            top={0}
            left={0}
            width="100%"
            height="100%"
            bgcolor="rgba(0, 0, 0, 0.5)"
            display="flex"
            justifyContent="center"
            alignItems="center"
            onClick={onClose}
            zIndex={9999}
        >
            <Box
                bgcolor="#fff"
                padding={3}
                borderRadius={5}
                textAlign="center"
                maxWidth={400}
            >
                <ReactImageMagnify
                    {...{
                        smallImage: {
                            alt: 'product',
                            isFluidWidth: true,
                            src: product.image,
                        },
                        largeImage: {
                            src: product.image,
                            width: 1200,
                            height: 1200,
                        },
                        lensStyle: { backgroundColor: 'rgba(0,0,0,.6)' },
                    }}
                />
                <Typography variant="h5" gutterBottom style={{ color: "black" }}>{product.productName}</Typography>
                <Rating name="rating" value={product.rating} readOnly /> <span variant="h6" style={{ color: "black" }}>{product.rating}</span>
                <Typography variant="h6" color="red">${product.price}</Typography>
                <button onClick={() => addToCart(product)} style={{ marginTop: 20, padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: 5, cursor: 'pointer', fontSize: '16px' }}>
                    <AddShoppingCartIcon style={{ marginRight: '10px' }} /> Add to Cart
                </button>
            </Box>
        </Box>
    );
}

export default ItemDetails;
