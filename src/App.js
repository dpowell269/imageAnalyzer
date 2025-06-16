

import './App.css';


import { useState } from 'react';
import specData from './components/data/data';
//import SpecTabs from './components/molecules/SpecTabs';
import ImageAnalyzer from './components/organisms/ImageAnalyzer';

function App() {
  const tabNames = Object.keys(specData);
  const [activeTab, setActiveTab] = useState(tabNames[0]);

  return (
    <div className="App">
     

      <ImageAnalyzer spec={specData[activeTab]} />
    </div>
  );
}

export default App;

