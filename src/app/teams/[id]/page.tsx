import { getTeams } from "@/utils/actions/get-data";
import { TeamProps } from "@/utils/team.type";

export default async function Team({
    params: { id }
} : {
    params: { id: string }
}){
    const teams : TeamProps[] = await getTeams();
    const team : TeamProps = teams.filter(i => i.TeamID == Number(id))[0];
    console.log(team);

    return(
        <div>
            <h1 style={{color: "#fff"}}>{team.City + ' ' + team.Name}</h1>
        </div>
    )
}