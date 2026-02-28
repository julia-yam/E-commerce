import { Link } from 'react-router';
import { Logo, Text, UserIcon, BagIcon } from 'components';
import styles from './Header.module.scss';
import { NAV_ITEMS, ACTION_ICONS_CONFIG } from './configs';

const Header = () => (
  <header className={styles.header}>
    <nav className={styles.nav}>
      <div>
        <Logo className={styles.logo} />
      </div>

      <div className={styles.navList}>
        {NAV_ITEMS.map((item) => (
          <Text key={item.label} view={'p-18'} color={'primary'}>
            <Link to={item.href}>{item.label}</Link>
          </Text>
        ))}
      </div>

      <div className={styles.navActions}>
        <Link to={ACTION_ICONS_CONFIG.href}>
          <BagIcon
            width={ACTION_ICONS_CONFIG.width}
            height={ACTION_ICONS_CONFIG.height}
            color={ACTION_ICONS_CONFIG.color}
          />
        </Link>
        <Link to={ACTION_ICONS_CONFIG.href}>
          <UserIcon
            width={ACTION_ICONS_CONFIG.width}
            height={ACTION_ICONS_CONFIG.height}
            color={ACTION_ICONS_CONFIG.color}
          />
        </Link>
      </div>
    </nav>
  </header>
);

export default Header;
