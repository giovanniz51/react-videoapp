import React from "react"
import Like from "./like";

import TableHeader from "./tableHeader";

class MoviesTable extends React.Component {
	columns = [
		{path: "title", label: "Title"},
		{path: "genre.name", label: "Genre"},
		{path: "numberInStock", label: "Stock"},
		{path: "dailyRentalRate", label: "Rate"},
		{key: "like"},
		{key: "delete"}
	]
    
    renderMovies = () => {
       const {m, onLike, onDelete, selectedGenre} = this.props
        
		if(!selectedGenre){
			return m.map((m) => (
				<tr key={m._id}>
    		<td>{m.title}</td>
    		<td>{m.genre.name}</td>
    		<td>{m.numberInStock}</td>
    		<td>{m.dailyRentalRate}</td>
    		<td>
    			<Like liked={m.liked} id={m._id} onLike={onLike}></Like>
    		</td>
    		<td>
    			<button
    				onClick={() => onDelete(m._id)}
    				className="btn btn-danger"
    			>
    				Delete
    			</button>
    		</td>
        </tr>
			));
		}
		
		return m.filter(m => m.genre._id == selectedGenre._id).map((m) => (
			<tr key={m._id}>
    		<td>{m.title}</td>
    		<td>{m.genre.name}</td>
    		<td>{m.numberInStock}</td>
    		<td>{m.dailyRentalRate}</td>
    		<td>
    			<Like liked={m.liked} id={m._id} onLike={onLike}></Like>
    		</td>
    		<td>
    			<button
    				onClick={() => onDelete(m._id)}
    				className="btn btn-danger"
    			>
    				Delete
    			</button>
    		</td>
        </tr>
		));

	
	};
	
    render = () =>  {
        const {onSort, sortColumn} = this.props
    	return (<table className="table table-hover">
            <TableHeader columns={this.columns} onSort={onSort} sortColumn={sortColumn}/>
    		<tbody>{this.renderMovies()}</tbody>
		</table>)  
    }
    
    
}

export default MoviesTable