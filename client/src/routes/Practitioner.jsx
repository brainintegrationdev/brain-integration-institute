import React, { useContext } from "react";
import { PractitionerCard } from "../components/PractitionerCard";
import { PractitionerContext } from "../contexts";
import banner from "../assets/icons/PractitionerBackground.png";
import paleBanner from "../assets/icons/PaleGreenPractitionerBackground.png";

export const Practitioner = () => {
  const { practitioners } = useContext(PractitionerContext);

  const practitionerList = practitioners.map((person) => (
    <PractitionerCard
      firstName={person.firstName}
      lastName={person.lastName}
      title={person.title}
      location={person.location}
      imgURL={person.imgURL}
      phone={person.phone}
      email={person.email}
      website={person.website}
    />
  ));

  return (
    <>
      <div
        className="2FindAPractitioner w-full h-96 relative bg-white"
        style={{
          backgroundImage: `url(${banner}), url(${paleBanner})`,
          backgroundSize: "contain, contain",
          backgroundPosition: "top, top",
          backgroundRepeat: "no-repeat, no-repeat",
        }}
      >
        <div className="FindACertifiedPractitioner left-[10.75rem] top-[3rem] absolute text-center text-white text-3xl font-normal font-['Fenix']">
          Find a Certified Practitioner
        </div>
      </div>
      <div className="border relative">
        <div className="RefineResults left-[240px] top-[0px] relative text-center text-black text-4xl font-normal font-['Fira Sans']">Refine Results</div>

        <div className="SearchBar w-96 px-4 py-2 left-[0px] top-[0px] relative rounded-full border border-[#808080] justify-between items-center inline-flex">
          <div className="Name text-center text-black/50 text-xl font-normal font-['Fira Sans']">Specialty ...</div>
          <div className="UilSearch w-8 h-8 relative" />
        </div>

        <div className="SearchBar w-96 px-4 py-2 left-[238px] top-[0px] relative rounded-full border border-[#808080] justify-between items-center inline-flex">
          <div className="Name text-center text-black/50 text-xl font-normal font-['Fira Sans']">Name ...</div>
          <div className="UilSearch w-8 h-8 relative" />
        </div>

        <div className="SearchBar w-96 px-4 py-2 left-[450px] top-[0px] relative rounded-full border border-[#808080] justify-between items-center inline-flex">
          <div className="Name text-center text-black/50 text-xl font-normal font-['Fira Sans']">Zip Code, City or State ...</div>
          <div className="UilSearch w-8 h-8 relative" />
        </div>

        <div className="Results2 left-[819px] top-[0px] relative text-center text-xl font-medium font-['Inter']">Results: 2</div>
      </div>
      <div className="CertPractitionerCardsContainer relative flex flex-wrap justify-start gap-4">
        {practitionerList}
      </div>
    </>
  );
};
