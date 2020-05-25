import React from "react"

class GenreList extends React.Component {
    
    render() {
        const {genres, onGenreChange, selected, text, value} = this.props;
        return (
            <ul className="list-group">
                <li onClick={() => onGenreChange("all")} className={!selected ? "list-group-item active" : "list-group-item"}>All Genres</li>
                {genres.map(g => (
                <li 
                    key={g[value]} 
                    className={selected[value] == g[value] ? "list-group-item active" : "list-group-item"}
                    onClick={() => onGenreChange(g)}>{g[text]}</li>
                ))}
            </ul>    
        )
    }
    
    
}

GenreList.defaultProps = {
    text: "name",
    value: "_id"
}

export default GenreList