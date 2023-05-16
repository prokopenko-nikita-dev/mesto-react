import { useEffect, useState } from "react"
import api from "../utils/Api.js";
import Card from "./Card.js";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [UserAvatar, setUserAvatar] = useState("");
  const [UserName, setUserName] = useState("");
  const [UserDescription, setUserDescription] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getUser()
      .then((profileUserInfo) => {
        setUserName(profileUserInfo.name);
        setUserDescription(profileUserInfo.about);
        setUserAvatar(profileUserInfo.avatar);
      })
      .catch((error) => console.log(error));
    api  
      .getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((error) => console.log(error));
}, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-wrapper">
          <img className="profile__avatar" src={UserAvatar} alt="аватарка пользователя" />
          <div className="profile__button-wrapper">
            <button type="button" className="profile__avatar-button" onClick={onEditAvatar}></button>
          </div>
        </div>
        <div className="profile__info">
          <div className="profile__edit">
            <h1 className="profile__edit-name">{UserName}</h1>
            <button type="button" className="profile__edit-profile" onClick={onEditProfile} aria-label="Редактировать профиль"></button>
          </div>
          <p className="profile__edit-prof">{UserDescription}</p>
        </div>
        <button type="button" className="profile__add-button" onClick={onAddPlace} aria-label="Добваить карточку"></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
        {cards.map((card) => (
          <Card key={card._id} card={card} onCardClick={onCardClick} />
        ))}
        </ul>
      </section>
    </main>
  )
}

export default Main