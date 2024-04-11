import React, { useState, useContext } from 'react';
import { styled } from '@mui/system';
import { Tabs } from '@mui/base/Tabs';
import { TabsList as BaseTabsList } from '@mui/base/TabsList';
import { TabPanel as BaseTabPanel } from '@mui/base/TabPanel';
import { buttonClasses } from '@mui/base/Button';
import { Tab as BaseTab, tabClasses } from '@mui/base/Tab';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AppContext } from './AppContext';
import Pagination from '@mui/material/Pagination';
import ItemDetails from './Item_Information';


export default function Electronics() {
  const { products,cartItems,setCartItems } = useContext(AppContext);
  const [selectedTab, setSelectedTab] = useState('electronics');
  
  let productsdataByTab;
  if(selectedTab=== 'electronics'){
    productsdataByTab = products.filter(product => product.categories.toLowerCase().includes(selectedTab));
  }else{
    productsdataByTab = products.filter(product => product.subcategories.toLowerCase().includes(selectedTab));
  }
  
  const handleTabChange = (event, newValue) => {
    const tabNames = ['electronics', 'phones','computers', 'tvs','sounds'];
    setSelectedTab(tabNames[newValue]);
  };

  return (
    <Tabs defaultValue={0} onChange={handleTabChange} style={{minWidth:'1350px', marginLeft: '30px'}}>
      <TabsList>
        <Tab value={0}>Electronics</Tab>
        <Tab value={1}>Phones</Tab>
        <Tab value={2}>Computers</Tab>
        <Tab value={3}>TV</Tab>
        <Tab value={4}>Sound System</Tab>
      </TabsList>
      <TabPanel value={0}><DisplayItem cartItems={cartItems} setCartItems={setCartItems} productsdataByTab={productsdataByTab}/></TabPanel>
      <TabPanel value={1}><DisplayItem cartItems={cartItems} setCartItems={setCartItems} productsdataByTab={productsdataByTab}/></TabPanel>
      <TabPanel value={2}><DisplayItem cartItems={cartItems} setCartItems={setCartItems} productsdataByTab={productsdataByTab}/></TabPanel>
      <TabPanel value={3}><DisplayItem cartItems={cartItems} setCartItems={setCartItems} productsdataByTab={productsdataByTab}/></TabPanel>
      <TabPanel value={4}><DisplayItem cartItems={cartItems} setCartItems={setCartItems} productsdataByTab={productsdataByTab}/></TabPanel>
    </Tabs>
  );
}

const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#80BFFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Tab = styled(BaseTab)`
  font-family: 'IBM Plex Sans', sans-serif;
  color: #fff;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  background-color: transparent;
  width: 100%;
  padding: 10px 12px;
  margin: 6px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[400]};
  }

  &:focus {
    color: #fff;
    outline: 3px solid ${blue[200]};
  }

  &.${tabClasses.selected} {
    background-color: #fff;
    color: ${blue[600]};
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(BaseTabPanel)(
  ({ theme }) => `
  width: 100%;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  padding: 20px 12px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  border-radius: 12px;
  opacity: 1;
  `,
);

const TabsList = styled(BaseTabsList)(
  ({ theme }) => `
  min-width: 400px;
  background-color: ${blue[500]};
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
  `,
);


export function DisplayItem({cartItems,setCartItems,productsdataByTab}) {

  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const pageCount = Math.ceil(productsdataByTab.length / itemsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRows = productsdataByTab.slice(startIndex, endIndex);
  return (
    <Container>
      <Grid container spacing={3}>
        {paginatedRows.map((product, index) => (
          <Grid item xs={6} md={3} key={index}>
            <BoxComponent product={product} cartItems={cartItems} setCartItems={setCartItems}/>
          </Grid>
        ))}
      </Grid>
      <Pagination count={pageCount} page={page} onChange={handleChangePage} />
    </Container>
  );
}

function BoxComponent({ product }) {
  const [showDetails, setShowDetails] = useState(false);

  const handleOpenDetails = () => {
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  return (
    <React.Fragment>
      <Box
        height={250}
        width={250}
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ border: '2px solid grey' }}
        onClick={handleOpenDetails}
        style={{ cursor: 'pointer' }}
      >
        <img src={product.image} alt="product" style={{ width: '100%', height: 'auto' }} />
      </Box>
      <Typography variant="subtitle1" align="center" onClick={handleOpenDetails} style={{ cursor: 'pointer' }}>{product.productName}</Typography>
      <Typography variant="h6" align="center" style={{ color: 'red' }}>${product.price}</Typography>
      {showDetails && <ItemDetails product={product} onClose={handleCloseDetails}/>}
    </React.Fragment>
  );
}