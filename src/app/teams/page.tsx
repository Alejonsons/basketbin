

import { getTeams } from '@/utils/actions/get-data';
import styles from './styles.module.css';
import { TeamProps } from '@/utils/team.type';
import Image from 'next/image';
import Link from 'next/link';
import TeamIcon from '@/components/teamIcon';

export default async function Teams(){
    const teams : TeamProps[] = await getTeams();

    teams.sort((a, b) => {
        const nameA = a.Name.toUpperCase(); // Transforma em maiúsculas para ordenação sem distinção entre maiúsculas e minúsculas
        const nameB = b.Name.toUpperCase();
      
        if (nameA < nameB) {
          return -1; // a vem antes de b
        }
        if (nameA > nameB) {
          return 1; // b vem antes de a
        }
        return 0; // nomes são iguais
    });

    return(
        <div className={styles.teamsWrapper}>
            <ul className={styles.teamsList}>
                {teams.map((team) => (
                    team.WikipediaLogoUrl && (
                        <Link key={team.TeamID} href={`teams/${team.TeamID}`}>
                            <li>
                                <TeamIcon team={team}/>
                            </li>
                        </Link>
                    )
                ))}
            </ul>
        </div>
    )
}