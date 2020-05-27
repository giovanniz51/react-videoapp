import React from "react";

export default ({name, label, error, extra, type, ...props}) => (
	<div className="form-group">
		<label htmlFor={name}>{label}</label>
		{type !== "select" ? <input name={name} type={type} {...props} className="form-control" id={name}/> :
			extra && <select className="form-control" name={name} id={name} {...props}>
				{extra.map(e => <option key={e._id} value={e._id}>{e.name}</option>)}
			</select>
		}
		{error && <div className="alert alert-danger">{error}</div>}
	</div>
)