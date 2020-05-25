import React from "react";
import "./App.css";
import Movies from "./components/movies";

class App extends React.Component{
	
	render = () => (
		<main role="main" className="container">
			<div className="starter-template row">
				<h1>Vidly</h1>
				<div className="col-12">
					<Movies></Movies>
				</div>
			</div>
		</main>
	);
}

export default App;
