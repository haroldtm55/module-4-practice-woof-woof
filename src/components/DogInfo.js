import React from 'react'

function DogInfo({selectedDog, changeDogStatus}) {
  return (
    <>
      <img src={selectedDog.image} alt={selectedDog.name}></img> 
      <h2>{selectedDog.name}</h2>
      {selectedDog && <button onClick={()=>changeDogStatus(selectedDog.id)}>{selectedDog.isGoodDog ? 'Good Dog!' : 'Bad Dog!'}</button>}
    </>
    
  )
}

export default DogInfo