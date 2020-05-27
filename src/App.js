import React from "react";
import Movies from "./components/movies";
import {Route, Switch, Redirect} from "react-router-dom"
import Rentals from "./components/rentals";
import Customers from "./components/customers"
import NavBar from "./components/navbar";
import MovieDetails from "./components/movieDetails"
import NotFound from "./components/notfound";
import LoginForm from "./components/loginForm";
import "./App.css";
import RegisterForm from "./components/registerForm";
import MovieForm from "./components/movieForm"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import jwtDecode from "jwt-decode";
import Logout from "./components/logout"
class App extends React.Component {
	state = {
	}

	componentDidMount() {
		try {
			const jwt = localStorage.getItem("token")
			const user = jwtDecode(jwt)
			this.setState({user})
		}catch (e) {}
	}

	render = () => (
		<div>
			<ToastContainer></ToastContainer>
			<NavBar user={this.state.user}></NavBar>
			<div className="container my-3">
				<Switch>
					<Route path={"/login"} component={LoginForm}></Route>
					<Route path={"/logout"} component={Logout}></Route>
					<Route path={"/register"} component={RegisterForm}></Route>
					<Route path={"/rentals"} component={Rentals}></Route>
					<Route path={"/customers"} component={Customers}></Route>
					<Route path={"/movies/new"} exact render={ props => {
						if (!this.state.user) return <Redirect to={"/login"}></Redirect>
						return <MovieForm {...props}></MovieForm>
					}}></Route>
					<Route path={"/movies/edit/:id"} render={ props => {
						if (!this.state.user) return <Redirect to={"/login"}></Redirect>
						return <MovieForm {...props}></MovieForm>
					}}></Route>
					<Route path={"/movies/:id"} component={MovieDetails}></Route>
					<Route path={"/movies"} render={props => <Movies {...props} user={this.state.user}></Movies>}></Route>
					<Route path={"/not-found"} component={NotFound}></Route>
					<Redirect exact from={"/"} to={"/movies"}></Redirect>
					<Redirect to={"/not-found"}></Redirect>
				</Switch>
			</div>
		</div>

	);
}

export default App;
