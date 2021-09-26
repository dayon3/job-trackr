import Head from 'next/head';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import Image from 'next/image';
import Divider from '@mui/material/Divider';

import { useAuth } from '@/lib/auth';
import styles from '@/styles/DashboardShell.module.css';
import AccountMenu from './AccountMenu';

export default function DashboardShell(props) {
  const { children, ...customMeta } = props;
  const { user } = useAuth();
  const router = useRouter();
  const meta = {
    title: 'Job Trackr – Dashboard.',
    description: `Easiest way to organize and keep track of your job
    application process.`,
    image: 'https://job-trackr.vercel.app/static/images/banner.png',
    type: 'website',
    ...customMeta
  };

  return (
    <div className="antialiased bg-white">
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta
          property="og:url"
          content={`https://job-trackr.vercel.app${router.asPath}`}
        />
        <link
          rel="canonical"
          href={`https://job-trackr.vercel.app${router.asPath}`}
        />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Davis Gitonga" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@jobtrackr" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
      </Head>
      <header className={styles.header}>
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
              <a className={styles.link}>Dashboard</a>
            </NextLink>
            <Divider
              orientation="vertical"
              flexItem={true}
              variant="middle"
              mr="1rem"
            />
            <div className={styles.account}>
              <a className={styles.link}>{`${user.name}`.split(' ')[0]}</a>
              <AccountMenu alt={user.name} src={user.photoUrl} />
            </div>
          </div>
        </nav>
      </header>
      <main id="skip" className={styles.main}>
        {children}
      </main>
    </div>
  );
}
