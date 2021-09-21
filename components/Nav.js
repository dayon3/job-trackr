import Image from 'next/image';

export const Nav = () => {
  return (
    <nav className={styles.nav}>
      <Image src="/logo.svg" alt="Job trackr logo" width={100} height={100} />
      <ul className={styles.list}>
        <li>Dashboard</li>
        <span>|</span>
        <li>Username</li>
      </ul>
    </nav>
  );
};
