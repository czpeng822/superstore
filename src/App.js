import React, { useContext } from 'react';
import './App.css';
import Sidebar from './components/functionsidebar.js';
import PrimarySearchAppBar from './components/searchbar.js';
import TitledSection from './components/TitledSection.js';
import { AppContext } from './components/AppContext.js';
import { AppProvider } from './components/AppContext'; 

function App() {
  return (
    <AppProvider>
      <div className="App">
        <PrimarySearchAppBar/>
        <div style={{ display: 'flex', width:"97%",height:"950px"}}>
          <Sidebar/>
          <Content />
        </div>
        <TitledSection />
      </div>
    </AppProvider>
  );
}

function Content() {
  const { functs} = useContext(AppContext);

  return (
    <div className="content" style={{ width:"1400px",marginLeft: '0px', paddingTop: '30px'}}>
      {functs}
    </div>
  );
}

export default App;

