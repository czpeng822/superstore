import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Pagination from '@mui/material/Pagination';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import OrderInformation from './OrderInformation';
import React, { useState,useContext  } from 'react';
import { AppContext } from './AppContext';
import DeliveryList from './deliveryList.js';
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined';


function Title({ children }) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};

function OrdersList() {
  const {  userAccount, setUserAccount, username, setfuncts } = useContext(AppContext);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderInfoOpen, setOrderInfoOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState("");

  const user = userAccount.find((user) => user.name === username);
  if (!user) {
    return <h2>Please log in to view orders.</h2>;
  }

  const ordersData = user.orders;

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setOrderInfoOpen(true);
  };

  const handleCloseOrderInfo = () => {
    setOrderInfoOpen(false);
    setSelectedOrder(null);
  };

  const itemsPerPage = 11;
  const pageCount = Math.ceil(ordersData.length / itemsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRows = ordersData.slice(startIndex, endIndex);

  const handleDeleteOrder = (orderId) => {
    if (!showConfirmation) {
      setShowConfirmation("click it again to delete");
      setTimeout(() => {
        setShowConfirmation("")
      }, 2000);
    } else {
    const updatedOrders = ordersData.filter(order => order.orderId !== orderId);
    // Update the userAccount with the updated orders
    setUserAccount(prevState => {
      const updatedUserAccount = [...prevState];
      const userIndex = updatedUserAccount.findIndex(user => user.name === username);
      updatedUserAccount[userIndex].orders = updatedOrders;
      return updatedUserAccount;
    });
  }};

  return (
<div>
    <div style={{ display: 'flex', maxHeight: '100%', minWidth: '40%' }}>
      <div style={{ flex: 2, color: '#1976D2', marginLeft: '30px' }}>
        <br />
        <Title>Orders List</Title>
        {paginatedRows.length > 0 ? (
        <Table size="large">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Order Time</TableCell>
              <TableCell>Order Description</TableCell>
              <TableCell>Order Subtotal</TableCell>
              <TableCell>Order Tax</TableCell>
              <TableCell>Order Amount</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row) => (
              <TableRow
                key={row.id}
                style={{ cursor: 'pointer' }}
              >
                <TableCell>{row.orderId}</TableCell>
                <TableCell>{row.time}</TableCell>
                <TableCell>
                  <Link href={row.url} color="inherit" target="_blank" rel="noopener noreferrer" style={{cursor: "pointer"}} onClick={() => handleOrderClick(row)}>
                  {row.products[0].productName} etc {row.products.reduce((total, product) => total + product.quantity, 0)} items.
                  </Link>
                </TableCell>
                <TableCell>${row.subtotal}</TableCell>
                <TableCell>${row.tax}</TableCell>
                <TableCell>${row.total}</TableCell>
                <TableCell style={{display:'flex', height:"40px" ,alignItems: "center"}}>
                    <Tooltip title={showConfirmation ? "click it again to delete" : "double click to delete"}>
                       <DeleteIcon onClick={() => handleDeleteOrder(row.orderId)} size="small" />
                    </Tooltip>
                    <Tooltip title="shipping list">
                       <TravelExploreOutlinedIcon onClick={()=>{setfuncts(<DeliveryList/>)}} style={{ marginLeft:'10px'}}/>
                    </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        ) : (
          <div>
          <br/>  <br/>    <br/>
          <div style={{ fontSize: '1.2em' }}>No orders available.</div>
          </div>
        )}
        <OrderInformation 
        open={orderInfoOpen} 
        onClose={handleCloseOrderInfo} 
        order={selectedOrder} 
      />
        <Pagination count={pageCount} page={page} onChange={handleChangePage} />
      </div>
    </div>
    </div>
  );
}

OrdersList.propTypes = {
  userAccount: PropTypes.array.isRequired,
  setUserAccount: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

export default OrdersList;
