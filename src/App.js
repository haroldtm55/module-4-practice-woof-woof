import React, { useState, useEffect } from 'react';
import './App.css';
import DogName from './components/DogName';
import DogInfo from './components/DogInfo';


function App() {
  const [{dogs}, setDogs] = useState({dogs:[]})
  const [{dogIndex}, setDogIndex] = useState({dogIndex: ''})
  const [{goodDogsToggle}, setgoodDogsToggle] = useState({goodDogsToggle: false})

  useEffect(()=> {
    fetchDogs()
  },[])

  const fetchDogs = () => {
    fetch('http://localhost:3000/pups')
      .then(resp => resp.json())
      .then(dogs => {
        setDogs({dogs})
      })
  }

  const handleClickOnDogName = (dogIndex) => {
    setDogIndex({dogIndex: dogIndex})
  }

  const changeDogStatus = (dogId) => {
    console.log(dogId)
    const newDogStatus = {
      isGoodDog: !dogs[dogIndex].isGoodDog
    }
    const configObj = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newDogStatus)
    }
    fetch(`http://localhost:3000/pups/${dogId}`,configObj)
      .then(fetchDogs)
  }

  const toggleFilterGoodDogs = () => {
    setgoodDogsToggle({goodDogsToggle: !goodDogsToggle})
  } 

  const renderDogs = () => {
    if (goodDogsToggle) {
      return dogs.filter(dog => dog.isGoodDog === true).map((dog, idx)=> <DogName key={dog.id} index={idx} dog={dog} handleClickOnDogName={handleClickOnDogName} />)
    } else return dogs.map((dog, idx)=> <DogName key={dog.id} index={idx} dog={dog} handleClickOnDogName={handleClickOnDogName} />)
  }
  

  return (
    <div className="App">
      <div id="filter-div">
        <button onClick={toggleFilterGoodDogs} id="good-dog-filter">Filter good dogs: {goodDogsToggle ? 'ON' : 'OFF'}</button>
      </div>
      <div id="dog-bar">
        {renderDogs()}
      </div>
      <div id="dog-summary-container">
        <h1>DOGGO:</h1>
        <div id="dog-info">
          {dogIndex!==''&&<DogInfo selectedDog={dogs[dogIndex]} changeDogStatus={changeDogStatus}/>}
        </div>
      </div>
    </div>
  );
}

export default App;
