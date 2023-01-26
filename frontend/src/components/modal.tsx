interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({isOpen, onClose, children}) => {
  return (
    <>
      {isOpen && (
        <div className={`modal-overlay ${isOpen ? 'is-open' : ''}`}>
          {children}
          <button className="modal-close" onClick={onClose}></button>
        </div>
      )}
    </>
  );
};
