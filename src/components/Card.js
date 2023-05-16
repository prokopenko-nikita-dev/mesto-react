import React from "react";

function Card(card, onCardClick) {

  function handleCardClick() {
    onCardClick(card)
  }
    return(
        <li className="cards">
          <div className="cards__container">
            <img className="cards__img" src={card?.link || ""} alt={card && card.name} onClick={handleCardClick}/>
            <button type="button" className="cards__trash cards__trash_inactive"></button>
          </div>
          <div className="cards__info">
            <h2 className="cards__info-heading">{card && card.name}</h2>
            <div className="cards__info-wrapper">
              <button aria-label="like" type="button" className="cards__info-like"></button>
              <span className="cards__info-counter"></span>
            </div>
          </div>
        </li>
    )
}

export default Card;