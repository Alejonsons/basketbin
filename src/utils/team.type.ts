

export interface TeamProps{
    TeamID: number,
    Key: string,
    Active: boolean,
    City: string,
    Name: string,
    LeagueID: number,
    StadiumID: number,
    Conferencer: string,
    Division: string,
    PrimaryColor: string,
    SecondaryColor: string,
    TertiaryColor: string,
    QuaternaryColor?: string,
    WikipediaLogoUrl?: string,
    WikipediaWordMarkUrl?: string,
    GlobalTeamID: number,
    NbaDotComTeamID: number,
    HeadCoach: string
}