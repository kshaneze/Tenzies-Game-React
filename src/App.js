import React from 'react'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {

  const [dice, setDice] = React.useState(allNewDice())

  const [tenzies, setTenzies] = React.useState(false)

  const [rollCount, setRollCount] = React.useState(0)

  const [counter, setCounter] = React.useState(0);

  
  let timer
  React.useEffect(() => {
      if(!tenzies) {
        timer =
        counter < 120 && setInterval(() => setCounter(counter + 1), 1000);
        return () => clearInterval(timer);
        
    } else {
        clearInterval(timer)
    }
        
  }, [counter]);

  const minutes = Math.floor(counter / 60)
  const seconds = counter % 60
  

  React.useEffect(() => {
   const allHeld = dice.every(die => die.isHeld)
    const allSameValue = dice.every(die => die.value === dice[0].value)

    if(allHeld && allSameValue) {
      setTenzies(true)
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
  dice.map(die => 
        <Die 
             key={die.id} 
             value={die.value} 
             isHeld={die.isHeld}
             holdDice={holdDice}
             id={die.id}
        />)

  
  function rollDice () {
    if(!tenzies) {
      setRollCount(prevCount => prevCount + 1)
      
      setDice(prevDice => prevDice.map(dice => {
        return dice.isHeld ? 
            dice : generateNewDie() }))
    } else {
      setDice(allNewDice())
      setTenzies(false)
      setRollCount(0)
      setCounter(0)
    }  
    
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

      <div className='scores--time-container'>
        <div className='scores--best-time'>
          <h3>Best Time</h3>
          <h2>2</h2>
        </div>

        <div className='scores--current-time'>
          <h3>Current Time</h3>
          <h2>0{minutes}:{("0" + seconds).slice(-2)}</h2>
        </div>       
      </div>

      <div className='scores--roll-container'>
        <div className='scores--best-roll'>
          <h3>Best Score</h3>
          <h3>Roll 10</h3>
        </div>

        <div className='scores--current-roll'>
          <h3>Current Roll</h3>
          <h3>Roll {rollCount}</h3>
        </div>       
      </div>

      

      <button onClick={rollDice} className='btn btn-roll'>{tenzies ? 'New Game'  : 'Roll'}</button>
      
    </main>
  )
}

export default App