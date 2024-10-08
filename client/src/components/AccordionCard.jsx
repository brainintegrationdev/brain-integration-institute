/* eslint-disable no-unused-vars */
import { useState, useContext, useEffect } from 'react';
import UploadBtn from '../assets/icons/UploadBtn.png';
import GetStudyGuideBtn from '../assets/icons/GetStudyGuideBtn.png';
import ProgressBar0 from '../assets/icons/ProgressBar0.png';
import ProgressBar1 from '../assets/icons/ProgressBar1.png';
import ProgressBar2 from '../assets/icons/ProgressBar2.png';
import ProgressBar3 from '../assets/icons/ProgressBar3.png';
import ProgressBar4 from '../assets/icons/ProgressBar4.png';
import ProgressBar5 from '../assets/icons/ProgressBar5.png';
import ProgressBar6 from '../assets/icons/ProgressBar6.png';
import ProgressBar7 from '../assets/icons/ProgressBar7.png';
import ProgressBar8 from '../assets/icons/ProgressBar8.png';
import StudyGuidePages from '../assets/icons/StudyGuidePages.png';
import PayforandStart from '../assets/icons/PayforandStart.png';
import Assessment from './Assessment';
import Insurance from './Insurance';
import Brain from './Brain';
import Clinical from './Clinical';
import CPR from './CPR';
import FirstAid from './FirstAid';
import Video from './Video';
import StudyGuide from './StudyGuide';
import DeleteModal from './DeleteModal';
import DeleteFileIcon from '../assets/icons/DeleteFileIcon.png';
// import FileList from './FileList';
// import Certdocs from './Certdocs';

// import UploadWidget from './UploadWidget';
// import { CloudinaryProvider } from '../providers/CloudinaryProvider';

import { useAuth0 } from '@auth0/auth0-react';

import { Accordion } from 'react-accessible-accordion';
import e from 'cors';
import { CloudinaryContext } from '../contexts';


//mock submission to DB until backend created

