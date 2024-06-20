


"use client"

import { PlayerProps } from "@/utils/player.type"
import { TeamProps } from "@/utils/team.type"
import ScrollablePlayersList from "../scrollablePlayersList";
import { PlayerCard } from "../playerCard";
import styles from './styles.module.css'
import PositionIcon from "../positionIcon";
import { useEffect, useState } from "react";
import TeamIcon from "../teamIcon";
import { escape } from "querystring";
import { FaTimes } from "react-icons/fa";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from "react-dnd-html5-backend";

interface PositionProps{
    position: number,
    isSelected: boolean,
    player: PlayerProps | null,
    top: string,
    right: string
}

const ItemTypes = {
    PLAYER: 'player',
};

export default function MyTeamSelection({ teams, players } : { teams: TeamProps[], players: PlayerProps[] }){
    let startSelectedTeam = teams[0];

    if(localStorage.getItem('storageSelectedTeamId')){
        const storageSelectedTeamId : number = Number(localStorage.getItem('storageSelectedTeamId'));
        startSelectedTeam = teams.find(i => i.TeamID == storageSelectedTeamId) || teams[0];
    }

    const [teamListOpen, setTeamListOpen] = useState(false);
    const [positionSelected, setPositionSelected] = useState(0);
    const [selectedTeam, setSelectedTeam] = useState(startSelectedTeam);
    const [positions, setPositions] = useState<PositionProps[]>([
        {
            //top
            position: 1,
            isSelected: false,
            player: null,
            top: '5',
            right: '45'
        },
        {
            // top left
            position: 2,
            isSelected: false,
            player: null,
            top: '15',
            right: '75'
        },
        {
            //bottom left
            position: 3,
            isSelected: false,
            player: null,
            top: '60',
            right: '75'
        },
        {
            //top right
            position: 4,
            isSelected: false,
            player: null,
            top: '15',
            right: '15'
        },
        {
            //bottom right
            position: 5,
            isSelected: false,
            player: null,
            top: '60',
            right: '15'
        }
    ]);

    players = players.filter((i) => i.TeamID === selectedTeam.TeamID);

    const handleSelectedPosition = (position) => {
        setPositionSelected(position);
    };

    const handleSelectedPlayer = ({ player }) => {
        if (!positionSelected) return;

        const updatedPositions = positions.map(pos => 
            pos.position === positionSelected ? { ...pos, player } : pos
        );

        setPositions(updatedPositions);
    };

    const handleDropPlayer = (position, player) => {
        const updatedPositions = positions.map(pos => 
            pos.position === position ? { ...pos, player } : pos
        );
        setPositions(updatedPositions);
    };

    const handleDeselectPlayer = (position) => {
        const updatedPositions = positions.map(pos => 
            pos.position === position ? { ...pos, player: null } : pos
        );

        setPositionSelected(position);
        setPositions(updatedPositions);
    };

    const handleTeamList = () => {
        setTeamListOpen(!teamListOpen);
    };

    const handleSelectTeam = (team) => {
        setSelectedTeam(team);
        localStorage.setItem('storageSelectedTeamId', team.TeamID.toString());
        setTeamListOpen(false);
    };

    useEffect(() => {
        const handleKeyDown = (ev) => {
            if (ev.key === 'Escape' && teamListOpen) {
                setTeamListOpen(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [teamListOpen]);

    return(
        <DndProvider backend={HTML5Backend}>
            <div className={styles.myTeamWrapper}>
                {teamListOpen ? (
                    <div className={styles.teamList}>
                        <FaTimes
                            onClick={()=>setTeamListOpen(false)}
                            className={styles.closeTeamList} 
                            size={24} 
                            color="#fff"
                        />
                        {teams.map((team)=>(
                            team.WikipediaLogoUrl && (
                                <div key={team.TeamID} onClick={()=>handleSelectTeam(team)}>
                                    <TeamIcon team={team}/>
                                </div>
                            )
                        ))}
                    </div>
                ) : (
                    <div className={styles.lineUpTeam} onClick={handleTeamList}>
                        <TeamIcon team={selectedTeam}/>
                    </div>
                )}
                
                <div className={styles.lineUpWrapper}>
                    <>
                        {positions.map((position)=>(
                            position.player != null ? (
                                <div className={styles.selectedCard} style={{top: `${position.top}%`, right: `${position.right}%`}}>
                                    <PlayerCard 
                                        selectedTeam={selectedTeam} 
                                        teams={teams} 
                                        player={position.player}
                                        clickFunction={()=>handleDeselectPlayer(position.position)}
                                    />
                                </div>
                            ) : (
                                <PositionIconDroppable 
                                    position={position}
                                    onDropPlayer={(player) => handleDropPlayer(position.position, player)}
                                />
                            )
                            
                        ))}
                    </>
                </div>
                <div className={styles.playersFooter}>
                    <ScrollablePlayersList players={players} teams={teams} selectedTeam={selectedTeam}>
                        {players.map((player)=>(
                            <li key={player.PlayerID}>
                                <PlayerCardDraggable
                                    player={player}
                                    selectedTeam={selectedTeam}
                                    teams={teams}
                                    clickFunction={() => handleSelectedPlayer({ player })}
                                />
                            </li>
                        ))}
                    </ScrollablePlayersList>
                </div>
            </div>
        </DndProvider>
    )
}

function PlayerCardDraggable({ 
    player, selectedTeam, teams, clickFunction 
} : {
    player: PlayerProps,
    selectedTeam: TeamProps,
    teams: TeamProps[],
    clickFunction: Function
}) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.PLAYER,
        item: { player },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div ref={drag}>
            <PlayerCard 
                selectedTeam={selectedTeam} 
                teams={teams} 
                player={player}
                clickFunction={()=>clickFunction}
            />
        </div>
    );
}

function PositionIconDroppable({ position, onDropPlayer } : { position: PositionProps, onDropPlayer: Function }) {
    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: ItemTypes.PLAYER,
        drop: (item) => onDropPlayer(item.player),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    }));

    return (
        <div
            ref={drop}
            className={styles.dropZone}
            style={{
                top: `${position.top}%`,
                right: `${position.right}%`,
                position: 'absolute',
                scale: isOver && canDrop ? 0.9 : 1,
                transition: 'all 0.1s'
            }}
        >
            <div className={styles.positionZone}></div>
        </div>
    );
}