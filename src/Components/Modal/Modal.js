import './modal.scss';
import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import Portal from '../Portal/Portal';
import 'wicg-inert';

const Modal = ({ open, onClose, children }) => {
  const [active, setActive] = React.useState(false);
  const backdrop = useRef(null);

  useEffect(() => {
    const { current } = backdrop;
    const clickHandler = (e) => e.target === current && onClose();
    const transitionEnd = () => setActive(open);

    if (current) {
      current.addEventListener('click', clickHandler);
      current.addEventListener('transitionend', transitionEnd);
    }

    if (open) {
      window.setTimeout(() => {
        document.activeElement.blur();
        setActive(open);
        document.querySelector('#root').setAttribute('inert', 'true');
      }, 10);
    }
    return () => {
      if (current) {
        current.removeEventListener('transitionend', transitionEnd);
        current.removeEventListener('click', clickHandler);
      }
      document.querySelector('#root').removeAttribute('inert');
    };
  }, [open, onClose]);

  return (
    <>
      {(open || active) && (
        <Portal>
          <div className="modal">
            <div
              ref={backdrop}
              className={`modal__backdrop ${open && active ? 'active' : ''}`}
            >
              <div className="modal__body">
                <FontAwesomeIcon
                  className="modal__body__close mr-30"
                  color="#dddfe4"
                  onClick={onClose}
                  icon={faWindowClose}
                />
                {children}
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Modal;
