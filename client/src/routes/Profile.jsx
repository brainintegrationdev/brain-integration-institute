import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { useState } from 'react';
import { ExampleFileList } from '../components/ExampleFileList';
import { ExampleFileUploadForm } from '../components/ExampleFileUploadForm';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import banner from '../assets/icons/PractitionerBackground.png';
import paleBanner from '../assets/icons/PaleGreenPractitionerBackground.png';
import ProfilePhotoUpload from '../components/ProfilePhotoUpload';
import professionalPageTab from '../assets/icons/Professionalpagetab.png';
import profileTab from '../assets/icons/Profiletab.png';
import passwordTab from '../assets/icons/Passwordtab.png';
// import Navbar from '../components/header/Navbar'
// import { About } from "../components/About";

export const Profile = withAuthenticationRequired((props) => {
    const { user } = useAuth0();
    const initInputs = {
        firstName: props.firstName || '',
        middleName: props.middleName || '',
        lastName: props.lastName || '',
        suffix: props.suffix || '',
        phoneNumber: props.phoneNumber || '',
        email: props.email || '',
        addressLine1: props.addressLine1 || '',
        addressLine2: props.addressLine2 || '',
        city: props.city || '',
        state: props.state || '',
        country: props.country || '',
    };
    const [inputs, setInputs] = useState(initInputs);
    const [validationError, setValidationError] = useState('');
    const [requiredFieldError, setRequiredFieldError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
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

    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dw1ktiayz',
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);

        setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // getUserSauces();
        setIsSubmitted(true);
        console.log('submitted profile information');
        setInputs({
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
        });
        setValidationError('');
        // getUserSauces();
        // addSauce(inputs);
        // handleOpenModal();
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
        <>
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
            <div className="flex justify-center">
                <div className="inline-flex justify-center border-[2px] border-gray rounded-[6.831px] bg-white mb-20 shadow-[inset_0px_4.554px_4.554px_rgba(0,0,0,0.25)]">
                    <button>
                        <img src={profileTab} className="m-2" />
                    </button>
                    <button>
                        <img src={passwordTab} className="m-2" />
                    </button>
                    <button>
                        <img src={professionalPageTab} className="m-2" />
                    </button>
                </div>
            </div>
            <div className="flex">
                <div className="flex flex-col px-[200px]">
                    <ProfilePhotoUpload />
                    <h3 className="font-poppins text-2xl"> {user.name}</h3>
                </div>
                <div className="flex flex-col pl-[300px] text-center gap-10">
                    <h2 className="font-fira text-3xl">My Profile</h2>
                    <h3 className="font-fira text-black text-xl text-opacity-60">
                        Set your account settings down below
                    </h3>
               
                    <div className="flex justify-center">
                    <form onSubmit={handleSubmit} className="w-full max-w-md p-4 bg-white rounded shadow">
                       
                        <div className="flex space-x-4">
                            <div className="mb-4">
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
                                    onChange={handleChange}
                                    onBlur={onRequiredBlur}
                                    placeholder="First Name"
                                    className="border rounded px-3 py-2 w-full"
                                />
                            </div>
                            <div className="mb-4">
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
                                    onChange={handleChange}
                                    onBlur={onRequiredBlur}
                                    placeholder="Middle Name"
                                    className="border rounded px-3 py-2 w-full"
                                />
                            </div>
                            <div className="mb-4">
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
                                    onChange={handleChange}
                                    onBlur={onRequiredBlur}
                                    placeholder="Last Name"
                                    className="border rounded px-3 py-2 w-full"
                                />
                            </div>
                            <div className="mb-4">
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
                                    onChange={handleChange}
                                    placeholder="Suffix"
                                    className="border rounded px-3 py-2 w-full"
                                />
                            </div>
                        </div>
                        <div className="flex space-x-4">
                        <div className="mb-4">
                                <label
                                    htmlFor="phone"
                                    className="block mb-2 text-sm font-medium text-gray-700"
                                >
                                    Phone Number*
                                </label>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={inputs.phoneNumber}
                                    onChange={handleChange}
                                    placeholder="Phone Number"
                                    className="border rounded px-3 py-2 w-full"
                                />
                            </div>
                            <div className="mb-4">
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
                                    onChange={handleChange}
                                    placeholder="Email Address"
                                    className="border rounded px-3 py-2 w-full"
                                />
                            </div>
                        </div>
                        <div className="flex space-x-4">
                        <div className="mb-4">
                                <label
                                    htmlFor="addressLine1"
                                    className="block mb-2 text-sm font-medium text-gray-700"
                                >
                                    Address Line 1*
                                </label>
                                <input
                                    type="text"
                                    name="addressLine1"
                                    value={inputs.addressLine1}
                                    onChange={handleChange}
                                    placeholder="Street Address"
                                    className="border rounded px-3 py-2"
                                />
                            </div>
                            <div className="mb-4">
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
                                    onChange={handleChange}
                                    placeholder="City"
                                    className="border rounded px-3 py-2"
                                />
                            </div>
                            <div className="mb-4 w-full">
                                <label
                                    htmlFor="state"
                                    className="block mb-2 text-sm font-medium text-gray-700 w-full"
                                >
                                    State*
                                </label>

                                <select
                                    className="border rounded px-3 py-2 w-full"
                                    name="state"
                                    value={inputs.state}
                                    onChange={handleChange}

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
                        </div>
                        <div className="flex space-x-4">
                        <div className="mb-4">
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
                                    onChange={handleChange}
                                    placeholder="Address Line 2"
                                    className="border rounded px-3 py-2"
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
                                    onChange={handleChange}
                                    placeholder="Country"
                                    className="border rounded px-3 py-2"
                                />
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <div className="flex-1">
                                <button className="btn bg-light-green rounded-xl text-white h-12 w-[300px]">
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </>
    );
});
