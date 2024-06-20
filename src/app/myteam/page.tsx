


import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { PlayerProps } from '@/utils/player.type';
import { getPlayers, getTeams } from '@/utils/actions/get-data';
import { TeamProps } from '@/utils/team.type';
import MyTeamSelection from '@/components/MyTeamSelection';

export default async function MyTeam(){
    const session = await getServerSession(authOptions);
    const playersImagesId = [];

    if(!session){
        redirect('/');
    }

    const teams : TeamProps[] = await getTeams();
    let players : PlayerProps[] = await getPlayers();
    
    return(
        <>
            <MyTeamSelection players={players} teams={teams}/>
        </>
    )
}