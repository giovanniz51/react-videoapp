import httpService from "./httpService";

export function getGenres() {
	return httpService.get("/genres")
}

export function findGenre(id){
	httpService.get("/genres").then(data => data.data.find(g => g._id == id))
}
