import React, { useContext, useState, useEffect } from "react";
import { PractitionerCard } from "../components/PractitionerCard";
import { PractitionerContext } from "../contexts";
import banner from "../assets/icons/PractitionerBackground.png";
import paleBanner from "../assets/icons/PaleGreenPractitionerBackground.png";

export const Practitioner = () => {

  const { practitioners } = useContext(PractitionerContext);

  const [searchQuery, setSearchQuery] = useState({
    name: "",
    title: "",
    location: "",
  })

  const [renderedPractitioners, setRenderedPractitioners] = useState([])

  const searchHandler = (event) => {
    const { name, value } = event.target;
    setSearchQuery((prevQuery) => ({
      ...prevQuery,
      [name]: value.toLowerCase(),
    }));
  };

  useEffect(() => {
    const { name, title, location } = searchQuery;

    const displayedPractitioners = practitioners.filter((practitioner) => {
      const firstName = practitioner.name.firstName.toLowerCase();
      const lastName = practitioner.name.lastName.toLowerCase();
      const practitionerTitle = practitioner.title.toLowerCase();
      const practitionerLocation = practitioner.location.toLowerCase();

      return (
        (name === "" ||
          firstName.includes(name) ||
          lastName.includes(name)) &&
        (title === "" || practitionerTitle.includes(title)) &&
        (location === "" || practitionerLocation.includes(location))
      );
    });

    setRenderedPractitioners(displayedPractitioners);
  }, [practitioners, searchQuery]);


  const practitionerList = renderedPractitioners.map((person) => (
    <PractitionerCard
   
      firstName={person.name.firstName}
      lastName={person.name.lastName}
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
        <div className="FindACertifiedPractitioner left-[10%] top-[15%] absolute text-center text-white text-5xl font-normal font-['Fenix']">
          Find a Certified Practitioner
        </div>
      </div>
      <div className="w-[75%] flex flex-col relative mx-auto">
        <div className="RefineResults py-2 relative text-start text-black text-4xl font-normal font-['Fira Sans']">Refine Results</div>

<div className = "flex justify-between py-2">


        <input className="SearchBar w-96 px-4 py-2 l relative rounded-full border border-[#808080] justify-between items-center inline-flex text-black/50 text-xl font-normal font-['Fira Sans']" name = "title" onChange = {searchHandler} placeholder = "Specialty..." />


        <input className="SearchBar w-96 px-4 py-2 l relative rounded-full border border-[#808080] justify-between items-center inline-flex text-black/50 text-xl font-normal font-['Fira Sans']" name = "name" onChange = {searchHandler} placeholder = "Name..." />

        <input className="SearchBar w-96 px-4 py-2 l relative rounded-full border border-[#808080] justify-between items-center inline-flex text-black/50 text-xl font-normal font-['Fira Sans']" name = "location" onChange = {searchHandler} placeholder = "Zip Code, City or State..." />

</div>
       {(searchQuery.name !== "" || searchQuery.title !== "" || searchQuery.location !== "") && <div className="Results2 relative text-center text-xl py-2 font-medium font-['Inter']">Results : {renderedPractitioners.length}</div>}
      </div>
      <div className="CertPractitionerCardsContainer py-2 w-[75%] mx-auto relative flex flex-wrap justify-between gap-4">
        {practitionerList}
      </div>
    </>
  );
};
