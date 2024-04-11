import React, { createContext, useState } from 'react';
import DisplayAD from './displayAD';
import iphone1 from '../images/product/iphone1.png';
import iphone2 from '../images/product/iphone2.png';
import iphone3 from '../images/product/iphone3.png';
import iphone4 from '../images/product/iphone4.png';
import iphone5 from '../images/product/iphone5.png';
import iphone6 from '../images/product/iphone6.png';
import iphone7 from '../images/product/iphone7.png';
import iphone8 from '../images/product/iphone8.png';
import Samsung1 from '../images/product/Samsung1.png';
import Samsung2 from '../images/product/Samsung2.png';
import Samsung3 from '../images/product/Samsung3.png';
import Samsung4 from '../images/product/Samsung4.png';
import Samsung5 from '../images/product/Samsung5.png';
import Samsung6 from '../images/product/Samsung6.png';
import Samsung7 from '../images/product/Samsung7.png';
import Samsung8 from '../images/product/Samsung8.png';
import computer1 from '../images/product/computer1.png';
import computer2 from '../images/product/computer2.png';
import computer3 from '../images/product/computer3.png';
import computer4 from '../images/product/computer4.png';
import computer5 from '../images/product/computer5.png';
import computer6 from '../images/product/computer6.png';
import computer7 from '../images/product/computer7.png';
import computer8 from '../images/product/computer8.png';
import tv1 from '../images/product/tv1.png';
import tv2 from '../images/product/tv2.png';
import tv3 from '../images/product/tv3.png';
import tv4 from '../images/product/tv4.png';
import tv5 from '../images/product/tv5.png';
import tv6 from '../images/product/tv6.png';
import tv7 from '../images/product/tv7.png';
import tv8 from '../images/product/tv8.png';
import sound1 from '../images/product/sound1.png';
import sound2 from '../images/product/sound2.png';
import sound3 from '../images/product/sound3.png';
import sound4 from '../images/product/sound4.png';
import sound5 from '../images/product/sound5.png';
import sound6 from '../images/product/sound6.png';
import sound7 from '../images/product/sound7.png';
import sound8 from '../images/product/sound8.png';
import table1 from '../images/product/table1.png';
import dairy1 from '../images/product/dairy1.png';
import desksupplies1 from '../images/product/desksupplies1.png';
import shoe1 from '../images/product/shoe1.png';
import refrigerator1 from '../images/product/refrigerator1.png';



