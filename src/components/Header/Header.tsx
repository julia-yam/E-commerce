import { Link } from 'react-router';
import Logo from 'components/Logo';
import Text from 'components/Text';
import UserIcon from 'components/icons/UserIcon';
import BagIcon from 'components/icons/BagIcon';
import styles from './Header.module.scss';

const Header = () => (
  <header className={styles.header}>
    <nav className={styles.nav}>
      <div>
        <Logo className={styles.logo} />
      </div>
      <div className={styles.navList}>
        <Text view={'p-18'} color={'primary'}>
          <Link to="/">Products</Link>
        </Text>
        <Text view={'p-18'} color={'primary'}>
          <Link to="/product-page">Categories</Link>
        </Text>
        <Text view={'p-18'} color={'primary'}>
          <Link to="/product-page">About us</Link>
        </Text>
      </div>
      <div className={styles.navActions}>
        <Link to="/product-page">
          <BagIcon width={30} height={30} color={'primary'} />
        </Link>
        <Link to="/product-page">
          <UserIcon width={30} height={30} color={'primary'} />
        </Link>
      </div>
    </nav>
  </header>
);

export default Header;
