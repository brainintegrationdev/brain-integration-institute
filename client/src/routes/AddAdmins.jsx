/* eslint-disable react/no-unescaped-entities */

//create get request to get all active practitioner profiles
//save in context on FE
//Map over and conditionally render based on if they're adding an existing practitioner or not
import AddAdminsForm from './AddAdminsForm';
import { useState, useContext } from 'react';
import { AdminContext } from '../contexts';



const AddAdmins = (userId) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const { updateUserToAdmin } = useContext(AdminContext)

    const handlePromote = async () => {
        try {
            await updateUserToAdmin(userId);
            setIsAdmin(true); // Update UI to reflect new admin status
            alert('User promoted to admin!');
        } catch (error) {
            console.error('Failed to promote user to admin:', error);
        }
    };

    return (
        <div className="flex gap-10 justify-around">
            <div className="flex flex-col justify-center items-center gap-10 border border-black rounded-xl">
                <h2 className="text-2xl">Add New Admins</h2>
                return (
                <button onClick={handlePromote} disabled={isAdmin}>
                    {isAdmin ? 'User is Admin' : 'Promote to Admin'}
                </button>
                );
                <AddAdminsForm />
              
            </div>
            <div className="flex flex-col justify-center items-center gap-10 border border-black rounded-xl">
                <h2 className="text-2xl">Delete Admins</h2>
                <p>Delete admins here</p>
            </div>
        </div>
    );
};

export default AddAdmins;
