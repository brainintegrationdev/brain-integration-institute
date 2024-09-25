// import { AccordionComponent } from '../components/AccordionComponent';
import  AccordionCard  from '../components/AccordionCard'
// import GreenBannerCertPage from '../assets/icons/GreenBannerCertPage.png';
import banner from "../assets/icons/PractitionerBackground.png";
import paleBanner from "../assets/icons/PaleGreenPractitionerBackground.png";



export const Certification = () => {
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
        <div className=" left-[10%] top-[15%] pl-[180px] absolute text-center text-white text-5xl font-normal font-['Fenix']">
          Integration Certification
        </div>
      </div>
            <div className="flex pl-5 pt-1 pr-30">
                {/* <img className="h-48 w-48" src={ProgressRing} /> */}
                <div className="flex flex-col pt-5 pl-5 mb-7">
                 
                    <AccordionCard />
                </div>
            </div>
            
        </>
    );
};
