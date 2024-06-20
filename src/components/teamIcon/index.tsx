


import { TeamProps } from "@/utils/team.type";
import Image from "next/image";
import styles from './styles.module.css'

export default function TeamIcon({ team } : { team: TeamProps }){
    return(
        <div className={styles.team}>
            <div className={styles.teamImageWrapper}>
                <Image 
                    fill={true}
                    sizes='(max-width: 480px) 100vw, (max-width: 1024px) 75vw, 50vw'
                    quality={100}
                    priority={true}
                    src={team.WikipediaLogoUrl}
                    alt={`Imagem de ${team.Name}`}
                    className={styles.teamImage}
                    title={team.Name}
                />
            </div>
        </div>
    )
}