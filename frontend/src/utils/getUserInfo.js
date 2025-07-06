import api from "../api/axios";

export async function fetchAuthenticatedUser() {
    try {
        const response = await api.get('/auth/user');
        return response.data;
    } catch (error) {
        console.error('Error fetching authenticated user:', error);
        throw error;
    }
}
