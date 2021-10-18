import { useRouter } from 'next/router';
import Image from 'next/image';
import NextLink from 'next/link';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';

import { useAuth } from '@/lib/auth';
import AccountMenu from './AccountMenu';
import styles from '@/styles/Nav.module.css';

const Nav = () => {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <nav className={styles.nav}>
      <a href="#skip" className={styles.skipNav}>
        Skip to content
      </a>
      <Image
        src="/logo with no text.svg"
        width={30}
        height={30}
        alt="Job trackr logo"
      />
      <div className={styles.links}>
        <NextLink href="/">
          <a className={styles.link}>Home</a>
        </NextLink>
        <NextLink href="/job-tracking">
          <a
            className={`${styles.link} ${
              router.pathname == '/job-tracking' ? 'active' : ''
            }`}
          >
            Job Tracking
          </a>
        </NextLink>
        <Divider
          orientation="vertical"
          flexItem={true}
          variant="middle"
          className={styles.divider}
        />
        <div className={styles.account}>
          {user?.name && (
            <span className={styles.username}>
              {`${user.name}`.split(' ')[0]}
            </span>
          )}
          {user ? (
            <AccountMenu alt={user?.name} src={user?.photoUrl} />
          ) : (
            <Avatar />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
