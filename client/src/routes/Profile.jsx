import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { useState, useContext } from 'react';
import banner from '../assets/icons/PractitionerBackground.png';
import paleBanner from '../assets/icons/PaleGreenPractitionerBackground.png';
import ProfilePhotoUpload from '../components/ProfilePhotoUpload';
import unlock from '../assets/icons/unlock.png';
import { UserContext } from '../contexts';
// import Navbar from '../components/header/Navbar'
// import { About } from "../components/About";

export const Profile = withAuthenticationRequired((props) => {
    const { user } = useAuth0();
    const {
        inputs,
        handleInputChange,
        createProfileData,
        resetInputs,
    } = useContext(UserContext);
   
    const [validationError, setValidationError] = useState('');
    const [requiredFieldError, setRequiredFieldError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [sectionName, setSectionName] = useState(null);
    const {
        firstName,
        middleName,
        lastName,
        suffix,
        phoneNumber,
        email,
        addressLine1,
        addressLine2,
        city,
        state,
        country,
    } = props;

    // const cld = new Cloudinary({
    //     cloud: {
    //         cloudName: 'dw1ktiayz',
    //     },
    // });

    console.log(inputs);

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     console.log(name, value);

    //     setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
    // };

    const handleTabClick = (section) => {
        setSectionName(section);
    };

    console.log(sectionName);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await createProfileData();
            console.log('Profile created successfully:', result);
        } catch (error) {
            console.error('Error creating profile:', error);
        }
    };

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
            <div className="flex flex-col   border-[2px] border-black px-10">
                <div className="flex justify-center ">
                    <div className=" flex justify-between gap-[27px] h-[49px] w-[771px] border-[2px] p-[4px] border-gray rounded-[6.831px] bg-white mb-20  shadow-[inset_0px_4.554px_4.554px_rgba(0,0,0,0.25)]">
                        <button
                            id="profile"
                            onClick={() => handleTabClick('profile')}
                            className={
                                sectionName === 'profile'
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
                        <h3 className="font-poppins text-2xl"> {user.name}</h3>
                        {!sectionName ||
                            (sectionName === 'profile' && (
                                <div>
                                    <div className=" flex flex-col pl-4 text-center  justify-start gap-10 pb-20 ">
                                        <h2 className="font-fira text-3xl ">
                                            My Profile
                                        </h2>
                                        <h3 className="font-fira text-black text-xl text-opacity-60">
                                            Set your account settings down below
                                        </h3>
                                    </div>
                                    <div className="flex justify-end pb-20 gap-10">
                                        <img src={unlock} />
                                        <button className="bg-medium-pale-green rounded-2xl w-[204px] h-[43px] text-white">
                                            Edit
                                        </button>
                                    </div>
                                    <div className="flex justify-center w-full border black px-4 ">
                                        <form
                                            onSubmit={handleSubmit}
                                            className="w-full  p-4 bg-white rounded shadow"
                                        >
                                            <div className="flex flex-wrap -mx-2">
                                                <div className="mb-4 px-2 w-1/4">
                                                    <label
                                                        htmlFor="firstName"
                                                        className="block mb-2 text-sm font-medium text-gray-700"
                                                    >
                                                        First Name*
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
                                                        value={
                                                            inputs.middleName
                                                        }
                                                        onChange={handleInputChange}
                                                        onBlur={onRequiredBlur}
                                                        placeholder="Middle Name"
                                                        className="border rounded px-3 py-2 w-full"
                                                    />
                                                </div>
                                                <div className="mb-4 px-2 w-1/4">
                                                    <label
                                                        htmlFor="lastName"
                                                        className="block mb-2 text-sm font-medium text-gray-700"
                                                    >
                                                        Last Name*
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
                                                        Phone Number*
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        name="phoneNumber"
                                                        value={
                                                            inputs.phoneNumber
                                                        }
                                                        onChange={handleInputChange}
                                                        placeholder="Phone Number"
                                                        className="border rounded px-3 py-2 w-full"
                                                    />
                                                </div>
                                                <div className="mb-4 px-2 w-1/2">
                                                    <label
                                                        htmlFor="email"
                                                        className="block mb-2 text-sm font-medium text-gray-700"
                                                    >
                                                        Email*
                                                    </label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={inputs.email}
                                                        onChange={handleInputChange}
                                                        placeholder="Email Address"
                                                        className="border rounded px-3 py-2 w-full"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap -mx-2">
                                                <div className="mb-4 px-2 w-1/3">
                                                    <label
                                                        htmlFor="addressLine1"
                                                        className="block mb-2 text-sm font-medium text-gray-700"
                                                    >
                                                        Address Line 1*
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="addressLine1"
                                                        value={
                                                            inputs.addressLine1
                                                        }
                                                        onChange={handleInputChange}
                                                        placeholder="Street Address"
                                                        className="border rounded px-3 py-2 w-full"
                                                    />
                                                </div>
                                                <div className="mb-4 px-2 w-1/3">
                                                    <label
                                                        htmlFor="city"
                                                        className="block mb-2 text-sm font-medium text-gray-700"
                                                    >
                                                        City*
                                                    </label>

                                                    <input
                                                        type="text"
                                                        name="city"
                                                        value={inputs.city}
                                                        onChange={handleInputChange}
                                                        placeholder="City"
                                                        className="border rounded px-3 py-2 w-full"
                                                    />
                                                </div>
                                                <div className="mb-4 px-2 w-1/3">
                                                    <label
                                                        htmlFor="state"
                                                        className="block mb-2 text-sm font-medium text-gray-700"
                                                    >
                                                        State*
                                                    </label>

                                                    <select
                                                        className="border rounded px-3 py-2 w-full"
                                                        name="state"
                                                        value={inputs.state}
                                                        onChange={handleInputChange}

                                                        // onBlur={handleRequiredBlur}
                                                    >
                                                        <option value="">
                                                            -- State --
                                                        </option>
                                                        <option value="AL">
                                                            AL
                                                        </option>
                                                        <option value="AK">
                                                            AK
                                                        </option>
                                                        <option value="AZ">
                                                            AZ
                                                        </option>
                                                        <option value="AR">
                                                            AR
                                                        </option>
                                                        <option value="CA">
                                                            CA
                                                        </option>
                                                        <option value="CO">
                                                            CO
                                                        </option>
                                                        <option value="CT">
                                                            CT
                                                        </option>
                                                        <option value="DE">
                                                            DE
                                                        </option>
                                                        <option value="FL">
                                                            FL
                                                        </option>
                                                        <option value="GA">
                                                            GA
                                                        </option>
                                                        <option value="HI">
                                                            HI
                                                        </option>
                                                        <option value="ID">
                                                            ID
                                                        </option>
                                                        <option value="IL">
                                                            IL
                                                        </option>
                                                        <option value="IN">
                                                            IN
                                                        </option>
                                                        <option value="IA">
                                                            IA
                                                        </option>
                                                        <option value="KS">
                                                            KS
                                                        </option>
                                                        <option value="KY">
                                                            KY
                                                        </option>
                                                        <option value="LA">
                                                            LA
                                                        </option>
                                                        <option value="ME">
                                                            ME
                                                        </option>
                                                        <option value="MD">
                                                            MD
                                                        </option>
                                                        <option value="MA">
                                                            MA
                                                        </option>
                                                        <option value="MI">
                                                            MI
                                                        </option>
                                                        <option value="MN">
                                                            MN
                                                        </option>
                                                        <option value="MS">
                                                            MS
                                                        </option>
                                                        <option value="MO">
                                                            MO
                                                        </option>
                                                        <option value="MT">
                                                            MT
                                                        </option>
                                                        <option value="NE">
                                                            NE
                                                        </option>
                                                        <option value="NV">
                                                            NV
                                                        </option>
                                                        <option value="NH">
                                                            NH
                                                        </option>
                                                        <option value="NJ">
                                                            NJ
                                                        </option>
                                                        <option value="NM">
                                                            NM
                                                        </option>
                                                        <option value="NY">
                                                            NY
                                                        </option>
                                                        <option value="NC">
                                                            NC
                                                        </option>
                                                        <option value="ND">
                                                            ND
                                                        </option>
                                                        <option value="OH">
                                                            OH
                                                        </option>
                                                        <option value="OK">
                                                            OK
                                                        </option>
                                                        <option value="OR">
                                                            OR
                                                        </option>
                                                        <option value="PA">
                                                            PA
                                                        </option>
                                                        <option value="RI">
                                                            RI
                                                        </option>
                                                        <option value="SC">
                                                            SC
                                                        </option>
                                                        <option value="SD">
                                                            SD
                                                        </option>
                                                        <option value="TN">
                                                            TN
                                                        </option>
                                                        <option value="TX">
                                                            TX
                                                        </option>
                                                        <option value="UT">
                                                            UT
                                                        </option>
                                                        <option value="VT">
                                                            VT
                                                        </option>
                                                        <option value="VA">
                                                            VA
                                                        </option>
                                                        <option value="WA">
                                                            WA
                                                        </option>
                                                        <option value="WV">
                                                            WV
                                                        </option>
                                                        <option value="WI">
                                                            WI
                                                        </option>
                                                        <option value="WY">
                                                            WY
                                                        </option>
                                                    </select>
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
                                                        value={
                                                            inputs.addressLine2
                                                        }
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
                                            <div className="flex justify-center">
                                                <div className="flex mt-10">
                                                    <button className="btn bg-light-green rounded-xl text-white h-12 w-[493px]">
                                                        Save
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            ))}
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
                            <div className="flex flex-col items-center justify-center gap-10 w-1/2">
                                <h1>
                                    Cerebrum ipsum dolor sit amet, neural
                                    pathways connecting dendrites to synapses.
                                    Hippocampus et cortex lobus,
                                    neurotransmitters facilisis enhancing
                                    cognitive plasticity. Vestibulum ante ipsum
                                    primis in faucibus orci luctus et ultrices
                                    posuere cubilia Curae; dopamine in pulvinar
                                    nisl, ultricies efficitur massa.
                                    Neurogenesis non fermentum, lobus frontalis
                                    vulputate amygdala arcu sollicitudin sapien.
                                    Integer pharetra sagittis sapien, non tempus
                                    arcu dictum eu. Lorem cerebri dapibus, sed
                                    malesuada lobortis neuroplasticity
                                    facilisis. Vestibulum ante ipsum primis,
                                    synaptic vesicles release endorphins.
                                    Medulla at enim non arcu mollis, sagittis
                                    tempor sapien cursus. Serotonin elementum
                                    gravida pulvinar. Fusce potenti. Vestibulum
                                    mattis efficitur, ac neurotransmitter libero
                                    consectetur adipiscing.
                                </h1>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});
