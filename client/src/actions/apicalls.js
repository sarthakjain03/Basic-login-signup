import axios from "axios"

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_HOST}/login`, {email, password})
        // console.log(response.data);
        if(response.data === "Incorrect Password"){
            alert("Incorrect Password")
            return null;
        } else if(response.data === "Email not registered"){
            alert("This email is not registered")
            return null;
        } else {
            const token = response.data.token;
            localStorage.setItem('savedToken', 'Bearer ' + token)
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

            const { data } = await axios.get(`${import.meta.env.VITE_HOST}/user`, {headers: {Authorization: localStorage.getItem('savedToken')}})
            // console.log(data);
            return data;
        }

    } catch (err) {
        console.log(err)
    }
}

export const signup = async (name, email, gender, phone, password) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_HOST}/signup`, {name, email, gender, phone, password})
        // console.log(response.data);
        if(response.data === "Email registered"){
            alert("This email is already registered")
            return null;
        } else {
            const token = response.data.token;
            localStorage.setItem('savedToken', 'Bearer ' + token)
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

            alert("Successfully registered!")

            const { data } = await axios.get(`${import.meta.env.VITE_HOST}/user`, {headers: {Authorization: localStorage.getItem('savedToken')}})
            // console.log(data);
            return data;
        }

    } catch (err) {
        console.log(err)
    }
}

export const logout = () => {
    try {
        localStorage.removeItem('savedToken')
        console.log("Token removed from local storage.");

    } catch (err) {
        console.log(err);
    }
}