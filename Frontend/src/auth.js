export const getAuth = () => {
    return {
        token: localStorage.getItem('token'),
        role: localStorage.getItem('role')
    }
}