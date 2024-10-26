import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { useState, useContext, useEffect } from 'react';
import banner from '../assets/icons/PractitionerBackground.png';
import paleBanner from '../assets/icons/PaleGreenPractitionerBackground.png';
import ProfilePhotoUpload from '../components/ProfilePhotoUpload';
import unlock from '../assets/icons/unlock.png';
import { UserContext } from '../contexts';
import ProfileEditForm from '../components/ProfileEditForm';

export const Profile = withAuthenticationRequired(() => {
    const { user } = useAuth0();
    const { fetchProfileData, profileData } = useContext(UserContext);
    const [isEditing, setIsEditing] = useState(false);
    
    const [sectionName, setSectionName] = useState(null);

    useEffect(() => {
        fetchProfileData(user);
    }, [user]);

    const handleTabClick = (section) => {
        setSectionName(section);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    return (
        <div className="flex flex-col">
            {/* Banner Section */}
            <div
                className="w-full h-96 relative bg-white"
                style={{
                    backgroundImage: `url(${banner}), url(${paleBanner})`,
                    backgroundSize: 'contain, contain',
                    backgroundPosition: 'top, top',
                    backgroundRepeat: 'no-repeat, no-repeat',
                }}
            >
                <div className="absolute text-center text-white text-3xl sm:text-4xl md:text-5xl font-fenix font-normal top-[20%] left-0 right-0 mx-auto">
                    Practitioner Profile
                </div>
            </div>
            {/* Tabs Section */}
            <div className="flex justify-center mt-10">
                <div className="flex flex-wrap justify-between gap-4 w-full max-w-4xl border-2 p-2 border-gray-300 rounded-lg bg-white shadow-md">
                    {['profile', 'password', 'professional'].map((section) => (
                        <button
                            key={section}
                            onClick={() => handleTabClick(section)}
                            className={`flex-1 p-2 rounded-lg ${
                                sectionName === section
                                    ? 'bg-pale-green'
                                    : 'bg-white'
                            }`}
                        >
                            {section.charAt(0).toUpperCase() + section.slice(1)}
                        </button>
                    ))}
                </div>
            </div>
            {/* Content Section */}
            <div className="flex flex-col px-4 sm:px-8 mt-10">
                <ProfilePhotoUpload />
                <h3 className="text-center font-poppins text-xl sm:text-2xl mb-4">
                    {profileData
                        ? `${profileData.firstName} ${profileData.lastName}`
                        : user.email}
                </h3>

                {/* Profile Section */}
                {(!sectionName || sectionName === 'profile') && (
                    <div>
                        {profileData ? (
                            <div className="flex flex-col justify-center items-center gap-10">
                                <p>Welcome back</p>
                                <h3>
                                    {profileData.firstName}{' '}
                                    {profileData.lastName}{' '}
                                    {profileData.suffix}
                                </h3>
                                <h3>{profileData.addressLine1}</h3>
                                <h3>{profileData.addressLine2}</h3>
                                <h3>
                                    {profileData.city} {profileData.state}{' '}
                                    {profileData.zip}{' '}
                                    {profileData.country}{' '}
                                </h3>
                                <h3>{profileData.phoneNumber}</h3>
                                <h3>{profileData.email}</h3>

                                <h3>{profileData.bio}</h3>
                                <div className="flex justify-end pb-20 gap-10">
                                    <img src={unlock} />
                                    <button
                                        onClick={handleEditClick}
                                        className="bg-medium-pale-green rounded-2xl w-[204px] h-[43px] text-white"
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className=" flex flex-col pl-4 text-center  justify-start gap-10 pb-20 ">
                                    <h2 className="font-fira text-3xl ">
                                        My Profile
                                    </h2>
                                    <h3 className="font-fira text-black text-xl text-opacity-60">
                                        Set your account settings below.
                                        <br></br>
                                        <br></br>This information will be shown
                                        on your public practitioner page.
                                    </h3>
                                </div>
                                <div className="flex justify-end pb-20 gap-10">
                                    <img src={unlock} />
                                    <button
                                        onClick={handleEditClick}
                                        className="bg-medium-pale-green rounded-2xl w-[204px] h-[43px] text-white"
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                        )}
                        {isEditing && (
                            <ProfileEditForm
                                isEditing={isEditing}
                                setIsEditing={setIsEditing}
                            />
                        )}
                    </div>
                )}
                {isEditing && <ProfileEditForm setIsEditing={setIsEditing} />}
            </div>
            {sectionName === 'password' && (
                // Password Section
                <div className="text-center">
                    <h2 className="font-fira text-2xl">Reset your password</h2>
                    <p className="text-gray-600">
                        Enter your email to receive a 4-digit code for password
                        reset.
                    </p>
                    <div className="mt-4">
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="border rounded px-3 py-2 w-full max-w-md"
                        />
                        <button className="btn bg-light-green text-white rounded-lg px-4 py-2 mt-2">
                            Get a 4-digit code
                        </button>
                    </div>
                </div>
            )}

            {sectionName === 'professional' && (
                <div className="text-center">
                    <h2 className="font-fira text-2xl">Professional Page</h2>
                    <p className="text-gray-400">
                        View your professional bio below.
                    </p>

                    {profileData ? (
                        <div className="mt-4 border rounded-lg p-4">
                            <h3>{`${profileData.firstName} ${profileData.lastName}`}</h3>
                            <p>{profileData.bio}</p>
                        </div>
                    ) : (
                        <p>No professional information available</p>
                    )}
                </div>
            )}
        </div>
    );
});