export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [userAccount, setUserAccount] = useState([
      { id:'00000001',name: 'Customer', password: '123456', Loginrole: 'Customer', orders: [],adds:[],delivery:[]},
      { id:'00000002', name: 'Delviery', password: '123456', Loginrole: 'Delviery', orders: [],adds:[],delivery:[] },
      { id:'00000003',name: 'Manager', password: '123456', Loginrole: 'Manager', orders: [] ,adds:[],delivery:[]},
      { id:'00000004',name: 'Account Specialist', password: '123456', Loginrole: 'Account Specialist',orders: [],adds:[],delivery:[] },
      { id:'00000005',name: 'Technician', password: '123456', Loginrole: 'Technician', orders: [],adds:[],delivery:[] },
      { id:'00000006',name: 'Marketing', password: '123456', Loginrole: 'Marketing', orders: [],adds:[],delivery:[] },
      { id:'00000007',name: 'Delviery2', password: '123456', Loginrole: 'Delviery', orders: [],adds:[],delivery:[] },
      { id:'00000008',name: 'Delviery3', password: '123456', Loginrole: 'Delviery', orders: [],adds:[],delivery:[] },
      { id:'00000009',name: 'Delviery4', password: '123456', Loginrole: 'Delviery', orders: [],adds:[],delivery:[] },
      { id:'000000010',name: 'Delviery5', password: '123456', Loginrole: 'Delviery', orders: [],adds:[],delivery:[] }
    ]); 


    const [username, setUsername] = useState('');
    const [functs, setfuncts] = useState(<DisplayAD/>);

    const products = [
        { id:'041',categories:'Furniture',subcategories:'tables',image: table1, productName: 'Computer Desk 47 Inch PC Laptop Study Table Office Desk Workstation for Home Office,Sandalwood Board', price: "119.00", rating: '4.3' },
        { id:'042',categories:'Grocery',subcategories:'dairy',image: dairy1, productName: 'Organic Valley, Organic Whole Milk, 64 Oz (Half Gallon)', price: "6.69", rating: '4.7' },
        { id:'043',categories:'OfficeSupplies',subcategories:'desksupplies',image: desksupplies1, productName: 'Marbrasse Pen Organizer with 5 Compartments + Drawer for Office Art Supplies (White)', price: "9.99", rating: '4.1' },
        { id:'044',categories:'Clothing',subcategories:'shoes',image: shoe1, productName: "Kricely Men's Trail Running Shoes Fashion Walking Hiking Sneakers for Men", price: "44.99", rating: '3.6' },
        { id:'045',categories:'Appliances',subcategories:'refrigerators',image: refrigerator1, productName: 'Honeywell H18TFW top Freezer Refrigerator, White', price: "749.90", rating: '4.3' },
        { id:'017',categories:'Electronics',subcategories:'computers',image: computer1, productName: 'Apple 2023 iMac Desktop Computer with M3: 8-core CPU,256GB SSD Storage', price: "1250.00", rating: '4.8' },
        { id:'018',categories:'Electronics',subcategories:'computers',image: computer2, productName: 'HP 2022 Newest21.5" FHD Display, Intel Celeron J4025 Processor, 16GB RAM', price: "277.00", rating: '4.4' },
        { id:'019',categories:'Electronics',subcategories:'computers',image: computer3, productName: 'Maypug Laptop Computer, 15.6" Laptops, 8GB RAM 256GB ROM, Intel Celeron', price: "200.00", rating: '4.6' },
        { id:'020',categories:'Electronics',subcategories:'computers',image: computer4, productName: 'HP Newest Stream 14" HD Laptop, Intel Celeron 2-Core Processor, 8GB DDR4 RAM, 64GB eMMC', price: "240.00", rating: '4.1' },
        { id:'021',categories:'Electronics',subcategories:'computers',image: computer5, productName: 'OTVOC Laptop 16 inch Intel 12th Gen N95, Up to 3.4GHz 16GB DDR5 RAM, 1TB PCIE NVME SSD', price: "390.00", rating: '4.2' },
        { id:'022',categories:'Electronics',subcategories:'computers',image: computer6, productName: 'Dell Inspiron 27 7720 All in One Desktop,Intel Core i5-1335U, 16GB DDR4 RAM, 512GB SSD', price: "929.00", rating: '3.9' },
        { id:'023',categories:'Electronics',subcategories:'computers',image: computer7, productName: 'Dell Inspiron 5425 Laptop - 14-inch, AMD Ryzen 7-5825U Processor, 16 GB DDR4 RAM, 1 TB SSD', price: "299.00", rating: '4.2' },
        { id:'024',categories:'Electronics',subcategories:'computers',image: computer8, productName: 'Dell Touchscreen 15.6" Laptop Computer,Laptop 32GB RAM 1TB SSD, Intel Core i5 Quad-Core,Black', price: "287.00", rating: '3.5' },
        { id:'025',categories:'Electronics',subcategories:'tvs',image: tv1, productName: 'INSIGNIA 42-inch Class F20 Series Smart Full HD 1080p Fire TV with Alexa Voice Remote', price: "149.00", rating: '4.8' },
        { id:'026',categories:'Electronics',subcategories:'tvs',image: tv2, productName: 'HP 2022 Newest21.5" FHD , Intel TCL 55-Inch Class S4 4K LED Smart TV, Black J4025 Processor, 16GB', price: "269.00" ,rating: '4.4' },
        { id:'027',categories:'Electronics',subcategories:'tvs',image: tv3, productName: 'VIZIO 50-Inch V-Series 4K UHD LED Smart TV with Voice Remote, Dolby Vision, HDR10+', price: "229.00", rating: '4.6' },
        { id:'028',categories:'Electronics',subcategories:'tvs',image: tv4, productName: '32-inch Class F20 Series Smart HD 720p Fire TV with Alexa Voice Remote', price: "129.00", rating: '4.1' },
        { id:'029',categories:'Electronics',subcategories:'tvs',image: tv5, productName: 'Roku 40" Select Series 1080p Full HD Smart RokuTV with Voice Remote, Bright Picture', price: "179.99", rating: '4.2' },
        { id:'030',categories:'Electronics',subcategories:'tvs',image: tv6, productName: 'TCL 75-Inch Q6 QLED 4K Smart TV with Google (75Q650G, 2023 Model) Dolby Vision, Atmos, HDR Pro+', price: "599.00", rating: '3.9' },
        { id:'031',categories:'Electronics',subcategories:'tvs',image: tv7, productName: 'Sony 50 Inch 4K Ultra HD TV X77L Series: LED Smart Google TV KD50X77L- 2023 Model, Black', price: "478.00", rating: '4.2' },
        { id:'032',categories:'Electronics',subcategories:'tvs',image: tv8, productName: 'LG Electronics 24LM530S-PU 24-Inch HD webOS 3.5 Smart TV, Black', price: "99.00", rating: '3.5' },
        { id:'033',categories:'Electronics',subcategories:'sounds',image: sound1, productName: 'Sony HT-A9 7.1.4ch High Performance Speaker System Multi-Dimensional Surround Sound ,White', price: "149.00", rating: '4.8' },
        { id:'034',categories:'Electronics',subcategories:'sounds',image: sound2, productName: 'Sony HT-S400 2.1ch Soundbar, S-Force PRO Front Surround Sound, and Dolby Digital, Black', price: "258.00" ,rating: '4.4' },
        { id:'035',categories:'Electronics',subcategories:'sounds',image: sound3, productName: 'sony S100F 2.0ch Soundbar with Bass Reflex Speaker, Integrated Tweeter,black', price: "98.00", rating: '4.6' },
        { id:'036',categories:'Electronics',subcategories:'sounds',image: sound4, productName: 'Sony STRDH590 5.2 Channel Surround Sound Receiver: 4K HDR AV Receiver with Bluetooth,Black', price: "348.00", rating: '4.1' },
        { id:'037',categories:'Electronics',subcategories:'sounds',image: sound5, productName: 'Sony Portable Bluetooth Digital Turner AM/FM CD Player Mega Bass Reflex Stereo Sound System', price: "199.00", rating: '4.2' },
        { id:'038',categories:'Electronics',subcategories:'sounds',image: sound6, productName: 'Sony SRS-XP700 X-Series Wireless Portable-BLUETOOTH,IPX4 Splash-resistant with 25 Hour-Battery,Black', price: "548.00", rating: '3.9' },
        { id:'039',categories:'Electronics',subcategories:'sounds',image: sound7, productName: 'Sony MDR-IF240RK Wireless Headphone System', price: "245.00", rating: '4.2' },
        { id:'040',categories:'Electronics',subcategories:'sounds',image: sound8, productName: 'Sony STR-AN1000 7.2CH Surround Sound 8K A/V Receiver: Dolby Atmos, DTS:X, HDMI 2.1 (Renewed)', price: "599.00", rating: '3.5' },
        { id:'001',categories:'Electronics',subcategories:'phones',image: iphone1, productName: 'Straight Talk Apple iPhone 11, 64GB, Black', price: "699.00", rating: '4.6' },
        { id:'002',categories:'Electronics',subcategories:'phones',image: iphone2, productName: 'Straight Talk Apple iPhone 12, US Version, Unlock, 64GB, Black', price: "799.00", rating: '4.3' },
        { id:'003',categories:'Electronics',subcategories:'phones',image: iphone3, productName: 'Straight Talk Apple iPhone SE 5G, 64GB, Midnight', price: "569.00", rating: '3.8' },
        { id:'004',categories:'Electronics',subcategories:'phones',image: iphone4, productName: 'Refurbished Apple iPhone XR 64GB Black', price: "489.00", rating: '4.2' },
        { id:'005',categories:'Electronics',subcategories:'phones',image: Samsung1, productName: 'Straight Talk Samsung Galaxy A03s, 32GB, Black', price: "399.00", rating: '3.6' },
        { id:'006',categories:'Electronics',subcategories:'phones',image: Samsung2, productName: 'Restored Samsung Galaxy Note9 N960U 128GB ', price: "299.00", rating: '4.0' },
        { id:'007',categories:'Electronics',subcategories:'phones',image: Samsung3, productName: 'Samsung Galaxy S22 5G, T-Mobile Only 128GB, Black', price: "899.00", rating: '3.3' },
        { id:'008',categories:'Electronics',subcategories:'phones',image: Samsung4, productName: 'AT&T Samsung Galaxy A14 5G, 64GB Black', price: "599.00", rating: '4.8' },
        { id:'009',categories:'Electronics',subcategories:'phones',image: iphone5, productName: 'Apple iPhone 11, 64GB, Black - Unlocked (Renewed)', price: "277.00", rating: '3.9' },
        { id:'010',categories:'Electronics',subcategories:'phones',image: iphone6, productName: ' Apple iPhone 12 Pro, 128GB, Pacific Blue - (Renewed)', price: "378.00", rating: '4.5' },
        { id:'011',categories:'Electronics',subcategories:'phones',image: iphone7, productName: 'Apple iPhone 13 Pro Max, 128GB, Sierra Blue ', price: "559.00", rating: '4' },
        { id:'012',categories:'Electronics',subcategories:'phones',image: iphone8, productName: 'Apple iPhone 15 Pro Max / 256GB / Black Titanium', price: "1430.00", rating: '4.7' },
        { id:'013',categories:'Electronics',subcategories:'phones',image: Samsung5, productName: 'Samsung Galaxy A15 (SM-155M/DSN), 128GB 6GB RAM(Blue Black)', price: "156.00", rating: '3.8' },
        { id:'014',categories:'Electronics',subcategories:'phones',image: Samsung6, productName: 'Samsung Galaxy S22  128GB, 8K Camera Phantom Black (Renewed)', price: "299.00", rating: '4.4' },
        { id:'015',categories:'Electronics',subcategories:'phones',image: Samsung7, productName: 'Samsung Galaxy S21 5G, US Version, 256GB, Phantom Gray  (Renewed)', price: "287.00", rating: '3.0' },
        { id:'016',categories:'Electronics',subcategories:'phones',image: Samsung8, productName: 'SAMSUNG Galaxy S21+ Plus G996U 5G 128GB - Phantom Silver - (Renewed)', price: "250.00", rating: '4.1' },
      ];


    return (
        <AppContext.Provider value={{ userAccount, setUserAccount, cartItems, setCartItems, username, setUsername, functs, setfuncts,products }}>
            {children}
        </AppContext.Provider>
    );
};
