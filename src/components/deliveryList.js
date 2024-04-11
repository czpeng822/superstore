import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import { AppContext } from './AppContext';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Tooltip from '@mui/material/Tooltip';


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

function DeliveryList() {
  const { userAccount, username } = useContext(AppContext);
  const [page, setPage] = useState(1);

  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  const user = userAccount.find((user) => user.name === username);
  if (!user) {
    return <h2>Please log in to view orders.</h2>;
  }

  const ordersData = user.orders;

  const itemsPerPage = 11;
  const pageCount = Math.ceil(ordersData.length / itemsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRows = ordersData.slice(startIndex, endIndex);

  return (
    <div style={{ display: 'flex', maxHeight: '100%', minWidth: '40%' }}>
      <div style={{ flex: 2, color: '#1976D2', marginLeft: '30px' }}>
        <br />
        <Title>Shipping Services</Title>
        {paginatedRows.length > 0 ? (
          <Table size="large">
            <TableHead>
              <TableRow>
                <TableCell>Order Time</TableCell>
                <TableCell>Order ID</TableCell>
                <TableCell>Delivery ID</TableCell>
                <TableCell>Estimated Time</TableCell>
                <TableCell>Full Address</TableCell>
                <TableCell>Postal Code</TableCell>
                <TableCell>Deliverymen</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((row) => (
                <TableRow key={row.id} style={{ cursor: 'pointer' }}>
                  <TableCell>{row.time}</TableCell>
                  <TableCell>{row.orderId}</TableCell>
                  <TableCell>{row.orderId * 2}</TableCell>
                  <TableCell>{row.delivery.estimatedtime}</TableCell>
                  <TableCell>{row.addressInfo.address}</TableCell>
                  <TableCell>{row.addressInfo.postalCode}</TableCell>
                  <TableCell>{row.delivery.deliverymen}</TableCell>
                  <TableCell>{addDays(new Date(row.time), Math.floor(Math.random() * 6) + 2) > new Date() ? 'Shipping' : 'Complete'}</TableCell>
                  <TableCell>
                    <Tooltip title="Contact the delivery men">
                       <WhatsAppIcon onClick={() => { console.log('contact the delivery men') }} style={{ cursor: 'pointer' }} />
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div>
            <br /> <br /> <br />
            <div style={{ fontSize: '1.2em' }}>No orders shipping services information.</div>
          </div>
        )}
        <Pagination count={pageCount} page={page} onChange={handleChangePage} />
      </div>
    </div>
  );
}

DeliveryList.propTypes = {
  userAccount: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
};

export default DeliveryList;
