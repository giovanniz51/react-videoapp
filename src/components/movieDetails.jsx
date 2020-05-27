import React from "react";
import {Link} from "react-router-dom"
export default (props) => (
	<div>
		<h1>Movie - {props.match.params.id} </h1>
		<button className="btn btn-primary" onClick={() => props.history.push("/movies")}>Save</button>
	</div>

)