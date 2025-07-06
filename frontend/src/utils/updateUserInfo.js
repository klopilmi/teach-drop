// src/utils/updateUserInfo.js
import api from '../api/axios';

export async function updateUserInfo(data) {
    try {
        const response = await api.put('/auth/profile', data); // adjust the URL to your API
        return response.data.user; // assuming your controller returns { message, user }
    } catch (error) {
        console.error('Error updating user info', error);
        throw error;
    }
}
