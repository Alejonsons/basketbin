

"use client"

import Image from 'next/image';
import styles from './styles.module.css';
import { PlayerProps } from "@/utils/player.type";
import { getTeams } from '@/utils/actions/get-data';
import { TeamProps } from '@/utils/team.type';


export function PlayerCard({ 
    player, teams, selectedTeam, clickFunction
} : { 
    player: PlayerProps, 
    teams: TeamProps[], 
    selectedTeam: TeamProps,
    clickFunction: Function
}){

    const teamImage = teams.filter(i => i.TeamID == player.TeamID)[0].WikipediaLogoUrl;
    const playerImage = player.Image == null ? '/not_found_player.png' : player.Image;

    return(
        <div className={styles.playerCard} onClick={() => clickFunction()}>
            <div className={styles.playerImageWrapper}>
                <Image 
                    className={styles.playerImage}
                    src={`${playerImage}`}
                    priority={true}
                    quality={100}
                    alt='Imagem do jogador'
                    fill={true}
                    sizes='(max-width: 480px) 100vw, (max-width: 1024px) 75vw, 50vw'
                />
            </div>
            <div className={styles.cardInfos}>
                <p className={styles.playerName}>{player.FirstName + ' ' + player.LastName}</p>
                <Image 
                    className={styles.teamImage}
                    src={`${teamImage}`}
                    priority={true}
                    quality={100}
                    alt='Imagem do time do jogador'
                    width={100}
                    height={100}
                />
            </div>
        </div>
    )
}