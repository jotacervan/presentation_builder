import React, { useState, useEffect } from 'react'
import Item from '../Item'
import api from '../../../services/api';
import update from 'immutability-helper';
import List from '@material-ui/core/List';

const Container = ({presId}) => {
  {
    const [cards, setCards] = useState([])
    useEffect(() => {
      api.get(`/slide/${presId}`).then(({data}) => {
        setCards(data)
      })
    }, [])

    const moveCard = (dragIndex, hoverIndex) => {
      const dragCard = cards[dragIndex]
      setCards(
        update(cards, {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
        }),
      )
    }
    return (
      <List dense>
        {cards.length > 0 && cards.map((card, i) => (
          <Item
            key={card.id}
            index={i}
            id={card.id}
            text={`Slide ${i + 1}`}
            img={card.image.url}
            moveCard={moveCard}
          />
        ))}
      </List>
    )
  }
}
export default Container
