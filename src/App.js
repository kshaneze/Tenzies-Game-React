import React from 'react'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {

  const [dice, setDice] = React.useState(allNewDice())

  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
   const allHeld = dice.every(die => die.isHeld)
    const allSameValue = dice.every(die => die.value === dice[0].value)

    if(allHeld && allSameValue) {
      setTenzies(true)
      console.log('you won')
    }
  }, [dice])
  

  function allNewDice () {
    const arrayOfRandomNumbers = []
    for(let i = 0; i < 10; i++) {
      arrayOfRandomNumbers.push(generateNewDie())
    }
   return arrayOfRandomNumbers
  }

  function generateNewDie () {
    return {
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid()
    }
  }

  const diceElements = 
  dice.map(die => <Die 
             key={die.id} 
             value={die.value} 
             isHeld={die.isHeld}
             holdDice={holdDice}
             id={die.id}/>)

 
  function rollDice () {
    setDice(prevDice => prevDice.map(dice => {
      return dice.isHeld ? 
          dice : generateNewDie() }))
  }

  function holdDice (id) {  
    setDice(prevDice => prevDice.map(dice =>  {
       return dice.id === id ? 
            {...dice, isHeld: !dice.isHeld} :
            dice
    }))
  }


  return (
    
    <main className='game-container'>
      {tenzies && <Confetti />}
    
      <h1 className='title'>Tenzies</h1>
      <p className='instructions'>Roll until all dice are the same. Click each die to freeze it at its current value between rools</p>

        <div className='die-container'>
            {diceElements}
      </div>

      <button onClick={rollDice} className='btn btn-roll'>{tenzies ? 'New Game'  : 'Roll'}</button>
      
    </main>
  )
}

export default App