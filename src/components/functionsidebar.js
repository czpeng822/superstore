import React, { useContext  } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Electronics from './Item_Electronics.js';
import OrdersList from './orderList.js';
import DisplayAD from './displayAD.js';
import { AppContext } from './AppContext';
import DeliveryList from './deliveryList.js';
import Product from './Item_Product.js'


function Sidebar() {

  const [submenuOpen, setSubmenuOpen] = React.useState({});
  const { setfuncts } = useContext(AppContext);

  const navigationLinks = [
    { id: 1, label: "Recommend",submenu: [
      { id: 1, label: "Deals", URL: <DisplayAD/> },
      { id: 2, label: "Best sellers",URL: '' },
      { id: 3, label: "New Releases",URL: '' }]    
  },
    { id: 2, label: "Products", submenu: [
      { id: 1, label: "All Products",URL: <Product/> },
      { id: 2, label: "Electronics",URL: <Electronics/> },
      { id: 3, label: "Furniture",URL:''},
      { id: 4, label: "Grocery",URL: '' },
      { id: 5, label: "Office Supplies",URL: '' },
      { id: 6, label: "Clothing",URL: '' },
      { id: 7, label: "Appliances",URL: '' } ]
  },
    { id: 3, label: "Orders", submenu: [
      { id: 1, label: "All Orders",URL: <OrdersList/> },
      { id: 2, label: "In Progress",URL: '' },
      { id: 3, label: "Cancelled",URL: '' },
      { id: 4, label: "Completed",URL: '' }]
  },
    { id: 4, label: "Customers",submenu: [
      { id: 1, label: "Account Management",URL: '' },
      { id: 2, label: "Payment Management",URL: '' },
      { id: 3, label: "Profiles Management",URL: '' },
      { id: 4, label: "Personal Settings" ,URL: ''}] 
  },
    { id: 5, label: "Reports",submenu: [
      { id: 1, label: "Order Report",URL: '' },
      { id: 2, label: "Service Report",URL: '' },
      { id: 3, label: "Other Report",URL: '' }]
  },
    { id: 6, label: "Contact Us",submenu: [
      { id: 1, label: "Order Service",URL: '' },
      { id: 2, label: "Shipping Service",URL:<DeliveryList/>},
      { id: 3, label: "Repair Services" ,URL: ''},
      { id: 4, label: "Customer Service",URL: ''}]
  }
]

  const handleSubmenuToggle = (id) => {
    setSubmenuOpen((prevState) => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  return (
    <div style={{ flex: 1 ,background:"#1976D2"}}>
      {navigationLinks.map((link, index) => (
        <React.Fragment key={link.id}>
          <ListItemButton onClick={() => link.submenu && handleSubmenuToggle(link.id)}>
            <ListItemText primary={link.label} style={{ marginLeft: '30px' }}/>
            {link.submenu && (submenuOpen[link.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
          </ListItemButton>
          {index !== navigationLinks.length - 1 && <hr style={{ borderColor: 'rgba(0, 0, 0, 0.1)', margin: '0' }} />}
          {submenuOpen[link.id] && link.submenu && (
            <div style={{ marginLeft: '50px' }}>
              {link.submenu.map((sublink) => (
                <ListItemButton key={sublink.id} onClick={() => sublink.URL===''? '':setfuncts(sublink.URL) } dense>
                  <ListItemText primary={sublink.label} />
                </ListItemButton>
              ))}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>)
}

export default Sidebar;