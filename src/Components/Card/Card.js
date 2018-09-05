import React from 'react';

function Card(props) {
    return (
      <div
        onClick={props.onClick}
        className={`Card ${props.flipped? 'flipped' : '' } ${props.locked? 'locked' : ''}`}>
        <div className='Card-front'>
          {props.flipped? props.card: props.card}
        </div>
        <div className='Card-back' />
      </div>
    );
}

export default Card;
