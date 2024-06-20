

"use client"

import { useSession, signIn, signOut } from "next-auth/react";
import styles from './styles.module.css';

export function LoginButton(){
    const { data: session, status } = useSession();

    return(
        <div>
            {status === "loading" ? (
                        <></>
                    ) : session ? (
                        <button 
                        className={styles.loginButton}
                        onClick={()=>signOut()}
                        >
                            <img 
                            className={styles.userImg}
                            src={session?.user?.image || ''}
                            />
                            {session?.user?.name}
                        </button>
                    ) : (
                        <button 
                        className={styles.loginButton}
                        onClick={()=>signIn("google")}
                        >
                            Acessar sua conta
                        </button>
                    )}
        </div>
    )
}