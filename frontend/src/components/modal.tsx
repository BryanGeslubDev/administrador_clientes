import styles from './modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({isOpen, onClose, children}) => {
  return (
    <>
      {isOpen && (
        <div
          className={`${styles['modal-overlay']} ${
            isOpen ? styles['is-open'] : ''
          }`}>
          {children}
          <button className={styles['modal-close']} onClick={onClose}></button>
        </div>
      )}
    </>
  );
};
