import React from 'react';
import SecondPlan from './components/SecondPlan'

function App() {


  // In 5 zile se studiaza numarul de barbati, femei, adolescenti
  // au fost contagiati 
  let sp = new SecondPlan();

  let maxZile = 3
  
  sp.ruleaza(maxZile)
  sp.arataZile()

  return (
    <div className="App">
      {/* <Simulator /> */}
    </div>
  );
}

export default App;
