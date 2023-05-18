import Header from "./Header.js"
import Main from "./Main.js"
import Footer from "./Footer.js"
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import { useEffect, useState } from "react"
import api from "../utils/Api.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isPopupImg, setisPopupImg] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [profileUserInfo, setProfileUserInfo] = useState({});

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
    setisPopupImg(true)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setisPopupImg(false)
    setSelectedCard({});
  }

  return (
    <div className="root">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick} />
      <Footer />
      <PopupWithForm isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} name={"edit"} title={"Редактировать профиль"} buttonText={"Сохранить"}>
        <div className="popup__form-group">
          <input  placeholder="Имя" type="text" name="user-name" className="popup__input popup__input_type_name" required minLength="2"
            maxLength="40" />
          <span className="popup__input-error" id="user-name-error">Вы пропустили это поле</span>
        </div>
        <div className="popup__form-group">
          <input placeholder="Занятие" type="text" name="user-prof" className="popup__input popup__input_type_prof" required minLength="2"
            maxLength="200" />
          <span className="popup__input-error" id="user-prof-error">Вы пропустили это поле</span>
        </div>
      </PopupWithForm>

      <PopupWithForm isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} name={"add"} title={"Новое место"} buttonText={"Создать"}>
        <div className="popup__form-group">
          <input required minLength="2" maxLength="30" type="text" id="text" placeholder="Название" name="title"
            className="popup__input popup__input_type_name" />
          <span className="popup__input-error" id="title-error">Вы пропустили это поле</span>
        </div>
        <div className="popup__form-group">
          <input required type="url" id="link" placeholder="Ссылка на картинку" name="src"
            className="popup__input popup__input_type_prof" />
          <span className="popup__input-error" id="src-error">Введите адрес сайта</span>
        </div>
      </PopupWithForm>

      <PopupWithForm isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} name={"editAvatar"} title={"Обновить аватар"} buttonText={"Сохранить"}>
        <div className="popup__form-group">
          <input required type="url" placeholder="Ссылка на аватар" name="link"
            className="popup__input popup__input_type_avatar" />
          <span className="popup__input-error" id="link-error">Введите адрес сайта</span>
        </div>
      </PopupWithForm>

      <PopupWithForm
        name="cards__trash"
        title={"Вы уверены?"}
        buttonText="Да"
        onClose={closeAllPopups}
      >
      </PopupWithForm>

      <ImagePopup
        isOpen={isPopupImg}
        card={selectedCard}
        onClose={closeAllPopups}
      >
      </ImagePopup>
    </div>
  )
}

export default App;
