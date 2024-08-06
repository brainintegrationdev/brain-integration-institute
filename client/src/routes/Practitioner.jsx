import React, {useContext} from "react";
import { PractitionerCard } from "../components/PractitionerCard"
import { PractitionerContext } from "../contexts";


export const Practitioner = () => {

const {practitioners} = useContext(PractitionerContext)

const practitionerList = practitioners.map(person => 
    <PractitionerCard 
    firstName = {person.firstName}
    lastName = {person.lastName}
    title = {person.title}
    location = {person.location}
    imgURL = {person.imgURL}
    phone = {person.phone}
    />
)



    return (
        <>
        <h1>Find Practitioner</h1>
        <div style = {{display:"inline-block"}}>
        {practitionerList}
        </div>
        </>
    )
}