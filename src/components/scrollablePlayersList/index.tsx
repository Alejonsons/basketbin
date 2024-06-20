

"use client"

import { DetailedHTMLProps, HTMLAttributes, ReactNode, useRef, useState } from "react"
import styles from './styles.module.css'
import { PlayerProps } from "@/utils/player.type";
import { PlayerCard } from "../playerCard";
import { TeamProps } from "@/utils/team.type";

export default function ScrollablePlayersList({children} : {players: PlayerProps[], teams: TeamProps[], selectedTeam: TeamProps, children : ReactNode}){
    const itemsRef = useRef<any>(null);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [startX, setStartX] = useState<number>(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e : any) =>{
        setIsMouseDown(true);
        setStartX(e.pageX - - itemsRef.current.offsetLeft || 0);
        setScrollLeft(itemsRef.current.scrollLeft);
    }
    const handleMouseLeave = (e : any) =>{
        setIsMouseDown(false);
    }
    const handleMouseUp = (e : any) =>{
        setIsMouseDown(false);
    }
    const handleMouseMove = (e : any) =>{
        if(!isMouseDown) return;

        e.preventDefault();
        const x = e.pageX - itemsRef.current.offsetLeft;
        const walk = (x-startX)*2;
        itemsRef.current.scrollLeft = scrollLeft - walk;
    }

    return(
        <ul 
            ref={itemsRef}
            className={styles.scrollablePlayersList}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
        >
            {children}
        </ul>
    )    
}