/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios'
export default function ViewFileModal({ open, onClose, children }) {
    const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();
    useEffect(() => {
        if (open) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [open]);

    const getSectionFile = async () => {
        try {
            const accessToken = await getAccessTokenSilently();

            const response = await axios.get(
                `http://localhost:8080/api/images/${user.nickname}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    };

    
    return (
        <div
            onClick={onClose}
            className={`fixed inset-0 flex justify-center items-center transition-colors ${
                open ? 'visible bg-black/20' : 'invisible bg-transparent'
            }`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`bg-white rounded-md shadow-lg p-6 transition-all ${
                    open ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
                }`}
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 p-1 rounded- text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
                ></button>
                {children}
            </div>
        </div>
    );
}
