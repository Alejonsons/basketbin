

export async function getTeams(){
    try{
        const url = `${process.env.API_BASE_URL}/scores/json/AllTeams?key=${process.env.API_NBA_KEY}`;
        const res = await fetch(url, {
            next: {
                revalidate: 86400
            }
        });

        return res.json();
    }catch(error){
        throw new Error('Error while fetching data');
    }
}

export async function getPlayersByTeam(id: number){
    try{
        const url = `${process.env.API_BASE_URL}/scores/json/Players/${id}`
        const res = await fetch(url, {
            next: {
                revalidate: 86400
            }
        });

        return res.json();
    }catch(error){
        throw new Error('Error while fetching data');
    }
}

export async function getPlayers(){
    try{
        const url = `${process.env.API_BASE_URL}/scores/json/PlayersActiveBasic?key=${process.env.API_NBA_KEY}`;
        const res = await fetch(url, {
            next: {
                revalidate: 86400
            }
        });

        return res.json();
    }catch(error){
        throw new Error('Error while fetching data');
    }
}

export async function getPlayerById(id: number){
    try{
        const url = `${process.env.API_BASE_URL}/scores/json/Player/${id}?key=${process.env.API_NBA_KEY}`;
        const res = await fetch(url, {
            next: {
                revalidate: 86400
            }
        });

        return res.json();
    }catch(error){
        throw new Error('Error while fetching data');
    }
}