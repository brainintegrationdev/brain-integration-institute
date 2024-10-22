/* eslint-disable react/prop-types */

import { UserContext } from '../contexts';
// import { useState } from 'react'
import { useProfileForm } from '../hooks'; // Import the custom hook

export const UserProvider = ({ children }) => {

    const initialValues = {
        firstName: '',
        middleName: '',
        lastName: '',
        suffix: '',
        phoneNumber: '',
        email: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
    };


    const { 
        inputs, 
        handleInputChange, 
        createProfileData, 
        resetInputs 
    } = useProfileForm(initialValues)
    // Initialize the custom hook and get the values
  
    // const [inputs, setInputs] = useState(initialValues);

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setInputs((prevInputs) => ({
    //         ...prevInputs,
    //         [name]: value,
    //     }));
    // };
 



    // Pass the values from the custom hook to the context provider
    return (
        <UserContext.Provider
            value={{
                inputs,
                handleInputChange,
                createProfileData,
                resetInputs,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
