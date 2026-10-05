"use client"

import { ReactNode } from "react";
import Queryprividers from "./Queryproviders";

export default function Prividers ({children}:{children:ReactNode}){
    return(
        <Queryprividers>
            {children}
        </Queryprividers>
    )
}