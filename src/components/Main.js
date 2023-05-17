import { useEffect, useState } from "react"
import api from "../utils/Api.js";
import Card from "./Card.js";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [profileUserInfo, setProfileUserInfo] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getUser()
      .then((profileUserInfo) => {
        setProfileUserInfo(profileUserInfo)
        console.log(profileUserInfo)
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
          <img className="profile__avatar" src={profileUserInfo.avatar} alt="аватарка пользователя" />
          <div className="profile__button-wrapper">
            <button type="button" className="profile__avatar-button" onClick={onEditAvatar}></button>
          </div>
        </div>
        <div className="profile__info">
          <div className="profile__edit">
            <h1 className="profile__edit-name">{profileUserInfo.name}</h1>
            <button type="button" className="profile__edit-profile" onClick={onEditProfile} aria-label="Редактировать профиль"></button>
          </div>
          <p className="profile__edit-prof">{profileUserInfo.about}</p>
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