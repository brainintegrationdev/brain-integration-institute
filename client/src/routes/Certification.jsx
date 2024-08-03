import { AccordionComponent } from '../components/AccordionComponent';
import GreenBannerCertPage from '../assets/icons/GreenBannerCertPage.png';

export const Certification = () => {
    return (
        <>
            <div className="banner-parent">
                <img src={GreenBannerCertPage} />
                <div className="text-on-banner">
                    <h1 className="accordion-header">
                        Integration Certification
                    </h1>
                </div>
            </div>
            <p>
                Follow these steps to submit your documentation for
                certification review. You may complete them in any order, except
                for the assessment, which can only be accessed once the
                preceding items are completed. If you have any questions about
                the process, please contact us, and a member of our board will
                be happy to assist you.
            </p>

            <AccordionComponent />
        </>
    );
};
