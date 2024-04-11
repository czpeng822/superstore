import React, { useContext  } from 'react';
import { AppContext } from './AppContext';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Popover from '@mui/material/Popover';
import Phones from './Item_Phones.js';

export default function BurgerButton() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [subMenuAnchorEl, setSubMenuAnchorEl] = React.useState({});
  const { setfuncts } = useContext(AppContext);

  const categories = [
    {
      title: 'Electronics',
      items: [
        { name: 'Phones', url: <Phones/> },
        { name: 'Computers', url: '' },
        { name: 'TV', url: '' },
        { name: 'Sound System', url: '' }
      ]
    },
    {
      title: 'Furniture',
      items: [
        { name: 'Bookcases', url: '' },
        { name: 'Chairs', url: '' },
        { name: 'Tables', url: '' }
      ]
    },
    {
      title: 'Grocery',
      items: [
        { name: 'Dairy', url: '' },
        { name: 'Beans', url: '' },
        { name: 'Pasta', url: '' },
        { name: 'Paper products', url: '' },
        { name: 'Cleaning supplies', url: '' }
      ]
    },
    {
      title: 'Office Supplies',
      items: [
        { name: 'Desk Supplies', url: '' },
        { name: 'Filing Supplies', url: '/' },
        { name: 'Paper & Pads', url: '' },
        { name: 'Binding Supplies', url: '' },
        { name: 'Stationery/Mailing supplies', url: '' }
      ]
    },
    {
      title: 'Clothing',
      items: [
        { name: 'Shoes', url: '' },
        { name: 'Socks', url: '' },
        { name: 'Dresses', url: '' },
        { name: 'Jackets', url: '' },
        { name: 'Shorts', url: '' },
        { name: 'Shirts', url: '' }
      ]
    },
    {
      title: 'Appliances',
      items: [
        { name: 'Refrigerators', url: '' },
        { name: 'Dishwashers', url: '' },
        { name: 'Microwaves', url: '' },
        { name: 'Washers', url: '' },
        { name: 'Dryers', url: '' }
      ]
    }
  ];
  

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSubMenuOpen = (event, index) => {
    setSubMenuAnchorEl({ ...subMenuAnchorEl, [index]: event.currentTarget });
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSubMenuClose = (index) => {
    setSubMenuAnchorEl({ ...subMenuAnchorEl, [index]: null });
  };

  return (
    <Box>
      <IconButton
        aria-label="menu"
        aria-controls="menu"
        aria-haspopup="true"
        onClick={handleMenuOpen}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {categories.map((category, index) => (
          <div key={category.title} onClick={(event) => handleSubMenuOpen(event, index)} style={{ borderBottom: '2px solid #bbb',borderColor: 'rgba(0, 0, 0, 0.1)', backgroundColor: '#1976D2', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '300px', height: '50px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ mr: 4, padding: '8px 16px' }}>
                {category.title}
              </Typography>
            </div>
            <ChevronRightIcon />
          </div>
        ))}
      </Menu>
      {categories.map((category, index) => (
        <Popover
          key={category.title}
          anchorEl={subMenuAnchorEl[index]}
          open={Boolean(subMenuAnchorEl[index])}
          onClose={() => handleSubMenuClose(index)}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          {category.items.map((item) => (
            <MenuItem key={item.name}  onClick={() => {
              if (item.url !== '') {
                setfuncts(item.url);
              }
              handleSubMenuClose(index);
              handleMenuClose();
            }}  style={{ borderBottom: '2px solid',borderColor: 'rgba(0, 0, 0, 0.1)', backgroundColor: '#1976D2', cursor: 'pointer', width: '300px', height: '50px' }}>
              <ListItemText primary={item.name} />
            </MenuItem>
          ))}
        </Popover>
      ))}
    </Box>
  );
}
