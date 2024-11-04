/* eslint-disable react/prop-types */
import { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { AdminContext, UserContext } from '../contexts';
import ProgressBar0 from '../assets/icons/ProgressBar0.png';
import ProgressBar1 from '../assets/icons/ProgressBar1.png';
import ProgressBar2 from '../assets/icons/ProgressBar2.png';
import ProgressBar3 from '../assets/icons/ProgressBar3.png';
import ProgressBar4 from '../assets/icons/ProgressBar4.png';
import ProgressBar5 from '../assets/icons/ProgressBar5.png';
import ProgressBar6 from '../assets/icons/ProgressBar6.png';
import ProgressBar7 from '../assets/icons/ProgressBar7.png';
import ProgressBar8 from '../assets/icons/ProgressBar8.png';
import heartPulse from '../assets/icons/heart-pulse.png';
import presentation from '../assets/icons/presentation.png';
import shield from '../assets/icons/shield-half.png';
import briefcase from '../assets/icons/briefcase-medical.png';
import clipboard from '../assets/icons/clipboard-list.png';
import video from '../assets/icons/video.png';
// import graduationCap from '../asset/icons/graduation-cap.png'

const UserSpecificAdminView = () => {
    const { individualUser, setIndividualUser, users, fetchProfileData, profileData, setProfileData } =
        useContext(AdminContext);
    // const { fetchProfileData, profileData } = useContext(UserContext);
    const { userId } = useParams();
    // const { user } = useAuth0();

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

    useEffect(() => {
        if (userId) {
            const foundUser = users.find((user) => user._id === userId);
            setIndividualUser(foundUser);
            console.log(individualUser)
        }
    }, [userId, setIndividualUser, users]);

    useEffect(() => {
        fetchProfileData(individualUser);
    }, [individualUser]);

    if (!individualUser) return <p>Loading...</p>;

    const {
        brainIntegrationTraining,
        clinicalHours,
        firstAidTraining,
        cprCert,
        videoPresentation,
        insurance,
    } = individualUser.certListUploadStatus;

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'pending approval':
                return 'bg-school-bus-yellow text-black';
            case 'declined':
                return 'bg-red text-white';
            case 'approved':
                return 'bg-green-is-good text-white';
            default:
                return 'bg-gray text-black';
        }
    };

    console.log(profileData)

    return (
        <div className="flex flex-col items-center w-full gap-6">
            <div className="flex items-center gap-8">
                <div className="flex bg-yet-another-light-grey w-[739px] h-[355px] pt-10 pl-10 pb-10">
                    {profileData && Object.keys(profileData).length > 0 ? (
                        <>
                            {profileData.userId && (
                                <img
                                    src={profileData.userId.userProfilePicture}
                                    alt="Profile"
                                />
                            )}
                            <div className="flex pl-20 flex-col gap-8">
                                <p className="font-bold text-3xl">
                                    {profileData.firstName}{' '}
                                    {profileData.lastName}
                                </p>
                              
                                <p className="text-xl">
                                    {profileData.city} {profileData.state}{' '}
                                    {profileData.zip}
                                </p>
                                <p className="text-xl font-bold text-blue">
                                    {profileData.phoneNumber}
                                </p>
                                <p className="text-xl font-bold text-blue">
                                    {profileData.email}
                                </p>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col justify-center items-center">
                        <p className="font-bold text-3xl">No profile data found</p>
                        </div>
                    )}
                </div>

                <div>
                    <img
                        src={
                            certProgressImages[
                                Math.min(
                                    individualUser.userUploadProgress || 0,
                                    certProgressImages.length - 1,
                                )
                            ]
                        }
                        className="w-auto md:w-auto"
                        alt={`Progress level ${individualUser.userUploadProgress}`}
                    />
                </div>
            </div>

            <div className="flex flex-col items-start w-[739px] mt-4">
                <ul className="pl-5">
                    {[
                        {
                            name: 'Video Presentation',
                            status: videoPresentation,
                            icon: video,
                        },
                        {
                            name: 'Brain Integration Training',
                            status: brainIntegrationTraining,
                            icon: presentation,
                        },
                        {
                            name: 'CPR Certification',
                            status: cprCert,
                            icon: heartPulse,
                        },
                        {
                            name: 'Clinical Hours',
                            status: clinicalHours,
                            icon: clipboard,
                        },
                        {
                            name: 'First Aid Training',
                            status: firstAidTraining,
                            icon: briefcase,
                        },
                        {
                            name: 'Insurance',
                            status: insurance,
                            icon: shield,
                        },
                    ].map((doc, index) => (
                        <div
                            key={index}
                            className="pb-5 flex border border-charcoal rounded-xl p-10 mb-10 items-center gap-20"
                        >
                            <input
                                type="checkbox"
                                className="custom-checkbox"
                            />
                            <li>
                                {doc.name}:{' '}
                                <span
                                    className={`px-2 py-1 rounded-full text-sm font-semibold ${getStatusBadgeClass(
                                        doc.status,
                                    )}`}
                                >
                                    {doc.status}
                                </span>
                            </li>
                            <img
                                src={doc.icon}
                                className="w-[40px]"
                                alt={`${doc.name} icon`}
                            />
                            <button className="border border-black rounded px-4 py-1 ml-4 font-bold shadow-lg w-[116px]">
                                View
                            </button>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default UserSpecificAdminView;
