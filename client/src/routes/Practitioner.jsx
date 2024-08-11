import React, {useContext} from "react";
import { PractitionerCard } from "../components/PractitionerCard"
import { PractitionerContext } from "../contexts";
import banner from "../assets/icons/PractitionerBackground.png"
import paleBanner from "../assets/icons/PaleGreenPractitionerBackground.png"

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
    email = {person.email}
    website = {person.website}
    />
)



    return (
        <>


<div className="2FindAPractitioner w-full h-44 relative bg-white" style={{
    backgroundImage: `url(${banner}), url(${paleBanner})`,
    backgroundSize: 'contain, contain',
    backgroundPosition: 'top, top',
    backgroundRepeat: 'no-repeat, no-repeat',

  }}>

  <div className="FindACertifiedPractitioner left-[10.75rem] top-[3rem] absolute text-center text-white text-3xl font-normal font-['Fenix']">Find a Certified Practitioner</div>
    </div>
  <div className="CertPractitionerCardsContainer flex flex-wrap justify-start gap-4 border">
        {practitionerList}
        </div> 
  <div className="RefineResults left-[240px] top-[478px] absolute text-center text-black text-4xl font-normal font-['Fira Sans']">Refine Results</div>
  <div className="SearchBar w-96 px-4 py-2 left-[663px] top-[542px] absolute rounded-full border border-[#808080] justify-between items-center inline-flex">
    <div className="Name text-center text-black/50 text-xl font-normal font-['Fira Sans']">Specialty ...</div>
    <div className="UilSearch w-8 h-8 relative" />
  </div>
  <div className="SearchBar w-96 px-4 py-2 left-[1086px] top-[542px] absolute rounded-full border border-[#808080] justify-between items-center inline-flex">
    <div className="Name text-center text-black/50 text-xl font-normal font-['Fira Sans']">Zip Code, City or State ...</div>
    <div className="UilSearch w-8 h-8 relative" />
  </div>
  
  <div className="Results2 left-[819px] top-[617px] absolute text-center text-xl font-medium font-['Inter']">Results: 2</div>
  <div className="SearchBar w-96 px-4 py-2 left-[238px] top-[542px] absolute rounded-full border border-[#808080] justify-between items-center inline-flex">
    <div className="Name text-center text-black/50 text-xl font-normal font-['Fira Sans']">Name ...</div>
    <div className="UilSearch w-8 h-8 relative" />
  </div>
{/* </div> */}
        </>
    )
}