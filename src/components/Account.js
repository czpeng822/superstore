import React, { useState, useEffect, useContext } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { AppContext } from './AppContext';
import Alert from '@mui/material/Alert';

const user_roles = [
  { label: 'Customer' },
  { label: 'Delviery' },
  { label: 'Manager' },
  { label: 'Account Specialist' },
  { label: 'Technician' },
  { label: 'Marketing' },
  { label: 'Administrator' },
];

// Modal style
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Account() {
  const { userAccount, setUserAccount, username, setUsername } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [loginid, setLoginid] = useState('');
  const [openuserinfo, setOpenuserinfo] = useState('');
  const [loginrole, setLoginrole] = React.useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedLoginrole = localStorage.getItem('loginrole');
    const storedLoginid = localStorage.getItem('loginid');
    if (storedUsername && storedLoginrole) {
      setUsername(storedUsername);
      setLoginrole(storedLoginrole);
      setLoginid(storedLoginid);
    }
  }, [setUsername, setLoginrole, setLoginid]);
  
  useEffect(() => {
    localStorage.setItem('username', username);
    localStorage.setItem('loginrole', loginrole);
    localStorage.setItem('loginid', loginid);
  }, [username, loginrole, loginid]);
  
  const handleOpen = () => {
    if (username === '') {
      setOpen(true);
    } else {
      handleUserInfoOpen();
    }
  };
 
  const handleClose = () => {
    setOpen(false);
    setError('');
    setShowSuccessAlert('')
    setIsRegistering(false); 
    setShowConfirmation(false);
  };

  const handleAuth = () => {
    const userName = isRegistering ? document.getElementById('RegUserName').value : document.getElementById('UserName').value;
    const password = isRegistering ? document.getElementById('RegPassword').value : document.getElementById('Password').value;
    const selectedUserRole = document.getElementById('combo-box-demo').value;

    if (isRegistering) {
      handleRegistration(userName, password, selectedUserRole);
    } else {
      handleLogin(userName, password, selectedUserRole);
    }
  };

  const handleLogin = (userName, password, selectedUserRole) => {
    const matchedUser = userAccount.find(user => user.name === userName && user.password === password && user.Loginrole === selectedUserRole);
    if (matchedUser) {
      setError('');
      setLoginrole(selectedUserRole);
      setUsername(userName);
      setLoginid(matchedUser.id);
      localStorage.setItem('username', userName);
      localStorage.setItem('loginrole', selectedUserRole);
      localStorage.setItem('loginid', matchedUser.id);
      setShowSuccessAlert('Log in success.')
      setTimeout(() => {
        handleClose();
      }, 1000);
    } else {
      setError('Username, password, role is invalid !');
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };

  const handleRegistration = (userName, password, selectedUserRole) => {
    const isExistingUser = userAccount.some(user => user.name === userName);
    if (isExistingUser) {
      setError('Username already exists');
    } else {
      setError('');
      setUserAccount(prevUserAccount => {
        const maxId = Math.max(...userAccount.map(user => user.id));
        const newId = maxId + 1
        return [...prevUserAccount, { id: newId.toString().padStart(8, '0'), name: userName, password: password, Loginrole: selectedUserRole, orders: [], adds: [],delivery:[] }];
      });
      setShowSuccessAlert('Sign up success, the new account can be logged in.')
      setTimeout(() => {
        handleClose();
      }, 1500);

    }
  };

  const handleRegistrationOpen = () => {
    setOpen(true);
    setError('');
    setIsRegistering(true);
  };

  const handleUserInfoOpen = () => {
    setOpenuserinfo(true);
  };

  const handleUserInfoClose = () => {
    setOpenuserinfo(false);
  };

  const handleLogout = () => {
    if (!showConfirmation) {
      setShowConfirmation("click log out button again to comfim leave!");
      setTimeout(() => {
        setShowConfirmation("")
      }, 2000);
    } else {
      setUsername('');
      setLoginrole('');
      localStorage.removeItem('username');
      localStorage.removeItem('loginrole');
      localStorage.removeItem('loginid');
      setOpenuserinfo(false);
      setShowConfirmation("");
    }
  };

  const handleDeleteInfo = (property, value) => {
    if (!showConfirmation) {
      setShowConfirmation("Can't recover from deletion. Click the delete button again if you are sure to delete it!");
      setTimeout(() => {
        setShowConfirmation("")
      }, 5000);
    } else {
    setUserAccount(prevUserAccount => {
      const updatedUserAccount = prevUserAccount.map(user => {
        if (user.name === username) {
          const updatedAdds = user.adds.filter(add => add[property] !== value);
          return { ...user, adds: updatedAdds };
        }
        return user;
      });
      return updatedUserAccount;
    });
    setShowConfirmation("")
    setShowSuccessAlert("Delete the information success.")
    setTimeout(() => {
      setShowSuccessAlert("")
    }, 3000);
  }};
  
  const currentUser = userAccount.find(user => user.name === username);

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>         
        <Avatar
          sx={{ bgcolor: "#d84315" }}
          alt={username}
          src="/broken-image.jpg"
        />
        <Button onClick={handleOpen} sx={{ color: 'white', textDecoration: username !== "" ? 'underline' : 'none' }}>{username === "" ? "Log in" : `${username}(id:${loginid})`}</Button>

        <Button onClick={handleRegistrationOpen} sx={{ color: 'white', display: loginrole === "Account Specialist" || loginrole === '' ? "block" : "none" }}>Sign up</Button>
     
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ ...style}}>
            <Typography id="modal-modal-title" variant="h6" component="h2" textAlign='center'>
              {isRegistering ? "Sign Up New Users" : "Log in"}
            </Typography>
            <br />
            
            <React.Fragment>
              <Typography>Account Role:</Typography>
              {isRegistering && username === '' ?  
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={[{ label: 'Customer' }]}
                  defaultValue={{ label: 'Customer' }}
                  sx={{ width: '100%' }}
                  renderInput={(params) => <TextField {...params} />}
                /> :
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={user_roles}
                  defaultValue={{ label: 'Customer' }}
                  sx={{ width: '100%' }}
                  renderInput={(params) => <TextField {...params} />}
                />
              }
            </React.Fragment>

            <Typography>User Name:</Typography>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { width: '100%' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField id={isRegistering ? "RegUserName" : "UserName"} variant="outlined" />
            </Box>

            <Typography>Password:</Typography>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { width: '100%' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField id={isRegistering ? "RegPassword" : "Password"} variant="outlined" type="password" />
            </Box>
            <br/>
            {/*error message*/}
               {error && ( <Alert variant="outlined" severity="error">   {error}   </Alert> )}
            {/*success message*/}
               {showSuccessAlert && ( <Alert variant="outlined" severity="success">   {showSuccessAlert}   </Alert> )}
            <br />
            <Stack spacing={2} direction="row" justifyContent="center">
              <Button variant="contained" onClick={handleAuth}>
                {isRegistering ? "Register" : "Log in"}
              </Button>
              <Button onClick={handleClose} variant="contained" color="grey">Cancel</Button>
            </Stack>
          </Box>
        </Modal>

        <Modal
          open={openuserinfo}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ ...style, width: '800px' }}>
            <Typography id="modal-modal-title" variant="h6" component="h2" textAlign='center' fontWeight="bold">
              User Information
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h4 style={{ marginRight: '8px' }}>User ID:   </h4> 
              <Typography>  {loginid}</Typography>
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h4 style={{ marginRight: '8px' }}>User Account:   </h4> 
              <Typography>  {username}</Typography>
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
               <h4 style={{ marginRight: '8px' }}>User Role:   </h4>  
               <Typography> {loginrole}</Typography>
            </div>

            <h4>User Full Address:</h4>
            <Typography>
              {currentUser && currentUser.adds.filter(add => add.address).map((add, index) => (
                <React.Fragment key={index}>
                  {index > 0 && ", "}
                  {add.address}
                  <IconButton onClick={() => handleDeleteInfo('address', add.address)} size="small">
                    <DeleteIcon />
                  </IconButton>
                </React.Fragment>
              ))}
              {(!currentUser || currentUser.adds.filter(add => add.address).length === 0) && (
                "No record"
              )}
            </Typography>

            <h4>Contact Person:</h4>
            <Typography>
              {currentUser && currentUser.adds.filter(add => add.contactPerson).map((add, index) => (
                <React.Fragment key={index}>
                  {index > 0 && ", "}
                  {add.contactPerson}
                  <IconButton onClick={() => handleDeleteInfo('contactPerson', add.contactPerson)} size="small">
                    <DeleteIcon />
                  </IconButton>
                </React.Fragment>
              ))}
              {(!currentUser || currentUser.adds.filter(add => add.contactPerson).length === 0) && (
                "No record"
              )}
            </Typography>

            <h4>Phone Number:</h4>
            <Typography>
              {currentUser && currentUser.adds.filter(add => add.phoneNumber).map((add, index) => (
                <React.Fragment key={index}>
                  {index > 0 && ", "}
                  {add.phoneNumber}
                  <IconButton onClick={() => handleDeleteInfo('phoneNumber', add.phoneNumber)} size="small">
                    <DeleteIcon />
                  </IconButton>
                </React.Fragment>
              ))}
              {(!currentUser || currentUser.adds.filter(add => add.phoneNumber).length === 0) && (
                "No record"
              )}
            </Typography>

            <h4>Postal Code:</h4>
            <Typography>
              {currentUser && currentUser.adds.filter(add => add.postalCode).map((add, index) => (
                <React.Fragment key={index}>
                  {index > 0 && ", "}
                  {add.postalCode}
                  <IconButton onClick={() => handleDeleteInfo('postalCode', add.postalCode)} size="small">
                    <DeleteIcon />
                  </IconButton>
                </React.Fragment>
              ))}
              {(!currentUser || currentUser.adds.filter(add => add.postalCode).length === 0) && (
                "No record"
              )}
            </Typography>
            {/*comfirm message*/}
            <br />
            {showConfirmation &&( <Alert variant="outlined" severity="info">{showConfirmation}</Alert>)}
            {/*success message*/}
            {showSuccessAlert && ( <Alert variant="outlined" severity="success"> {showSuccessAlert}</Alert> )}  
            <br />
            <Stack spacing={2} direction="row" justifyContent="center">
              <Button variant="contained" onClick={handleLogout}>Log out</Button>
              <Button onClick={handleUserInfoClose} variant="contained" color="grey">Cancel</Button>
            </Stack>
          </Box>
        </Modal>
      </Toolbar>
    </React.Fragment>
  );
}

export default Account;
