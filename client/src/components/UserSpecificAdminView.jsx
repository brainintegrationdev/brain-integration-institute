/* eslint-disable react/prop-types */
// Example User Component
import { useEffect, useState, useContext } from 'react';
import { useParams } from "react-router-dom"
import axios from 'axios';
import { AdminContext } from '../contexts';

const UserSpecificAdminView = () => {
    const [user, setUser] = useState(null);
    const { individualUser, setIndividualUser, users, getUserById } = useContext(AdminContext)
    const { userId } = useParams()

    console.log("User ID:", userId); 

    useEffect(() => {
        // Set the individual user based on userId when this component loads
        if (userId) {
            const user = users.find((user) => user._id === userId);
            setIndividualUser(user);
        }
    }, [userId, setIndividualUser, users]);

    console.log(individualUser)

    if (!individualUser) return <p>Loading...</p>;

    const {
        brainIntegrationTraining,
        clinicalHours,
        firstAidTraining,
        cprCert,
        videoPresentation,
        insurance,
    } = individualUser.certListUploadStatus;

    return (
        <div className="flex flex-col items-center justify-center w-full gap-[150px]">
            <h2>{individualUser.userEmail} Certification Status</h2>
            {individualUser ? (
                <div>
            <ul>
            <li>Brain Integration Training: {individualUser.certListUploadStatus.brainIntegrationTraining}</li>
            <li>Clinical Hours: {individualUser.certListUploadStatus.clinicalHours}</li>
                <li>First Aid Training: {individualUser.certListUploadStatus.firstAidTraining}</li>
                <li>CPR Certification: {individualUser.certListUploadStatus.cprCert}</li>
                <li>Video Presentation: {individualUser.certListUploadStatus.videoPresentation}</li>
                <li>Insurance: {individualUser.certListUploadStatus.insurance}</li>
            </ul>
            </div> ) : (  <p>Loading user details...</p>)}
        </div>
    );
};

export default UserSpecificAdminView;
