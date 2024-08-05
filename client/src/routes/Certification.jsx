import { AccordionComponent } from '../components/AccordionComponent';
import GreenBannerCertPage from '../assets/icons/GreenBannerCertPage.png';
// import BrainIntegrationSeal from '../assets/icons/BrainIntegrationSeal.png';
// import { Navbar } from '../components/Navbar';
import ProgressRing from '../assets/icons/Progress Ring.png';

export const Certification = () => {
    return (
        <>
            <div className="banner-parent">
                <img className="green-banner" src={GreenBannerCertPage} />
                <div className="text-on-banner">
                    <h1 className="accordion-header">
                        Integration Certification
                    </h1>
                </div>
            </div>
            <div className="cert-flex">
                <img className="progress-ring" src={ProgressRing} />
                <div className="text-accordion-flex">
                    <p className='cert-text'>
                        Follow these steps to submit your documentation for
                        certification review. You may complete them in any
                        order, except for the assessment, which can only be
                        accessed once the preceding items are completed. If you
                        have any questions about the process, please contact us,
                        and a member of our board will be happy to assist you.
                    </p>
                    <AccordionComponent />
                </div>
            </div>
            
        </>
    );
};
