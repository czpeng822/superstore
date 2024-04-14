import React, { createContext, useState,useEffect } from 'react';
import DisplayAD from './displayAD';
import axios from 'axios';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [userAccount, setUserAccount] = useState([]); 


    const [username, setUsername] = useState('');
    const [functs, setfuncts] = useState(<DisplayAD/>);
    const [products, setProducts] = useState([]);

    useEffect(() => {
      axios.get('/product')
          .then(response => {
              setProducts(response.data);
            })
          .catch(error => {
              console.error('Error fetching product data:', error);
            });
    }, []);

    useEffect(() => {
      axios.get('/userAccount')
          .then(response => {
            setUserAccount(response.data);
            })
          .catch(error => {
              console.error('Error fetching product data:', error);
            });
    }, []);

    return (
        <AppContext.Provider value={{ userAccount, setUserAccount, cartItems, setCartItems, username, setUsername, functs, setfuncts,products }}>
            {children}
        </AppContext.Provider>
    );
};
