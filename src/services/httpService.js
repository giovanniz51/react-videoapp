import axios from "axios";
import {toast} from "react-toastify"
import logService from "./logService";

axios.defaults.baseURL = process.env.REACT_APP_API_URL
axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token")

axios.interceptors.response.use(null, e => {
	const expectedError = e.response && e.response.status >= 400 && e.response.status < 500
	if(!expectedError) {
		logService.log(e)
		toast.error("An unexpected error occurred");
	}

	return Promise.reject(e)
})

export default {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	delete: axios.delete
}