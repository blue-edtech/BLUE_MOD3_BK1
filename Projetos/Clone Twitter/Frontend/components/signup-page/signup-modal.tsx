import Modal from 'react-modal';
import SignupComponent from './signup-component';
import { useRouter } from 'next/router';
import styles from './singup-modal.module.css';

Modal.setAppElement('#__next');

const SignupModal: React.FC = () => {
  const router = useRouter();

  const isOpen = !!router.query.signup || router.pathname === '/signup';
  const onRequestClose = !!router.query.signup ? () => router.back() : undefined;
  return (
    <Modal
      className={styles.modal + ' absolute-center'}
      overlayClassName={styles.overlay}
      contentLabel="sign up"
      isOpen={isOpen}
      onRequestClose={onRequestClose}>
      <SignupComponent />
    </Modal>
  );
};
export default SignupModal;
