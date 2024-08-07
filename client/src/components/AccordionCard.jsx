import AccordionDropDown from '../assets/icons/AccordionDropdown.png';
import AccordionRadioUnfilled from '../assets/icons/AccordionRadioUnfilled.png';
import UploadBtn from '../assets/icons/UploadBtn.png';
import GetStudyGuideBtn from '../assets/icons/GetStudyGuideBtn.png'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

const AccordionCard = () => {
    return (
        <div className="accordion-div">
            <Accordion allowZeroExpanded={true}>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            <div className="accordion-flexbox">
                                <img src={AccordionRadioUnfilled} />
                                <h1 className="accordion-title">
                                    Video Presentation
                                </h1>
                                <img src={AccordionDropDown} />
                            </div>
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <div className='accordion-item-flex'>
                            <h1>
                                Submit video recording of a documented Brain
                                Integration session.{' '}
                            </h1>
                            <ul>
                                Video must not exceed 30 minutes in length and
                                must include the following knowledge and skills:
                                <br></br>
                                <li> Physical demonstration of knowledge </li>
                                <li>
                                    Explaining the process of Brain Integration{' '}
                                </li>
                                <li>
                                    Express knowledge of appropriate reasoning
                                    of the procedure{' '}
                                </li>
                                <li>Demonstrate balance process</li>
                                <li>Powers of stress alleviation</li>
                                <li>
                                    Knowledge of meridian points/alarm points
                                </li>
                                <li>Pause-lock procedure</li>
                            </ul>
                            <div className="form-flex">
                                <img src={UploadBtn} />
                            </div>
                        </div>
                    </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            <div className="accordion-flexbox">
                                <img src={AccordionRadioUnfilled} />
                                <h1 className="accordion-title">
                                    Clinical Hours
                                </h1>
                                <img src={AccordionDropDown} />
                            </div>
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <div>
                            <p className="accordion-text">
                                Completion of 200 hours of clinical practice in
                                brain integration or kinesiology including
                                various populations and settings.{' '}
                            </p>
                            <ul>
                                We encourage the following:
                                <li>Practicum with the public </li>
                                <li>
                                    Practicums in a lab setting with oversight{' '}
                                </li>
                                <li>
                                    SOAP notes, or subjective, objective,
                                    assessment, and plan notes, are a
                                    standardized method used by professionals to
                                    document client interacations
                                </li>
                                <li>
                                    {' '}
                                    Experience brain integration with children,
                                    teenagers, adults, and individuals with
                                    special needs{' '}
                                </li>
                            </ul>
                        </div>
                    </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            <div className="accordion-flexbox">
                                <img src={AccordionRadioUnfilled} />
                                <h1 className="accordion-title">
                                    First Aid Certification
                                </h1>
                                <img src={AccordionDropDown} />
                            </div>
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <h1> Show proof of First Aid Certification.</h1>
                        <p>
                            Upload your current First Aid certifications. Scan
                            or photograph both sides of your certification card.
                            Save the files as PDF or JPEG. Click the “Upload”
                            button and select your files.
                        </p>
                    </AccordionItemPanel>
                </AccordionItem>

                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            <div className="accordion-flexbox">
                                <img src={AccordionRadioUnfilled} />
                                <h1 className="accordion-title">
                                    CPR Certification
                                </h1>
                                <img src={AccordionDropDown} />
                            </div>
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <div>
                            <h1>Show proof of CPR certification</h1>
                            <p>
                                Upload your current CPR certification. Scan or
                                photograph both sides of your certification
                                card. Save the files as PDF or JPEG. Click the
                                &quot; Upload&quot; button and select your
                                files.
                            </p>

                            <p>
                                Here is a suggested location to complete this
                                requirement by using your smartphone:
                                <span>
                                    {' '}
                                    <a href="https://resuscitech.io/smart-certification">
                                        https://resuscitech.io/smart-certification
                                    </a>{' '}
                                </span>
                            </p>

                            <p>
                                Once completed, copy the certificate and upload
                                the documents.
                            </p>
                        </div>
                    </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            <div className="accordion-flexbox">
                                <img src={AccordionRadioUnfilled} />
                                <h1 className="accordion-title">Insurance</h1>
                                <img src={AccordionDropDown} />
                            </div>
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <div>
                            <h1>
                                Show proof of professional and liability
                                insurance{' '}
                            </h1>
                            <p>
                                Show proof of professional and liability
                                insurance Upload proof of professional and
                                liability insurance (e.g., ABMP).
                            </p>
                            <ul>
                                Instructions:
                                <li>
                                    Scan or photograph your insurance
                                    certificate.
                                </li>
                                <li>Save the file as PDF or JPEG.</li>
                                <li>
                                    Click the &quot;Upload Insurance&quot;
                                    button below and select your file.
                                </li>
                            </ul>
                        </div>
                    </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            <div className="accordion-flexbox">
                                <img src={AccordionRadioUnfilled} />
                                <h1 className="accordion-title">Study Guide</h1>
                                <img src={AccordionDropDown} />
                            </div>
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <div className='accordion-item-flex'>
                            <h1>Areas of knowledge for the Study Guide </h1>
                            <h1>
                                Having knowledge of Structure, Function and
                                Processes.
                            </h1>

                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: '16px',
                                }}
                            >
                                <div>
                                    <ul style={{ textDecoration: 'none' }}>
                                        <li>Brain</li>
                                        <li>Triune Brain</li>
                                        <li>Higher brain</li>
                                        <li>Intermediate Brain</li>
                                        <li>Lower Brain</li>
                                        <li>Cerebral Cortex</li>
                                        <li>Lobes</li>
                                        <li>Cerebrum</li>
                                        <li>Hemispheres</li>
                                        <li>Limbic system</li>
                                        <li>Basal Ganglia</li>
                                        <li>Hypothalamus</li>
                                    </ul>
                                </div>

                                <div>
                                    <ul style={{ textDecoration: 'none' }}>
                                        <li>Amygdala</li>
                                        <li>Thalamus</li>
                                        <li>Hippocampus</li>
                                        <li>Cingulate</li>
                                        <li>Gyrus</li>
                                        <li>Diencephalon</li>
                                        <li>Thalamus</li>
                                        <li>Hypothalamus</li>
                                        <li>Epithalamus</li>
                                        <li>Subthalamus</li>
                                        <li>Brainstem</li>
                                        <li>Midbrain</li>
                                        <li>Pons</li>
                                        <li>Medulla</li>
                                        <li>The Cerebellum</li>
                                        <li>Cerebrocerebellum</li>
                                        <li>Spinocerebellum</li>
                                        <li>Vestibulocerebellum</li>
                                        <li>Grey Matter</li>
                                        <li>White Matter</li>
                                        <li>Commissural fibers</li>
                                        <li>Association fibers</li>
                                        <li>Projection fibers</li>
                                        <li>Nervous system</li>
                                        <li>Neuron Anatomy</li>
                                        <li>Cell body</li>
                                        <li>Dendrites</li>
                                    </ul>
                                    <div className="form-flex">
                                <img src={GetStudyGuideBtn} />
                            </div>
                                </div>

                                <div>
                                    <ul style={{ textDecoration: 'none' }}>
                                        <li>Axon</li>
                                        <li>Transport Vesicles</li>
                                        <li>Neuron Function</li>
                                        <li>Neuron communication</li>
                                        <li>Type of signals</li>
                                        <li>Neuron types</li>
                                        <li>Sensory neurons</li>
                                        <li>Interneurons</li>
                                        <li>Motor neurons</li>
                                        <li>Spinal Cord</li>
                                        <li>Cervical</li>
                                        <li>Thoracic</li>
                                        <li>Lumbar</li>
                                        <li>Sacral</li>
                                        <li>Cranial nerves</li>
                                        <li>I The Olfactory</li>
                                        <li>II Optic Nerve</li>
                                        <li>III Oculomotor</li>
                                        <li>IV Trochlear</li>
                                    </ul>
                                </div>

                                <div>
                                    <ul style={{ textDecoration: 'none' }}>
                                        <li>V Trigeminal</li>
                                        <li>VI Abducens</li>
                                        <li>VII Facial</li>
                                        <li>IX Glossopharyngeal</li>
                                        <li>X Vagus</li>
                                        <li>XI Accessory</li>
                                        <li>XII Hypoglossal</li>
                                        <li>Bones</li>
                                        <li>Skull</li>
                                        <li>Bones of the Head</li>
                                        <li>Spinal Cord</li>
                                        <li>Cervical</li>
                                        <li>Thoracic</li>
                                        <li>Lumbar</li>
                                        <li>Sacral</li>
                                        <li>5 Element Theory</li>
                                        <li>Executive functions</li>
                                        <li>Chakras</li>
                                        <li>Meridian lines</li>
                                        <li>Muscles</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            <div className="accordion-flexbox">
                                <img src={AccordionRadioUnfilled} />
                                <h1 className="accordion-title">Assessment</h1>
                                <img src={AccordionDropDown} />
                            </div>
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <div>
                            <h1>
                                Complete 500 hours of relevant brain integration
                                training.
                            </h1>
                            <p>
                                The Brain Integration Training program requires
                                a comprehensive 500-hour training to ensure
                                proficiency and expertise in the field. The
                                training is divided into three key areas:
                                Standard Knowledge Base, Professional Training,
                                and Competency Base. Below is a detailed
                                breakdown of each component:
                            </p>
                            <h3>Standard Knowledge Base</h3>
                            <p>
                                Anatomy and Physiology: Understanding the human
                                body&apos;s structure and function, with a focus
                                on the brain and nervous system. Brain
                                Integration Awareness and Systems: Learning the
                                principles of brain integration, including how
                                different parts of the brain communicate and
                                work together. Executive Functions: Studying the
                                brain&apos;s higher-order processes, such as
                                planning, decision-making, problem-solving, and
                                impulse control. Senses and Reflexes: Exploring
                                how sensory input and reflex actions contribute
                                to brain function and integration. Techniques
                                and Applications: Mastering various techniques
                                for brain integration and their practical
                                applications in clinical settings.
                            </p>
                            <h3>Professional Training</h3>
                            <p>
                                Objectives and Assessments: Setting clear
                                objectives for brain integration sessions and
                                learning how to assess client progress
                                effectively. Professional Conduct: Maintaining a
                                high standard of professionalism in all
                                interactions with clients and colleagues. Ethics
                                and Boundaries: Adhering to ethical guidelines
                                and establishing appropriate boundaries in
                                client relationships. Good Business Practices:
                                Implementing sound business practices, including
                                client management, record-keeping, and financial
                                responsibilities.
                            </p>
                            <h3>Competency Base</h3>
                            <p>
                                Effective Communication: Developing strong
                                communication skills to interact effectively
                                with clients and colleagues. Client Clinic
                                Services: Providing comprehensive clinic
                                services, from initial consultations to
                                follow-up sessions. Competency-Based Testing:
                                Demonstrating proficiency through practical
                                exams and assessments. Certification:
                                Successfully completing the certification
                                process to become a recognized Brain Integration
                                practitioner. Upon completion of the 500-hour
                                training, participants must upload proof of
                                their training hours to receive certification.
                                This ensures that all practitioners meet the
                                rigorous standards required to provide
                                high-quality brain integration services.
                            </p>
                        </div>
                    </AccordionItemPanel>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

//Areas of knowledge for the Study Guide

export default AccordionCard;
