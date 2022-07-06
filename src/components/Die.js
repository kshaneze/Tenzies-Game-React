import React from 'react'

function Die(props) {
  return (
    <section 
        onClick={() =>props.holdDice(props.id)} 
        className='die' 
        style={{backgroundColor: props.isHeld ? "#59E391" : "white"}}>
        <h2>{props.value}</h2>
    </section>
  ) 
}

export default Die