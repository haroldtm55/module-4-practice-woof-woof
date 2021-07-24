import React from 'react'

function DogName({dog, index, handleClickOnDogName}) {
  return <span onClick={()=>handleClickOnDogName(index)}>{dog.name}</span>
}

export default DogName