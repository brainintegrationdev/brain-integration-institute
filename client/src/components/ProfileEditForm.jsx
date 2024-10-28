/* eslint-disable react/prop-types */
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../contexts';

import ProfileModal from './ProfileModal';



export const ProfileEditForm = (props) => {
    const {
        inputs,
        setInputs,
       

        createProfileData,
        editProfileData,
        setProfileData,
        
        profileData,
    } = useContext(UserContext);
    const { isEditing, setIsEditing } = props;

   
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [requiredFieldError, setRequiredFieldError] = useState('');
    const [hasRequiredError, setHasRequiredError] = useState(false);
    const [validationError, setValidationError] = useState('');
    // const [showModal, setShowModal] = useState(false);
    const [profileModalOpen, setProfileModalOpen] = useState(false);
    const regex = /^[0-9]+$/;

    // console.log(showModal);
    console.log(hasRequiredError);

    const validateRequiredFields = () => {
        if (!profileData) {
            const requiredFields = [
                'firstName',
                'lastName',
                'phoneNumber',
                'email',
                'addressLine1',
                'city',
                'state',
                'zip',
            ];
            const isAnyFieldEmpty = requiredFields.some(
                (field) => !inputs[field],
            );

            setHasRequiredError(isAnyFieldEmpty);
        } else {
            setHasRequiredError(false);
        }
    };

    console.log(profileModalOpen, 'profile modal status');

    const handleInputChange = (e) => {
        console.log('change handled');
        const { name, value } = e.target;
        const regex = /^[0-9]+$/;
        console.log(name, value);
        if (name === 'phoneNumber' && !regex.test(value)) {
            setValidationError('Please enter a valid number.');
            setRequiredFieldError('');
            return;
        }
        setInputs((prevInputs) => ({
            ...prevInputs,
            [name]: value,
        }));
        if (!profileData) {
            validateRequiredFields();
        }
    };

    const handleSubmit = async (event) => {
        console.log('submitting new profile');
        event.preventDefault();
        try {
            const result = await createProfileData();
            console.log(result);

            setProfileData(result.profileData);
            
            setIsSubmitted(true);
            setProfileModalOpen(true);
        } catch (error) {
            console.error('Error creating profile:', error);
            alert(`Profile creation failed: ${error.message}`);
        }
        console.log(profileData);
    };

    const onSubmitWithProfileData = async (event) => {
        event.preventDefault();
        validateRequiredFields();

        if (hasRequiredError) {
            alert('Please fill in all required fields.');
            return;
        }

        setProfileModalOpen(true);

        try {
            console.log('editing profile');
            const result = await editProfileData(inputs);
            console.log(result);

            setProfileData(result.updatedProfile);
           
        } catch (error) {
            console.error('Error updating profile:', error);
            alert(`Profile update failed: ${error.message}`);
        }
    };

    
   

    const handleCloseModal = () => {
        setProfileModalOpen(false);
        setIsEditing(false)
    };
    console.log(requiredFieldError);

    console.log(isEditing);

    const onBlur = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        if (regex.test(value)) {
            setValidationError('');
        }
    };

    const onRequiredBlur = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        if (!isSubmitted) {
            if (!profileData && value === '') {
                setRequiredFieldError(
                    'Please enter a value in required fields.',
                );
                setHasRequiredError(true);
                // Set error if the field is empty
            } else {
                setRequiredFieldError('');
                setHasRequiredError(false); 
            }
        }
    };



  

    useEffect(() => {
        console.log('profileModalOpen changed:', profileModalOpen);
    }, [profileModalOpen]);

    useEffect(() => {
        if (profileModalOpen) {
            setProfileModalOpen(true); // Ensure it stays open if set to true
        }
    }, [profileModalOpen]);
    
    return (
        <div>
            {isEditing && (
                <div>
                    {!profileData && (
                        <p className="pl-10 pb-10 text-2xl text-red font-bold">
                            * Required field
                        </p>
                    )}
                    <div className="flex justify-center w-full px-4 ">
                        <form
                            onSubmit={
                                profileData
                                    ? onSubmitWithProfileData
                                    : handleSubmit
                            }
                            className="w-full p-4 bg-white rounded shadow"
                        >
                            <div className="flex flex-wrap -mx-2">
                                <div className="mb-4 px-2 w-1/4">
                                    <label
                                        htmlFor="firstName"
                                        className="block mb-2 text-sm font-medium text-gray-700"
                                    >
                                        First Name{!profileData && '*'}
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={inputs.firstName}
                                        onChange={handleInputChange}
                                        onBlur={onRequiredBlur}
                                        placeholder="First Name"
                                        className="border rounded px-3 py-2 w-full"
                                    />
                                </div>
                                <div className="mb-4 px-2 w-1/4">
                                    <label
                                        htmlFor="middleName"
                                        className="block mb-2 text-sm font-medium text-gray-700"
                                    >
                                        Middle Name
                                    </label>
                                    <input
                                        type="text"
                                        id="middleName"
                                        name="middleName"
                                        value={inputs.middleName}
                                        onChange={handleInputChange}
                                        placeholder="Middle Name"
                                        className="border rounded px-3 py-2 w-full"
                                    />
                                </div>
                                <div className="mb-4 px-2 w-1/4">
                                    <label
                                        htmlFor="lastName"
                                        className="block mb-2 text-sm font-medium text-gray-700"
                                    >
                                        Last Name{!profileData && '*'}
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={inputs.lastName}
                                        onChange={handleInputChange}
                                        onBlur={onRequiredBlur}
                                        placeholder="Last Name"
                                        className="border rounded px-3 py-2 w-full"
                                    />
                                </div>
                                <div className="mb-4 px-2 w-1/4">
                                    <label
                                        htmlFor="suffix"
                                        className="block mb-2 text-sm font-medium text-gray-700"
                                    >
                                        Suffix
                                    </label>
                                    <input
                                        type="text"
                                        id="suffix"
                                        name="suffix"
                                        value={inputs.suffix}
                                        onChange={handleInputChange}
                                        placeholder="Suffix"
                                        className="border rounded px-3 py-2 w-full"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-2">
                                <div className="mb-4 px-2 w-1/2">
                                    <label
                                        htmlFor="phone"
                                        className="block mb-2 text-sm font-medium text-gray-700"
                                    >
                                        Phone Number{!profileData && '*'}
                                    </label>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={inputs.phoneNumber}
                                        onChange={handleInputChange}
                                        onBlur={onBlur}
                                        placeholder="Phone Number"
                                        className="border rounded px-3 py-2 w-full"
                                    />
                                </div>
                                <div className="mb-4 px-2 w-1/2">
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-700"
                                    >
                                        Email{!profileData && '*'}
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={inputs.email}
                                        onChange={handleInputChange}
                                        onBlur={onRequiredBlur}
                                        placeholder="Email Address"
                                        className="border rounded px-3 py-2 w-full"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-2">
                                <div className="mb-4 px-2 w-1/4">
                                    <label
                                        htmlFor="addressLine1"
                                        className="block mb-2 text-sm font-medium text-gray-700"
                                    >
                                        Address Line 1{!profileData && '*'}
                                    </label>
                                    <input
                                        type="text"
                                        name="addressLine1"
                                        value={inputs.addressLine1}
                                        onChange={handleInputChange}
                                        onBlur={onRequiredBlur}
                                        placeholder="Street Address"
                                        className="border rounded px-3 py-2 w-full"
                                    />
                                </div>
                                <div className="mb-4 px-2 w-1/4">
                                    <label
                                        htmlFor="city"
                                        className="block mb-2 text-sm font-medium text-gray-700"
                                    >
                                        City{!profileData && '*'}
                                    </label>

                                    <input
                                        type="text"
                                        name="city"
                                        value={inputs.city}
                                        onChange={handleInputChange}
                                        onBlur={onRequiredBlur}
                                        placeholder="City"
                                        className="border rounded px-3 py-2 w-full"
                                    />
                                </div>
                                <div className="mb-4 px-2 w-1/4">
                                    <label
                                        htmlFor="state"
                                        className="block mb-2 text-sm font-medium text-gray-700"
                                    >
                                        State{!profileData && '*'}
                                    </label>

                                    <select
                                        className="border rounded px-3 py-2 w-full"
                                        name="state"
                                        value={inputs.state}
                                        onChange={handleInputChange}
                                        onBlur={onRequiredBlur}

                                        // onBlur={handleRequiredBlur}
                                    >
                                        <option value="">-- State --</option>
                                        <option value="AL">AL</option>
                                        <option value="AK">AK</option>
                                        <option value="AZ">AZ</option>
                                        <option value="AR">AR</option>
                                        <option value="CA">CA</option>
                                        <option value="CO">CO</option>
                                        <option value="CT">CT</option>
                                        <option value="DE">DE</option>
                                        <option value="FL">FL</option>
                                        <option value="GA">GA</option>
                                        <option value="HI">HI</option>
                                        <option value="ID">ID</option>
                                        <option value="IL">IL</option>
                                        <option value="IN">IN</option>
                                        <option value="IA">IA</option>
                                        <option value="KS">KS</option>
                                        <option value="KY">KY</option>
                                        <option value="LA">LA</option>
                                        <option value="ME">ME</option>
                                        <option value="MD">MD</option>
                                        <option value="MA">MA</option>
                                        <option value="MI">MI</option>
                                        <option value="MN">MN</option>
                                        <option value="MS">MS</option>
                                        <option value="MO">MO</option>
                                        <option value="MT">MT</option>
                                        <option value="NE">NE</option>
                                        <option value="NV">NV</option>
                                        <option value="NH">NH</option>
                                        <option value="NJ">NJ</option>
                                        <option value="NM">NM</option>
                                        <option value="NY">NY</option>
                                        <option value="NC">NC</option>
                                        <option value="ND">ND</option>
                                        <option value="OH">OH</option>
                                        <option value="OK">OK</option>
                                        <option value="OR">OR</option>
                                        <option value="PA">PA</option>
                                        <option value="RI">RI</option>
                                        <option value="SC">SC</option>
                                        <option value="SD">SD</option>
                                        <option value="TN">TN</option>
                                        <option value="TX">TX</option>
                                        <option value="UT">UT</option>
                                        <option value="VT">VT</option>
                                        <option value="VA">VA</option>
                                        <option value="WA">WA</option>
                                        <option value="WV">WV</option>
                                        <option value="WI">WI</option>
                                        <option value="WY">WY</option>
                                    </select>
                                </div>
                                <div className="mb-4 px-2 w-1/4">
                                    <label
                                        htmlFor="zip"
                                        className="block mb-2 text-sm font-medium text-gray-700"
                                    >
                                        Zip/Postal Code{!profileData && '*'}
                                    </label>

                                    <input
                                        type="number"
                                        name="zip"
                                        value={inputs.zip}
                                        onChange={handleInputChange}
                                        onBlur={onRequiredBlur}
                                        placeholder="Zip/Postal Code"
                                        className="border rounded px-3 py-2 w-full"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-2">
                                <div className="mb-4 px-2 w-1/2">
                                    <label
                                        htmlFor="addressLine2"
                                        className="block mb-2 text-sm font-medium text-gray-700"
                                    >
                                        Address Line 2
                                    </label>
                                    <input
                                        type="text"
                                        name="addressLine2"
                                        value={inputs.addressLine2}
                                        onChange={handleInputChange}
                                        placeholder="Address Line 2"
                                        className="border rounded px-3 py-2 w-full"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label
                                        htmlFor="country"
                                        className="block mb-2 text-sm font-medium text-gray-700"
                                    >
                                        Country
                                    </label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={inputs.country}
                                        onChange={handleInputChange}
                                        placeholder="Country"
                                        className="border rounded px-3 py-2 w-full"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="mb-4 px-2 w-full">
                                    <textarea
                                        id="bio"
                                        name="bio"
                                        value={inputs.bio}
                                        onChange={handleInputChange}
                                        className="w-full h-60 p-4 border-2 border-black rounded focus:outline-none focus:border-blue-500 resize-none "
                                        placeholder="Enter your bio text here..."
                                    />
                                </div>
                            </div>
                            <div className="flex justify-center">
                                {validationError && (
                                    <p className="pl-10 pb-10 text-2xl text-red font-bold">
                                        {validationError}
                                    </p>
                                )}
                                {hasRequiredError && (
                                    <p className="pl-10 pb-10 text-2xl text-red font-bold">
                                        {requiredFieldError}
                                    </p>
                                )}
                                <div className="flex mt-10">
                                    <button className="bg-medium-pale-green hover:bg-green-600 rounded-full w-[204px] h-[43px] text-white font-medium px-6 py-2">
                                        Save
                                    </button>
                                </div>
                            </div>
                           
                        </form>
                        {profileModalOpen && (
                                <ProfileModal
                                    open={profileModalOpen}
                                    handleClose={handleCloseModal}
                                >
                                   
                                    <div className="flex justify-center gap-10">
                                        <button
                                            className="bg-medium-pale-green hover:bg-green-600 rounded-full w-[104px] h-[43px] text-white font-medium px-6 py-2"
                                            onClick={handleCloseModal}
                                        >
                                            OK
                                        </button>
                                    </div>
                                </ProfileModal>
                            )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileEditForm;
