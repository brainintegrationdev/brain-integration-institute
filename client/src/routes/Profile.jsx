/* eslint-disable no-unused-vars */
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { useState, useContext, useEffect } from 'react';
import banner from '../assets/icons/PractitionerBackground.png';
import paleBanner from '../assets/icons/PaleGreenPractitionerBackground.png';
import ProfilePhotoUpload from '../components/ProfilePhotoUpload';
import unlock from '../assets/icons/unlock.png';
import { UserContext } from '../contexts';
import useProfileData from '../hooks';
import ProfileEditForm from '../components/ProfileEditForm';
// import Navbar from '../components/header/Navbar'
// import { About } from "../components/About";

export const Profile = withAuthenticationRequired((props) => {
    const { user } = useAuth0();
    const { inputs, setInputs, initialValues, loading, setLoading, error, setError, resetInputs, handleInputChange, createProfileData, setProfileData, fetchProfileData, profileData } =
        useContext(UserContext);
    const { getAccessTokenSilently } = useAuth0();
    const [validationError, setValidationError] = useState('');
    const [requiredFieldError, setRequiredFieldError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [sectionName, setSectionName] = useState(null);
    // const { profileData, loading, error, fetchProfileData, profileData } =
    //     useProfileData(user);
    const [isEditing, setIsEditing] = useState(false)

    console.log(profileData);
    console.log(user);
    console.log(isEditing)

    useEffect(() => {
        fetchProfileData(user);
    }, []);


    console.log(sectionName);
    console.log(profileData);


    const handleTabClick = (section) => {
        setSectionName(section);
    };

    const handleEditClick = () => {
        setIsEditing(true)
        console.log('edit click')
    }

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     try {
    //         await createProfileData();
    //         console.log('Profile created successfully');
    //     } catch (error) {
    //         console.error('Error creating profile:', error);
    //         alert(`Profile creation failed: ${error.message}`);
    //     }
    // };

    const handleEmailFormSubmit = (e) => {
        e.preventDefault();
        console.log('email address received');
    };

    const onRequiredBlur = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        if (!isSubmitted) {
            if (value === '') {
                setRequiredFieldError(
                    'Please enter a value in required fields.',
                );
            } else {
                setRequiredFieldError('');
            }
        }
    };

    return (
        <div>
            <div
                className="2FindAPractitioner w-full h-96 relative bg-white"
                style={{
                    backgroundImage: `url(${banner}), url(${paleBanner})`,
                    backgroundSize: 'contain, contain',
                    backgroundPosition: 'top, top',
                    backgroundRepeat: 'no-repeat, no-repeat',
                }}
            >
                <div className=" left-[10%] top-[15%] pl-[180px] absolute text-center text-white text-5xl font-normal font-['Fenix']">
                    Practitioner Profile
                </div>
            </div>
            <div className="flex flex-col px-10">
                <div className="flex justify-center ">
                    <div className=" flex justify-between gap-[27px] h-[49px] w-[771px] border-[2px] p-[4px] border-gray rounded-[6.831px] bg-white mb-20  shadow-[inset_0px_4.554px_4.554px_rgba(0,0,0,0.25)]">
                        <button
                            id="profile"
                            onClick={() => handleTabClick('profile')}
                            className={
                                sectionName === 'profile' || !sectionName
                                    ? 'bg-pale-green rounded-xl shadow w-[235px] p-[9px]'
                                    : 'rounded-xl shadow w-[235px] p-[9px]'
                            }
                        >
                            Profile
                        </button>
                        <button
                            id="password"
                            onClick={() => handleTabClick('password')}
                            className={
                                sectionName === 'password'
                                    ? 'bg-pale-green rounded-xl shadow w-[235px] p-[9px]'
                                    : 'rounded-xl shadow w-[235px] p-[9px]'
                            }
                        >
                            Password
                        </button>
                        <div className="flex">
                            <button
                                id="professional"
                                onClick={() => handleTabClick('professional')}
                                className={
                                    sectionName === 'professional'
                                        ? 'bg-pale-green rounded-xl shadow w-[235px]'
                                        : 'rounded-xl shadow w-[235px] p-[9px]'
                                }
                            >
                                Professional Page
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col ">
                    <div className="flex flex-col px-4 items-left">
                        <ProfilePhotoUpload />
                        {profileData ? (
                            <h3 className="font-poppins text-2xl">
                                {' '}
                                {profileData.firstName} {profileData.lastName}
                            </h3>
                        ) : (
                            <h3 className="font-poppins text-2xl">
                                {user.email}
                            </h3>
                        )}
                        {(!sectionName || sectionName === 'profile') && (
                            <div>
                                {profileData ? (
                                    <div className='flex flex-col justify-center items-center'>
                                        <p>Welcome back</p>
                                        <h3>{profileData.firstName} {profileData.lastName}</h3>
                                       
                                        <h3>{profileData.bio}</h3>
                                        <div className="flex justify-end pb-20 gap-10">
                                            <img src={unlock} />
                                            <button onClick={handleEditClick} className="bg-medium-pale-green rounded-2xl w-[204px] h-[43px] text-white">
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
                                                Set your account settings
                                                below. 
                                                <br></br>
                                                <br></br>This information will be shown on your public practitioner page.
                                            </h3>
                                        </div>
                                        <div className="flex justify-end pb-20 gap-10">
                                            <img src={unlock} />
                                            <button onClick={handleEditClick} className="bg-medium-pale-green rounded-2xl w-[204px] h-[43px] text-white">
                                                Edit
                                            </button>
                                        </div>
                                      
                                      
                                    </div>
                                )}
                                 {isEditing && (<ProfileEditForm isEditing={isEditing} setIsEditing={setIsEditing}/>)}
                            </div>
                             
                        )}

                        {sectionName === 'password' && (
                            <div className="flex flex-col items-center gap-10">
                                <h1 className="font-fira text-3xl ">
                                    Reset your password
                                </h1>
                                <h3 className="font-fira text-black text-xl text-opacity-60">
                                    You may change your password by entering
                                    your email address and we will send you a
                                    4-digit code.
                                </h3>
                                <div className="flex">
                                    <form
                                        onSubmit={handleEmailFormSubmit}
                                        className="w-full p-4 bg-white"
                                    >
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            onChange={handleInputChange}
                                            onBlur={onRequiredBlur}
                                            placeholder="Enter your email address"
                                            className="border rounded px-3 py-2"
                                        />
                                    </form>
                                </div>
                                <button className="btn bg-light-green rounded-xl text-white h-12 w-[300px]">
                                    Get a 4-digit code
                                </button>
                            </div>
                        )}

                        {sectionName === 'professional' && (
                            <div className="flex flex-col items-center justify-center gap-10 pb-20">
                                <div className="  pl-4 text-center  justify-start gap-10 pb-20 ">
                                    <h2 className="font-fira text-3xl ">
                                        Professional Page
                                    </h2>
                                    <br></br>
                                    <br></br>
                                    <h3 className="font-fira text-black text-xl text-opacity-60">
                                        View your professional bio below
                                    </h3>
                                    {profileData ? (
                                    
                                    <div className='flex flex-col gap-10 mt-10 border-[2px] rounded-2xl'>
                                    <h3 className="font-poppins text-2xl">
                                {' '}
                                {profileData.firstName} {profileData.lastName}
                            </h3>
                            <h3>{profileData.bio}</h3>
                            </div>
                                    ): (<div className='flex flex-col gap-10 mt-10'> <h3>No profile information created yet</h3> </div>)}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});
