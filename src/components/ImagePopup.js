import React from "react"

function ImagePopup(name, isOpen, onClose) {
    return(
        <div className="popup" id="popup_img">
        <div className="popup__container popup__container-img">
          <button type="button" onClick={onClose} className="popup__close popup__close_img"></button>
          <img className="popup__full-img" src="#" alt="#"/>
          <h2 className="popup__name">
          </h2>
        </div>
      </div>
    )
}

export default ImagePopup;