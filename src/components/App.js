import Header from "./Header.js"
import Main from "./Main.js"
import Footer from "./Footer.js"
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import { useEffect, useState } from "react"
import api from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isPopupImg, setisPopupImg] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [profileUserInfo, setProfileUserInfo] = useState({});
  const [currentUser, setCurrentUser] = useState({});

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

  function handleUpdateAvatar(avatar) {
    api
      .setUserAvatar(avatar)
      .then((profileUserInfo) => {
        setCurrentUser(profileUserInfo)
        console.log(profileUserInfo)
      })
      .catch((error) => console.log(error))
      .finally(() => closeAllPopups())
  }

  function handleUpdateUser(newUser) {
    api
      .updateUserInfo(newUser)
      .then((profileUserInfo) => {
        setCurrentUser(profileUserInfo)
        console.log(profileUserInfo)
      })
      .catch((error) => console.log(error))
      .finally(() => closeAllPopups())
  }

  useEffect(() => {
    api
      .getUser()
      .then((profileUserInfo) => {
        setCurrentUser(profileUserInfo)
        console.log(profileUserInfo)
      })
      .catch((error) => console.log(error));
  }, []);

  const [cards, setCards] = useState([]);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      // Обновляем стейт
      setCards(newCards);
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then((newCard) => {
      // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
      const newCards = cards.filter((c) => c._id !== card._id);
      // Обновляем стейт
      setCards(newCards);
    });
  }

  function handleAddPlaceSubmit(name, link) {
    api.addCard(name, link).then((newCard) => {

      setCards([...cards, newCard]);;
    })
    .catch((error) => console.log(error))
    .finally(() => closeAllPopups());
  }

  useEffect(() => {
    api
      .getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((error) => console.log(error));
  }, []);




  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete} />
        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

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
    </CurrentUserContext.Provider>
  )
}

export default App;
