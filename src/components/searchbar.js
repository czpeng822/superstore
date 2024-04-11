import React, { useContext,useState  } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BurgerButton from './burgerbutton.js'
import logo from '../images/logo.png'
import Account from './Account.js';
import ShoppingCart from './cart.js'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppContext } from './AppContext';
import ItemDetails from './Item_Information';


// Styled component for search bar
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

// Styled component for Search Icon Wrapper
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

// Styled component for input base
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

// Styled component for dropdown menu
const Dropdown = styled('div')(({ theme }) => ({
  position: 'absolute',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
  borderRadius: theme.shape.borderRadius,
  marginTop: theme.spacing(1),
  minWidth: '100%',
  zIndex: 1,
}));

// Styled component for dropdown item
const DropdownItem = styled(MenuItem)(({ theme }) => ({
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.25),
  },
  color: theme.palette.text.primary,
}));

export default function PrimarySearchAppBar() {
    // State variables
  const [anchorEl, setAnchorEl] = React.useState(null);
   // eslint-disable-next-line
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [searchResults, setSearchResults] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const { cartItems,setfuncts,products } = useContext(AppContext);
  const [selectedProduct, setSelectedProduct] = useState(null);


  // Event handlers

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
    const filteredResults = products.filter((product) =>
      product.productName.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const handleSelectProduct = (result) => {
    setSelectedProduct(result);
    setSearchQuery('');
    handleMenuClose();
    setSearchResults([])
  }

  // Set the maximum number of items to display in the dropdown
  const maxDropdownItems = 5;

  const totalQuantity = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        {/* Render a NestedMenu component */}
         <BurgerButton anchorEl={anchorEl} onClose={handleMenuClose} st={{background:'#aaa'}}/>
         {/* Render the logo */}
         <img src={logo} alt="Logo" style={{ width: '75px', height: '75px' }} />
          {/* Render the title of the application */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } , marginLeft: '10px'}}
          >
            Superstore
          </Typography>
          
          {/* Render the search bar */}
          <Search>
          <SearchIconWrapper>
          <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchQuery}
              onChange={handleSearchChange}
              />
  
            {/* Render dropdown for search results if searchQuery exists */}
            {searchQuery && (
              <Dropdown>
                {searchResults.slice(0, maxDropdownItems).map((result, index) => (
                  <DropdownItem
                  key={index}
                  onClick={() => handleSelectProduct(result)}
                  >
                    <img src={result.image} alt={result.productName} style={{ width: '30px', height: '30px', marginRight: '10px' }} />
                    {result.productName}
                    , ${result.price}
                    </DropdownItem>
                ))}
              </Dropdown>
            )}
          </Search>
          {/* load product details */}
          {selectedProduct && <ItemDetails product={selectedProduct} onClose={()=>{setSelectedProduct(null)}}/>}
          
     <Box sx={{ flexGrow: 1 }} />
        {/* Shopping Cart icon */} 
       <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <IconButton aria-label="cart" color="inherit">
             <Badge badgeContent={totalQuantity} color="error">
             <ShoppingCartIcon onClick={() => setfuncts(<ShoppingCart/>)}/>
             </Badge>
         </IconButton> 
        {/* Mail icon */}  
            <IconButton
              size="large"
              aria-label="show 1 new mails"
              color="inherit"
            >
              <Badge badgeContent={1} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
        {/* Notifications icon */}
            <IconButton
              size="large"
              aria-label="show 2 new notifications"
              color="inherit"
            >
              <Badge badgeContent={2} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Account/>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
