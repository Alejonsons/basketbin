

import Image from 'next/image';
import styles from './styles.module.css';
import Link from 'next/link';
import { LoginButton } from '../loginButton';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
export async function Header(){
    const session : any = await getServerSession(authOptions);

    return(
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <div className={styles.logoWrapper}> 
                    <Link href="/">
                        <Image
                            src="/logo.png"
                            width={70}
                            height={70}
                            alt='Logo NBA'
                            priority={true}
                            quality={100}
                        />
                    </Link>
                    {/* <p>Basketbin</p> */}
                </div>
                <div className={styles.linksWrapper}>
                    <Link className={styles.link} href="/">
                        Home
                    </Link>
                    <Link className={styles.link} href="/teams">
                        Times
                    </Link>
                    {session && (
                        <Link className={styles.link} href="/myteam">
                            Meu Time
                        </Link>
                    )}
                    <span className={styles.linksDivision}>|</span>

                    <LoginButton />
                </div>
            </div>
        </header>
    )
}