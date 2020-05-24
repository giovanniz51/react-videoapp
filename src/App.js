import React from "react";
import "./App.css";
import Movies from "./components/movies";

function App() {
	return (
		<main role="main" className="container">
			<div className="starter-template">
				<h1>Vidly</h1>
				<Movies></Movies>
			</div>
		</main>
	);
}

export default App;
