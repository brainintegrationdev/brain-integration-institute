// import { AccordionComponent } from '../components/AccordionComponent';
import  AccordionCard  from '../components/AccordionCard'
import GreenBannerCertPage from '../assets/icons/GreenBannerCertPage.png';
import ProgressRing from '../assets/icons/Progress Ring.png';

export const Certification = () => {
    return (
        <>
            <div className="relative">
                <img className="w-1728 h-281 shrink-0" src={GreenBannerCertPage} />
                <div className="absolute right-50 left-5 bottom-40">
                    <h1 className="font-fenix 48px text-white text-5xl pl-12.5 pt-2.5">
                        Integration Certification
                    </h1>
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