const AccordionCard = () => {
    // eslint-disable-next-line no-unused-vars
    const {
        uwConfig,
        initializeCloudinaryWidget,
        filename,
        getFilesInFolder,
        getCloudinaryFiles,
        getFiles,
        files,
        progress,
        setProgress,
        updateUserProgress,
        isSubmitted,
        setIsSubmitted,
        fileMetaData,
        setFileMetaData,
        isLoading,
        setIsLoading,
        getUserMetaData
    } = useContext(CloudinaryContext);
    // const [progress, setProgress] = useState(0);
    // const [isSubmitted, setIsSubmitted] = useState(false);
    const { isAuthenticated, user } = useAuth0();
    const [sectionName, setSectionName] = useState('');
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [userMetaData, setUserMetaData] = useState({})


    const certProgressImages = [
        ProgressBar0,
        ProgressBar1,
        ProgressBar2,
        ProgressBar3,
        ProgressBar4,
        ProgressBar5,
        ProgressBar6,
        ProgressBar7,
        ProgressBar8,
    ];

    const getStudyGuide = () => {
        console.log('study guide purchased');
    };

    const confirmationModal = (fileName) => {
        setSelectedFile(fileName);
        setDeleteModalOpen(true);
        console.log('are you sure you want to delete this file?');
    };

    const handleDeleteFile = () => {
        console.log(`Deleting file: ${selectedFile}`);

        setDeleteModalOpen(false);
        setSelectedFile(null);
        const newProgress = Math.max(0, progress - 1); 

        
        setProgress(newProgress);
    
  
        updateUserProgress(newProgress);
    };

    const showFile = () => {
        console.log('file shown');
    };

    const handleUploadClick = (section) => {
        setSectionName(section);
        initializeCloudinaryWidget(section);
        console.log('Calling updateUserProgress with value:', 1);
        
    };

    console.log(progress);

    if (isAuthenticated) {
        console.log("User Data:", user); // Inspect the user object
    }

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                const token = localStorage.getItem('token');
                try {
                    const folderFiles = await getFilesInFolder(token); //docs themselves
                    const metadataFiles = await getFiles(token); //metadata
                    const userMetaData = await getUserMetaData(token)

                    console.log('Files in folder:', folderFiles);
                    console.log('File metadata:', metadataFiles);
                    console.log('User metadata', userMetaData)
                    setFileMetaData(metadataFiles);
                    setUserMetaData(userMetaData)
                    setProgress(userMetaData.userUploadProgress)
                } catch (error) {
                    console.error(
                        'Error fetching files:',
                        error.response?.data || error.message,
                    );
                }
            }
        };

        fetchData();
    }, [user, userMetaData.userUploadProgress]);

    console.log(fileMetaData);
    console.log(progress)

    const getSectionFileNames = (sectionName) => {
        const filteredFiles = fileMetaData.filter(
            (file) => file.sectionName === sectionName,
        );
        const fileNames = filteredFiles.map((file) => {
            return file.filename;
        });
        return fileNames;
    };

    return (
        <div className="flex justify-start">
            {isAuthenticated && (
                <div>
                    <img
                        className="h-[200px] w-[200px] ml-20 mr-[80px] rounded-full"
                        src={user.picture}
                        alt="avatar"
                    />
                </div>
            )}
            <div className="flex flex-col justify-center gap-4  w-[832px] pl-10 ">
                <p className="font-fira text-xl font-light pt-20 pb-10 pl-5">
                    Follow these steps to submit your documentation for
                    certification review. You may complete them in any order,
                    except for the assessment, which can only be accessed once
                    the preceding items are completed. If you have any questions
                    about the process, please{' '}
                    <span className="font-fira text-xl font-bold text-blue">
                        contact us
                    </span>
                    , and a member of our board will be happy to assist you.
                </p>
                <div className="flex flex-col justify-center items-center pl-20 gap-4 pb-5">
                    <img src={certProgressImages[progress]} />
                </div>

                <Accordion
                    allowMultipleExpanded={true}
                    allowZeroExpanded={true}
                    className="w-[826px]"
                >
                    <Brain
                        title="Brain Integration Training"
                        sectionName="Brain"
                        fileMetadata={fileMetaData}
                    >
                        <div className="flex flex-col pl-6 pr-6 border rounded-lg border-t-0 solid black rounded-tr-none rounded-tl-none mb-5">
                            <h1 className="font-fira text-dark-green font-bold text-xl pt-10">
                                Complete 500 hours of relevant brain integration
                                training.
                            </h1>
                            <h2>{sectionName}</h2>
                            <br></br>
                            <p className="font-fira text-black text-base font-normal">
                                The Brain Integration Training program requires
                                a comprehensive 500-hour training to ensure
                                proficiency and expertise in the field. The
                                training is divided into three key areas:
                                Standard Knowledge Base, Professional Training,
                                and Competency Base. Below is a detailed
                                breakdown of each component:
                            </p>
                            <br></br>
                            <h3 className="font-fira text-black text-base font-bold">
                                Standard Knowledge Base
                            </h3>
                            <p>
                                Anatomy and Physiology: Understanding the human
                                body&apos;s structure and function, with a focus
                                on the brain and nervous system. <br></br>Brain
                                Integration Awareness and Systems: Learning the
                                principles of brain integration, including how
                                different parts of the brain communicate and
                                work together. <br></br>Executive Functions:
                                Studying the brain&apos;s higher-order
                                processes, such as planning, decision-making,
                                problem-solving, and impulse control. <br></br>
                                Senses and Reflexes: Exploring how sensory input
                                and reflex actions contribute to brain function
                                and integration. <br></br>Techniques and
                                Applications: Mastering various techniques for
                                brain integration and their practical
                                applications in clinical settings.
                            </p>
                            <br></br>
                            <h3 className="font-fira text-black text-base font-bold">
                                Professional Training
                            </h3>
                            <p>
                                Objectives and Assessments: Setting clear
                                objectives for brain integration sessions and
                                learning how to assess client progress
                                effectively.<br></br> Professional Conduct:
                                Maintaining a high standard of professionalism
                                in all interactions with clients and colleagues.
                                <br></br> Ethics and Boundaries: Adhering to
                                ethical guidelines and establishing appropriate
                                boundaries in client relationships. <br></br>
                                Good Business Practices: Implementing sound
                                business practices, including client management,
                                record-keeping, and financial responsibilities.
                            </p>
                            <br></br>
                            <h3 className="font-fira text-black text-base font-bold">
                                Competency Base
                            </h3>
                            <p>
                                Effective Communication: Developing strong
                                communication skills to interact effectively
                                with clients and colleagues.<br></br> Client
                                Clinic Services: Providing comprehensive clinic
                                services, from initial consultations to
                                follow-up sessions.<br></br> Competency-Based
                                Testing: Demonstrating proficiency through
                                practical exams and assessments. <br></br>
                                Certification: Successfully completing the
                                certification process to become a recognized
                                Brain Integration practitioner.<br></br> Upon
                                completion of the 500-hour training,
                                participants must upload proof of their training
                                hours to receive certification. This ensures
                                that all practitioners meet the rigorous
                                standards required to provide high-quality brain
                                integration services.
                            </p>
                            <br></br>

                            <div className="flex flex-col gap-10 pt-10 pb-2">
                                <div className="flex justify-center gap-10 pb-5">
                                    {/* File Names List - Left Justified */}
                                    <div className="flex flex-col justify-start items-start pl-0">
                                        <ul>
                                            {getSectionFileNames('Brain').map(
                                                (fileName, index) => (
                                                    <li
                                                        key={index}
                                                        className="flex gap-5"
                                                    >
                                                        <button
                                                            className="font-fira text-xl text-blue font-bold text-left "
                                                            onClick={showFile}
                                                        >
                                                            {fileName}
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                confirmationModal(
                                                                    fileName,
                                                                )
                                                            }
                                                        >
                                                            X
                                                        </button>
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                        {deleteModalOpen && (
                                            <DeleteModal
                                                open={deleteModalOpen}
                                                onClose={() =>
                                                    setDeleteModalOpen(false)
                                                }
                                            >
                                                <div className="text-center w-56 flex flex-col items-center gap-2 mb-10">
                                                    <img
                                                        src={DeleteFileIcon}
                                                        className="w-70px] h-[70px]"
                                                        alt="Delete File"
                                                    />

                                                    <h3 className="text-lg text-gray-500 font-bold">
                                                        Are you sure you want to
                                                        delete?
                                                    </h3>
                                                    <p className="text-sm">
                                                        This process cannot be
                                                        undone.
                                                    </p>
                                                </div>
                                                <div className="flex gap-10">
                                                    <button
                                                        className="bg-light-gray w-full py-2 rounded text-white"
                                                        onClick={() =>
                                                            setDeleteModalOpen(
                                                                false,
                                                            )
                                                        }
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        className="bg-red w-full py-2 rounded text-white"
                                                        onClick={
                                                            handleDeleteFile
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </DeleteModal>
                                        )}
                                    </div>

                                    {/* Upload Button - Centered */}
                                    <div className="flex justify-center items-center">
                                        <button>
                                            <img
                                                src={UploadBtn}
                                                onClick={() =>
                                                    handleUploadClick('Brain')
                                                }
                                                alt="Upload Brain"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Brain>
                    <Clinical title="Clinical Hours" sectionName="Clinical">
                        <div className="flex flex-col pl-6 pr-6 border rounded-lg border-t-0 solid black rounded-tr-none rounded-tl-none mb-5">
                            <p className="font-fira text-dark-green font-bold text-xl pt-10">
                                Completion of 200 hours of clinical practice in
                                brain integration or kinesiology including
                                various populations and settings.{' '}
                            </p>
                            <br></br>
                            <ul className="font-fira text-black text-base font-normal list-disc list-inside">
                                We encourage the following:
                                <li className="pt-3 ">
                                    Practicum with the public{' '}
                                </li>
                                <li className="">
                                    Practicums in a lab setting with oversight{' '}
                                </li>
                                <li className="pl-4 -ml-4">
                                    SOAP notes, or subjective, objective,
                                    assessment, and plan notes, are a
                                    standardized method used by{' '}
                                    <span className="pl-5">
                                        professionals to document client
                                        interacations
                                    </span>
                                </li>
                                <li className="list-disc list-inside">
                                    {' '}
                                    Experience brain integration with children,
                                    teenagers, adults, and individuals with
                                    special needs{' '}
                                </li>
                            </ul>
                            <div className="flex flex-col justify-center items-center gap-10 pt-10 ">
                                <div className="flex gap-10 pb-5">
                                    <div>
                                        <ul>
                                            {getSectionFileNames(
                                                'Clinical',
                                            ).map((fileName, index) => (
                                                <li
                                                    key={index}
                                                    className="flex gap-5"
                                                >
                                                    <button
                                                        className="font-fira text-xl text-blue font-bold"
                                                        onClick={showFile}
                                                    >
                                                        {fileName}
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            confirmationModal(
                                                                fileName,
                                                            )
                                                        }
                                                    >
                                                        X
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <button>
                                        <img
                                            src={UploadBtn}
                                            onClick={() =>
                                                handleUploadClick('Clinical')
                                            }
                                            alt="Upload Clinical"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Clinical>
                    <FirstAid
                        title="First Aid Certification"
                        sectionName="FirstAid"
                    >
                        <div className="flex flex-col pl-6 pr-6 border rounded-lg border-t-0 solid black rounded-tr-none rounded-tl-none mb-5">
                            <h1 className="font-fira text-dark-green font-bold text-xl pt-10 pb-8">
                                {' '}
                                Show proof of First Aid certification.
                            </h1>
                            <p className="font-fira text-black text-base font-normal">
                                Upload your current First Aid certifications.
                                Scan or photograph both sides of your
                                certification card. Save the files as PDF or
                                JPEG. Click the “Upload” button and select your
                                files.
                            </p>
                            <div className="flex flex-col justify-center items-center gap-10 pt-20 ">
                                <div className="flex gap-10 pb-5">
                                    <div>
                                        <ul>
                                            {getSectionFileNames(
                                                'FirstAid',
                                            ).map((fileName, index) => (
                                                <li
                                                    key={index}
                                                    className="flex gap-5"
                                                >
                                                    <button
                                                        className="font-fira text-xl text-blue font-bold"
                                                        onClick={showFile}
                                                    >
                                                        {fileName}
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            confirmationModal(
                                                                fileName,
                                                            )
                                                        }
                                                    >
                                                        X
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <button>
                                        <img
                                            src={UploadBtn}
                                            onClick={() =>
                                                handleUploadClick('FirstAid')
                                            }
                                            alt="Upload FirstAid"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </FirstAid>
                    <CPR title="CPR Certification" sectionName="CPR">
                        <div className="flex flex-col pl-6 pr-6 border rounded-lg border-t-0 solid black rounded-tr-none rounded-tl-none mb-5">
                            <h1 className="font-fira text-dark-green font-bold text-xl pt-10 pb-8">
                                {' '}
                                Show proof of CPR certification
                            </h1>
                            <p className="pb-5">
                                Upload your current CPR certification. Scan or
                                photograph both sides of your certification
                                card. Save the files as PDF or JPEG. Click the
                                &quot; Upload&quot; button and select your
                                files.
                            </p>

                            <p className="pb-5">
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
                            <div className="flex flex-col justify-center items-center gap-10 pt-20">
                                <div className="flex gap-10 pb-5">
                                    <div>
                                        <ul>
                                            {getSectionFileNames('CPR').map(
                                                (fileName, index) => (
                                                    <li
                                                        key={index}
                                                        className="flex gap-5"
                                                    >
                                                        <button
                                                            className="font-fira text-xl text-blue font-bold"
                                                            onClick={showFile}
                                                        >
                                                            {fileName}
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                confirmationModal(
                                                                    fileName,
                                                                )
                                                            }
                                                        >
                                                            X
                                                        </button>
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    </div>
                                    <button>
                                        <img
                                            src={UploadBtn}
                                            onClick={() =>
                                                handleUploadClick('CPR')
                                            }
                                            alt="Upload CPR"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </CPR>
                    <Video title="Video Presentation" sectionName="Video">
                        <div className="flex flex-col pl-6 pr-6 border rounded-lg border-t-0 solid black rounded-tr-none rounded-tl-none mb-5">
                            <h1 className="font-fira text-dark-green font-bold text-xl pt-10 pb-8">
                                Submit video recording of a documented Brain
                                Integration session.{' '}
                            </h1>
                            <ul>
                                Video must not exceed 30 minutes in length and
                                must include the following knowledge and skills:
                                <li className="list-disc list-inside">
                                    {' '}
                                    Physical demonstration of knowledge{' '}
                                </li>
                                <li className="list-disc list-inside">
                                    Explaining the process of Brain Integration{' '}
                                </li>
                                <li className="list-disc list-inside">
                                    Express knowledge of appropriate reasoning
                                    of the procedure{' '}
                                </li>
                                <li className="list-disc list-inside">
                                    Demonstrate balance process
                                </li>
                                <li className="list-disc list-inside">
                                    Powers of stress alleviation
                                </li>
                                <li className="list-disc list-inside">
                                    Knowledge of meridian points/alarm points
                                </li>
                                <li className="list-disc list-inside">
                                    Pause-lock procedure
                                </li>
                            </ul>
                            <div className="flex flex-col justify-center items-center gap-10 pt-20">
                                <div className="flex gap-10 pb-5">
                                    <div>
                                        <ul>
                                            {getSectionFileNames('Video').map(
                                                (fileName, index) => (
                                                    <li
                                                        key={index}
                                                        className="flex gap-5"
                                                    >
                                                        <button
                                                            className="font-fira text-xl text-blue font-bold"
                                                            onClick={showFile}
                                                        >
                                                            {fileName}
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                confirmationModal(
                                                                    fileName,
                                                                )
                                                            }
                                                        >
                                                            X
                                                        </button>
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    </div>

                                    <button>
                                        <img
                                            src={UploadBtn}
                                            onClick={() =>
                                                handleUploadClick('Video')
                                            }
                                            alt="Upload Video"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Video>

                    <Insurance title="Insurance" sectionName="Insurance">
                        <div className="flex flex-col pl-6 pr-6 border rounded-lg border-t-0 solid black rounded-tr-none rounded-tl-none mb-5">
                            <h1 className="font-fira text-dark-green font-bold text-xl pt-10 pb-8">
                                Show proof of professional and liability
                                insurance{' '}
                            </h1>
                            <p className="pb-8 text-base">
                                Show proof of professional and liability
                                insurance Upload proof of professional and
                                liability insurance (e.g., ABMP).
                            </p>
                            <ul className="font-fira text-black text-base font-bold pb-8">
                                Instructions:
                                <li className="font-fira text-black text-base font-normal">
                                    Scan or photograph your insurance
                                    certificate.
                                </li>
                                <li className="font-fira text-black text-base font-normal">
                                    Save the file as PDF or JPEG.
                                </li>
                                <li className="font-fira text-black text-base font-normal">
                                    Click the &quot;Upload Insurance&quot;
                                    button below and select your file.
                                </li>
                            </ul>
                            <div className="flex flex-col justify-center items-center gap-10 pt-10">
                                <div className="flex gap-10 pb-5">
                                    <div>
                                        <ul>
                                            {getSectionFileNames(
                                                'Insurance',
                                            ).map((fileName, index) => (
                                                <li
                                                    key={index}
                                                    className="flex gap-5"
                                                >
                                                    <button
                                                        className="font-fira text-xl text-blue font-bold"
                                                        onClick={showFile}
                                                    >
                                                        {fileName}
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            confirmationModal(
                                                                fileName,
                                                            )
                                                        }
                                                    >
                                                        X
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <button>
                                        <img
                                            src={UploadBtn}
                                            onClick={() =>
                                                handleUploadClick('Insurance')
                                            }
                                            alt="Upload Insurance"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Insurance>

                    <StudyGuide title={'Study Guide'}>
                        <div className="flex flex-col pl-6 pr-6 border rounded-lg border-t-0 solid black rounded-tr-none rounded-tl-none mb-5">
                            <h1 className="font-fira text-dark-green font-bold text-xl pb-5 pt-10">
                                Areas of knowledge for the Study Guide
                            </h1>
                            <h1 className="font-fira text-black font-normal text-xl pb-5">
                                Having knowledge of Structure, Function, and
                                Processes.
                            </h1>

                            <div className="flex gap-16">
                                <div className="flex-1">
                                    <ul className="min-h-full">
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
                                        <li>Epithalamus</li>
                                        <li>Subthalamus</li>
                                        <li>Brainstem</li>
                                        <li>Midbrain</li>
                                        <li>Pons</li>
                                        <li>Medulla</li>
                                    </ul>
                                </div>

                                <div className="flex-1">
                                    <ul className="min-h-full">
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
                                        <li>Axon</li>
                                        <li>Transport Vesicles</li>
                                        <li>Neuron Function</li>
                                        <li>Neuron communication</li>
                                        <li>Type of signals</li>
                                        <li>Neuron types</li>
                                        <li>Sensory neurons</li>
                                    </ul>
                                </div>

                                <div className="flex-1">
                                    <div className="min-h-full">
                                        <ul
                                            style={{
                                                textDecoration: 'none',
                                            }}
                                        >
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
                                            <li>V Trigeminal</li>
                                            <li>VI Abducens</li>
                                            <li>VII Facial</li>
                                            <li>IX Glossopharyngeal</li>
                                            <li>X Vagus</li>
                                            <li>XI Accessory</li>
                                            <li>XII Hypoglossal</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <div className="min-h-full">
                                        <ul
                                            style={{
                                                textDecoration: 'none',
                                            }}
                                        >
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
                            <div className="flex flex-col justify-center items-center gap-10 pt-5 pb-5">
                                <div className="flex flex-col gap-10">
                                    <p className="pt-[50px] pr-[300px]">
                                        Purchase the Comprehensive Study guide:
                                        $65.00 + tax.{' '}
                                    </p>
                                    <div className="flex items-center">
                                        <img
                                            src={StudyGuidePages}
                                            className="h-[50px] w-[50px]"
                                        />
                                        <p className="font-fira font-bold text-blue">
                                            Study Guide
                                        </p>
                                        <button>
                                            <img
                                                className="pl-[100px]"
                                                src={GetStudyGuideBtn}
                                                onClick={getStudyGuide}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </StudyGuide>
                    <Assessment title={'Assessment'}>
                        <div className="flex flex-col pl-6 pr-6 border rounded-lg border-t-0 solid black rounded-tr-none rounded-tl-none mb-5">
                            <h1 className="font-fira text-dark-green font-bold text-xl pt-10">
                                Complete 500 hours of relevant brain integration
                                training.
                            </h1>
                            <br></br>
                            <p className="font-fira text-black text-base font-normal">
                                The Brain Integration Training program requires
                                a comprehensive 500-hour training to ensure
                                proficiency and expertise in the field. The
                                training is divided into three key areas:
                                Standard Knowledge Base, Professional Training,
                                and Competency Base. Below is a detailed
                                breakdown of each component:
                            </p>
                            <br></br>
                            <h3 className="font-fira text-black text-base font-bold">
                                Standard Knowledge Base
                            </h3>
                            <p className="font-fira text-black text-base font-normal">
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
                            <br></br>
                            <h3 className="font-fira text-black text-base font-bold">
                                Professional Training
                            </h3>
                            <p className="font-fira text-black text-base font-normal">
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
                            <br></br>
                            <h3 className="font-fira text-black text-base font-bold">
                                Competency Base
                            </h3>
                            <p className="font-fira text-black text-base font-normal">
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
                            <br></br>

                            <div className="form-flex gap-10 pt-20 pb-5">
                                <button>
                                    <img
                                        src={PayforandStart}
                                        onClick={getStudyGuide}
                                    />
                                </button>
                            </div>
                        </div>
                    </Assessment>
                </Accordion>
            </div>
        </div>
    );
};

export default AccordionCard;
