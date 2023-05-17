function PopupWithForm({ name, title, onClose, isOpen, children }) {
    return (
        <div className={"popup" + (isOpen ? " popup_opened" : "")}>
            <div className={"popup__container popup__container-" + name}>
                <button type="button" className={"popup__close popup__close_" + name} onClick={onClose}></button>
                <h2 className="popup__title">{title}</h2>
                <form name={"content_" + name} className={"popup__content popup__content_" + name}>
                    {children}
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm