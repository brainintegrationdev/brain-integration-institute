/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { AdminContext } from '../contexts';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react'

export const AdminProvider = ({ children }) => {
    const {
        loginWithRedirect,
        logout,
        isAuthenticated,
        user,
        getAccessTokenSilently,
    } = useAuth0();

    const [users, setUsers] = useState([])
    const [profiles, setProfiles] = useState([])

    const getManagementToken = async () => {
        const response = await axios.post(
            `https://${import.meta.env.VITE_AUTH0_DOMAIN}/oauth/token`,
            {
                client_id: import.meta.env.VITE_AUTH0_M2M_CLIENT_ID,
                client_secret: import.meta.env.VITE_AUTH0_CLIENT_SECRET,
                audience: `https://${
                    import.meta.env.VITE_AUTH0_DOMAIN
                }/api/v2/`,
                grant_type: 'client_credentials',
            },
        );

        return response.data.access_token;
    };

    async function getAllUsers() {
        // const token = await getManagementToken();
        try {
            const accessToken = await getAccessTokenSilently();
            const response = await axios.get(
                `http://localhost:8080/api/user`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    params: {
                        per_page: 50,
                        page: 0,
                    },
                },
            );
            setUsers(response.data)
            return users
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    const updateUserToAdmin = async (userId) => {
        const token = await getManagementToken();
        try {
            const response = await axios.patch(
                `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${userId}`,
                {
                    app_metadata: { isAdmin: true },
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            console.log('User promoted to admin:', response.data);
        } catch (error) {
            console.error('Error updating user metadata:', error);
        }
    };
    return (
        <AdminContext.Provider
            value={{ updateUserToAdmin, getManagementToken, getAllUsers, users, setUsers }}
        >
            {children}
        </AdminContext.Provider>
    );
};
