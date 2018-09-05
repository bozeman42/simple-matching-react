import React, { Component } from 'react'
import Card from '../Card/Card'
import './Gameboard.css'

class Gameboard extends Component {
  constructor(props){
    super(props)
    this.state = {
      cards: this.generateCardArray(),
      showing: [],
      locked: [],
    }
    this.flipCard = this.flipCard.bind(this)
  }

  generateCardArray(){
    let beginningArray = []
    for (let i = 0; i < 10; i++){
      beginningArray.push(String.fromCharCode(65 + i))
      beginningArray.push(String.fromCharCode(97 + i))
    }
    console.log(beginningArray)
    let cardArray = [];
    while (beginningArray.length > 0) {
      console.log(beginningArray.length)
      cardArray = [
        ...cardArray,
        beginningArray.splice(Math.floor(Math.random()*beginningArray.length),1)[0]
      ]
    }
    return cardArray
  }

  flipCard(index){
    return e => {
      const { cards, showing } = this.state
      if (index === showing[0]) {
        return;
      }
      console.log(this.state);
      if (showing.length === 1){
        if (cards[showing[0]].toUpperCase() === cards[index].toUpperCase()){
          this.setState({
            ...this.state,
            locked: [
              ...this.state.locked,
              ...this.state.showing,
              index
            ],
            showing: []
          })
        } else {
          this.setState({
            ...this.state,
            showing: [
              ...this.state.showing,
              index
            ],
          })
          setTimeout(() => {
            this.setState({
              ...this.state,
              showing: []
            })
          },1000)
        }
      } else if (showing.length === 2){
        return null;
      } else {
        this.setState({
          ...this.state,
          showing: [
            ...this.state.showing,
            index
          ],
        })
      }
      console.log(this.state)
    }
  }

  renderCards(){
    return this.state.cards.map((card,index) => {
      return (
        <div key={card} className="card-container">
        <Card 
          onClick={this.flipCard(index)}
          card={card}
          flipped={this.state.showing.includes(index) || this.state.locked.includes(index)}
          locked={this.state.locked.includes(index)}
        />
        </div>
      )
    })
  }

  render() {
    return (
      <div className="Gameboard">
        {this.renderCards()}
      </div>
    );
  }
}

export default Gameboard;
