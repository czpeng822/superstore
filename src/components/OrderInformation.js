import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import ItemDetails from './Item_Information.js'

function OrderInformation({ open, onClose, order }) {
  const [showDetails, setShowDetails] = useState(null);
  if (!order || !order.orderId) {
    return null; 
  }

  const handleOpenDetails = (product) => {
    setShowDetails(product);
  };

  const handleCloseDetails = () => {
    setShowDetails('');
  };

  return (
    <div>
    <Dialog open={open} onClose={onClose}  PaperProps={{style: { minWidth: '900px' }}}>
      <DialogTitle style={{ fontWeight: 'bold', textAlign: 'center' }}>Order Information</DialogTitle>
      <DialogContent >
        <div>
          <p><strong>Order ID:</strong> {order.orderId}</p>
          <p><strong>Order Time:</strong> {order.time}</p>
          <p><strong>Order Description:</strong></p>
          <ul>
            {order.products.map(product => (
              <div key={product.id} style={{ display: "flex", alignItems: "center", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
                <img src={product.image} alt={product.productName} style={{ marginLeft: "50px" , width: "70px", height: "70px", marginRight: "20px" }} />
                <div style={{ flex: "1", marginRight: "50px", cursor: "pointer" }} onClick={() => handleOpenDetails(product)}>{product.productName}</div> 
                <div style={{ width: "100px", marginRight: "30px" }}>${product.price}</div>
                <div style={{ width: "100px", marginRight: "30px" }}>{product.quantity}</div>
                <div style={{ width: "100px", marginRight: "30px" }}>${product.itemtotal}</div>
              </div>
            ))}
          </ul>
          <div>
            <p style={{ textAlign: 'right' }}><strong>Order Subtotal:</strong> ${order.subtotal}</p>
            <p style={{ textAlign: 'right' }}><strong>Order Tax:</strong> ${order.tax}</p>
            <p style={{ textAlign: 'right' }}><strong>Order Total:</strong> ${order.total}</p>
            <p><strong>Order Full Address:</strong> {order.addressInfo.address}</p>
            <p><strong>Order Contact Person:</strong> {order.addressInfo.contactPerson}</p>
            <p><strong>Order Phone Number:</strong> {order.addressInfo.phoneNumber}</p>
            <p><strong>Order Postal Code:</strong> {order.addressInfo.postalCode}</p>
          </div>
          
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
          {showDetails && <ItemDetails product={showDetails} onClose={handleCloseDetails}/>}
        </div>
    

    



  );
}

export default OrderInformation;
