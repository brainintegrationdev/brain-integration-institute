import {  useContext } from 'react';
import { UserContext } from '../contexts';

export const ProfileEditForm = (props) => {

    const { inputs, handleInputChange, createProfileData } =
    useContext(UserContext);
    const {isEditing, setIsEditing} = props

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await createProfileData();
            console.log('Profile created successfully');
            setIsEditing(false)
        } catch (error) {
            console.error('Error creating profile:', error);
            alert(`Profile creation failed: ${error.message}`);
        }
    };

    const onRequiredBlur = () => {
        console.log("this is a required field")
    }
    return (
        <>
            <p className="pl-10 pb-10 text-2xl text-red font-bold">
                * Required field
            </p>
            <div className="flex justify-center w-full px-4 ">
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
                                value={inputs.middleName}
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
                                value={inputs.phoneNumber}
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
                        <div className="mb-4 px-2 w-1/4">
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
                                onChange={handleInputChange}
                                placeholder="Street Address"
                                className="border rounded px-3 py-2 w-full"
                            />
                        </div>
                        <div className="mb-4 px-2 w-1/4">
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
                        <div className="mb-4 px-2 w-1/4">
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
                                Zip/Postal Code*
                            </label>

                            <input
                                type="number"
                                name="zip"
                                value={inputs.zip}
                                onChange={handleInputChange}
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
                        <textarea
                            id="bio"
                            name="bio"
                            value={inputs.bio}
                            onChange={handleInputChange}
                            className="w-1/2 h-60 p-4 border-2 border-black rounded focus:outline-none focus:border-blue-500 resize-none"
                            placeholder="Enter your bio text here..."
                        />
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
        </>
    );
};

export default ProfileEditForm;
