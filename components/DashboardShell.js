import Head from 'next/head';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import Image from 'next/image';
import Divider from '@mui/material/Divider';

import { useAuth } from '@/lib/auth';
import styles from '@/styles/DashboardShell.module.css';
import AccountMenu from './AccountMenu';
import { Avatar } from '@mui/material';

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
    <div className={styles.container}>
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
              className={styles.divider}
            />
            <div className={styles.account}>
              {user && (
                <span className={styles.username}>
                  {`${user.name}`.split(' ')[0]}
                </span>
              )}
              {user ? (
                <AccountMenu alt={user.name} src={user.photoUrl} />
              ) : (
                <Avatar />
              )}
            </div>
          </div>
        </nav>
      </header>
      <main id="skip" className={styles.main}>
        <section className={styles.cta}>
          <h2 className={styles.heading}>Job Tracking</h2>
          {/* TODO: add button modal with how to use instructions */}
          <button className={styles.btn}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 19a9 9 0 100-18 9 9 0 000 18zm1.3-13a1.2 1.2 0 11-2.5 0 1.2 1.2 0 012.5 0zm-.3 9V9H9v6h2z"
              ></path>
            </svg>
            <span className={styles.span}>How to use?</span>
          </button>
        </section>
        <section className={styles.wrapper}>
          <div className={styles.columns}>
            <div className={styles.flex}>{children}</div>
          </div>
        </section>
      </main>
    </div>
  );
}
