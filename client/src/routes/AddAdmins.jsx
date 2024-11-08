/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */

//create get request to get all active practitioner profiles
//save in context on FE
//Map over and conditionally render based on if they're adding an existing practitioner or not
import AddAdminsForm from './AddAdminsForm';
import { useState, useContext, useEffect } from 'react';
import { AdminContext } from '../contexts';



const AddAdmins = (userId) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const {  users, getAllUsers } = useContext(AdminContext)




    //create function in admin context which makes put request to 'user/:email/is-admin' route to edit isAdmin on metadata object to true
    //then set isAdmin to true for selected user
    //import into this component and call here on button click

    

 useEffect (() => {
    getAllUsers()
 }, [])

 console.log(users)

    return (
        <div className="flex gap-10 justify-around">
            <div className="flex flex-col justify-center items-center gap-10 border border-black rounded-xl">
                <h2 className="text-2xl">Add New Admins</h2>
                return (
                <button disabled={isAdmin}>
                    {isAdmin ? 'Revoke Admin Access' : 'Promote to Admin'}
                </button>
                );
                <AddAdminsForm />
              
            </div>
            <div className="flex flex-col justify-center items-center gap-10 border border-black rounded-xl">
                <h2 className="text-2xl">Delete Admins</h2>
                <p>Delete admins here</p>
                
            </div>
            <div>
            {users.length > 0 ? (
                <div>
                {/* <h2>{users[0].certListUploadStatus}</h2> */}
                <h2>{users[1].userEmail}</h2>
                </div>
                ) : <div><h2>No users found</h2> </div>}
                </div>
        </div>
    );
};

export default AddAdmins;
