import React, { useState, useContext } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { AppContext } from './AppContext';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';


function ShoppingCart() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [address, setAddress] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);
  const { cartItems, setCartItems, userAccount, setUserAccount, username } = useContext(AppContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showDetails, setShowDetails] = useState(null);

  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  const getRandomDeliveryUser = (userAccount) => {
    const deliveryUsers = userAccount.filter(user => user.Loginrole === 'Delviery');
    const randomIndex = Math.floor(Math.random() * deliveryUsers.length);
    return deliveryUsers[randomIndex].name;
  }

  const handlePlaceOrder = () => {
    // Save the address information to user's adds list if it's new
    const currentUser = userAccount.find(user => user.name === username);

    // Check if the current address already exists in the user's address list
    const addressExists = currentUser.adds.some(add => add.address === address);
    const contactPersonExists = currentUser.adds.some(add => add.contactPerson === contactPerson);
    const phoneNumberExists = currentUser.adds.some(add => add.phoneNumber === phoneNumber);
    const postalCodeExists = currentUser.adds.some(add => add.postalCode === postalCode);
    
    if (!addressExists) {
      currentUser.adds.push({ address });
    }
    if (!contactPersonExists) {
      currentUser.adds.push({ contactPerson });
    }
    if (!phoneNumberExists) {
      currentUser.adds.push({ phoneNumber });
    }
    if (!postalCodeExists) {
      currentUser.adds.push({ postalCode });
    }

    // Generate an order ID use a timestamp
    const orderId = Date.now().toString();

    // Define shipping information randomly
    const estimatedtime = addDays(new Date(), Math.floor(Math.random() * 6) + 2).toLocaleDateString();
    const deliverymen = getRandomDeliveryUser(userAccount);

    const timeOptions = {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    const formattedTime = new Date().toLocaleString('en-US', timeOptions);

    // Save order details to user's orders list
    const orderDetails = {
      orderId,
      time: formattedTime,
      products: cartItems.map(item => ({ image:item.image, productName: item.productName, rating:item.rating, quantity: item.quantity, price: item.price,itemtotal:item.price*item.quantity})),
      subtotal: totalPrice,
      tax,
      total,
      addressInfo: { address, contactPerson, phoneNumber, postalCode },
      delivery: {estimatedtime,deliverymen}
    };

    currentUser.orders.push(orderDetails);
    setUserAccount([...userAccount]);
    setAddress('');
    setContactPerson('');
    setPhoneNumber('');
    setPostalCode('');
    setCartItems([]);
    setDialogOpen(false);
    setOrderSuccess(true);
    setTimeout(() => {
      setOrderSuccess(false);
    }, 3000);
  };

  const removeFromCart = (product) => {
    const updatedCart = cartItems.filter(item => item.id !== product.id);
    setCartItems(updatedCart);
  };

  const updateQuantity = (productId, quantity) => {
    const updatedCart = cartItems.map(item =>
      item.id === productId ? { ...item, quantity } : item
    );
    setCartItems([...updatedCart]); 
  };

  const handleNextClick = () => {
    setDialogOpen(true);  
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  
  const setFormattedPhone = (newNumber) => {
    const digits = newNumber.replace(/\D/g, '');
    let formatted = digits.substring(0, 3);
    if (digits.length === 3 && newNumber[3] === '-') {
      formatted = `${formatted}-`;
    } else if (digits.length > 3) {
      formatted = `${formatted}-${digits.substring(3, 6)}`;
    }
    if (digits.length === 6 && newNumber[7] === '-') {
      formatted = `${formatted}-`;
    } else if (digits.length > 6) {
      formatted = `${formatted}-${digits.substring(6, 10)}`;
    }
    setPhoneNumber(formatted);
  };
  
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  let taxRate;
  if(postalCode===''){
    taxRate=''
  }else{
    const taxPercentage = parseInt(postalCode.substring(0, 1) || '0', 10) + 1;
    taxRate = taxPercentage / 100;
  }
  const tax = (totalPrice * taxRate).toFixed(2);
  const total = (parseFloat(totalPrice) + parseFloat(tax)).toFixed(2);

  const openImage = (imgSrc) => {
    setSelectedImage(imgSrc);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const handleOpenDetails = (product) => {
    setShowDetails(product);
  };

  const handleCloseDetails = () => {
    setShowDetails('');
  };

  return (
    <div style={{ maxHeight: "900px", overflow: "auto", width:"1430px"}}>
      <div className="modal">
        <div className="modal-content">
          {orderSuccess && (<Alert variant="outlined" severity="success">Order placed successfully! Thank you for your order !</Alert>)}
          <div style={{ display: "flex", alignItems: "center", color: '#1976D2' }}>
            <ShoppingCartIcon style={{ marginLeft: "50px", marginRight: "20px" }} />
            <h2>Shopping Cart</h2>
            <div style={{ marginLeft: "auto" }}>
              <Button variant="contained" onClick={handleNextClick} disabled={cartItems.length === 0 || username === ''}>
                {username === '' ? "Please Login" : "Next"}
              </Button>
            </div>
          </div>
          <br/><br/>
          {cartItems.length > 0 ? (
            cartItems.map(product => (
              <div key={product.id} style={{ display: "flex", alignItems: "center", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
                <img src={product.image} alt={product.productName} onClick={() => openImage(product.image)} style={{ cursor: "pointer", marginLeft: "50px", width: "70px", height: "70px", marginRight: "20px" }} />
                <div style={{ flex: "1", marginRight: "50px", cursor: "pointer" }} onClick={() => handleOpenDetails(product)}>{product.productName}</div> 
                <div style={{ width: "100px", marginRight: "30px" }}>${product.price}</div>
                <input
                  type="number"
                  value={product.quantity}
                  onChange={(e) => {
                    const newQuantity = parseInt(e.target.value);
                    updateQuantity(product.id, newQuantity);
                  }}
                  min="1"
                  style={{ width: "50px", marginRight: "30px" }}
                />
                <div style={{ width: "100px", marginRight: "30px" }}>${product.price * product.quantity}</div>
                <span style={{ textDecoration: "underline", cursor: "pointer", color: "blue" }} onClick={() => removeFromCart(product)}>remove</span>
              </div>
            ))
          ) : (
            <div>
              <br/><br/><br/><br/><br/>
              <h3>Your shopping cart is empty.</h3>
              <br/><br/><br/>
            </div>
          )}
          <br/>
          {cartItems.length > 0 && (
              <div
              style={{ textDecoration: "underline", cursor: "pointer", color: "blue", textAlign:'right'}}
              onClick={() => setCartItems([])}
              >
                remove all
              </div>
            )}
            <br/>
          <h3>Subtotal: $ {totalPrice}</h3>
        </div>
      </div>
      <div>
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
              <h2  style={{ textAlign: 'center'}}>
              Bill & Shiping Information
              </h2>
          <DialogContent> 
            <div>
               <h3>Order Bill Information</h3>
               <h4>Total price of items: $ {totalPrice}</h4>
               <div>
               {postalCode.length!==5 ?
               (<Alert severity="info">Please input the postal code to get the detail price.</Alert>) :
               (<div>
               <h4>Tax: $ {tax}</h4>
               <h4>Bill Total: $ {total}</h4>
               </div>)
               }
              </div>
            </div>
                <h4>Full Address:</h4>
              <div style={{ display: 'flex'}}>
                <Autocomplete
                  freeSolo
                  value={address}
                  style={{ width: '450px' }}
                  onInputChange={(event, newInputValue) => {
                    setAddress(newInputValue);
                  }}
                  options={(userAccount.find(user => user.name === username)?.adds || [])
                    .filter(item => item.address) 
                    .map(item => item.address) 
                  }
                  getOptionSelected={(option, value) => option === value}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Full Address"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
                <Tooltip title="input full address contains the city and state">
                   <IconButton>
                       <HelpOutlineIcon />
                   </IconButton>
                </Tooltip>
              </div>
                <h4>Contact Person:</h4>
                <Autocomplete
                  freeSolo
                  style={{ width: '92%' }}                  
                  value={contactPerson}
                  onInputChange={(event, newInputValue) => {
                    setContactPerson(newInputValue);
                  }}
                  options={(userAccount.find(user => user.name === username)?.adds || [])
                    .filter(item => item.contactPerson)
                    .map(item => item.contactPerson)
                  }
                  getOptionSelected={(option, value) => option === value}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Contact Person"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
                <h4>Phone Number:</h4>
              <div style={{ display: 'flex'}}>
                <Autocomplete
                  freeSolo
                  style={{ width: '100%' }}
                  value={phoneNumber}
                  onInputChange={(event, newInputValue) => {
                    setFormattedPhone(newInputValue);
                    if (newInputValue.length >= 12) {
                      event.target.blur();
                    } 
                  }}
                  options={(userAccount.find(user => user.name === username)?.adds || [])
                    .filter(item => item.phoneNumber) 
                    .map(item => item.phoneNumber) 
                  }
                  getOptionSelected={(option, value) => option === value}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Phone Number"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
                <Tooltip title="Only 10 digits are available ">
                   <IconButton>
                       <HelpOutlineIcon />
                   </IconButton>
                </Tooltip>
              </div>
                <h4>Postal Code:</h4>
              <div style={{ display: 'flex'}}>
                <Autocomplete
                  freeSolo
                  value={postalCode}
                  style={{ width: '100%' }}
                  onInputChange={(event, newInputValue) => {
                    const formattedPostalCode = newInputValue.replace(/\D/g, '').slice(0, 5);
                    setPostalCode(formattedPostalCode);
                    if (newInputValue.length >= 5) {
                      event.target.blur(); // Remove focus to prevent further input
                    }  
                  }}
                  options={(userAccount.find(user => user.name === username)?.adds || [])
                    .filter(item => item.postalCode) 
                    .map(item => item.postalCode) 
                  }
                  getOptionSelected={(option, value) => option === value}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Postal Code"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
                <Tooltip title="Only 5 digits are available ">
                   <IconButton>
                       <HelpOutlineIcon />
                    </IconButton>
                </Tooltip>
              </div>
          </DialogContent>
          <DialogActions>
            <br/><br/><br/><br/>
            <Button onClick={handleDialogClose}>Cancel</Button>
            {!orderSuccess && (
              <Button onClick={handlePlaceOrder} variant="contained" disabled={!address || !contactPerson || phoneNumber.length !== 12 || postalCode.length !== 5}>Place Order</Button>
            )}
          </DialogActions>
        </Dialog>
      </div>
      {selectedImage && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ position: 'relative',  maxWidth: '100%', maxHeight: '100%'}}>
            <button style={{ position: 'absolute', top: 10, right: 10, background: 'none', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer', padding: 5 }} onClick={closeImage}>X</button>
            <img src={selectedImage} alt="Full-size_image" style={{ maxWidth: '60%', maxHeight: '60%', objectFit: 'contain', cursor: 'pointer' }} onClick={closeImage} />
            </div>
        </div>
      )}
      {showDetails && (
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
                   onClick={handleCloseDetails}
                   zIndex={9999}
                   >
                   <Box bgcolor="#fff" padding={3} borderRadius={5} textAlign="center" maxWidth={400}>
                     <img src={showDetails.image} alt="product" style={{ width: '100%', height: 'auto', marginBottom: 10 }} />
                     <Typography variant="h5" gutterBottom>{showDetails.productName}</Typography>
                     <Rating name="rating" value={showDetails.rating} readOnly/>  <span variant="h6">{showDetails.rating}</span>
                     <Typography variant="h6" color="primary">${showDetails.price}</Typography>        
                     </Box>
                  </Box>
               )}
    </div>
  )
}

export default ShoppingCart;
