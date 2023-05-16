import Header from "./Header.js"
import Main from "./Main.js"
import Footer from "./Footer.js"
import { useState } from "react"
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

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
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard({});
  }

  return (
    <div className="page">
      <Header />
      <Main 
      onEditProfile={handleEditProfileClick} 
      onAddPlace={handleAddPlaceClick}
      onEditAvatar={handleEditAvatarClick}
      onCardClick={handleCardClick}/>
      <Footer />
      <PopupWithForm isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} name={"edit"} title={"Редактировать профиль"}>
        <div className="popup__form-group">
          <input type="text" name="user-name" className="popup__input popup__input_type_name" required minlength="2"
            maxlength="40" />
          <span className="popup__input-error" id="user-name-error">Вы пропустили это поле</span>
        </div>
        <div className="popup__form-group">
          <input type="text" name="user-prof" className="popup__input popup__input_type_prof" required minlength="2"
            maxlength="200" />
          <span className="popup__input-error" id="user-prof-error">Вы пропустили это поле</span>
        </div>
        <button type="submit" className="popup__save-button">Сохранить</button>
      </PopupWithForm>

      <PopupWithForm isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} name={"add"} title={"Новое место"}>
        <div className="popup__form-group">
          <input required minlength="2" maxlength="30" type="text" id="text" placeholder="Название" name="title"
            className="popup__input popup__input_type_name" />
          <span className="popup__input-error" id="title-error">Вы пропустили это поле</span>
        </div>
        <div className="popup__form-group">
          <input required type="url" id="link" placeholder="Ссылка на картинку" name="src"
            className="popup__input popup__input_type_prof" />
          <span className="popup__input-error" id="src-error">Введите адрес сайта</span>
        </div>
        <button type="submit" className="popup__save-button popup__save-button_disabled" disabled>Создать</button>
      </PopupWithForm>

      <PopupWithForm isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} name={"editAvatar"} title={"Обновить аватар"}>
        <div className="popup__form-group">
          <input required type="url" placeholder="Ссылка на аватар" name="link"
            className="popup__input popup__input_type_avatar" />
          <span className="popup__input-error" id="link-error">Введите адрес сайта</span>
        </div>
        <button type="submit" className="popup__save-button popup__save-button_disabled" disabled>Сохранить</button>
      </PopupWithForm>

      <PopupWithForm
        name="cards__trash"
        title={"Вы уверены?"}
        buttonText="Да"
        onClose={closeAllPopups}
      >
      </PopupWithForm>

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      >
      </ImagePopup>
    </div>
  )
}

export default App;
