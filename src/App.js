import React from 'react';
import Simulator from './components/Simulator';
import SecondPlan from './components/SecondPlan'

function App() {


  let sp = new SecondPlan();

  let maxZile = 2
  
  sp.ruleaza(maxZile)
  sp.arataZile()

  return (
    <div className="App">
      {/* <Simulator /> */}
    </div>
  );
}

export default App;
