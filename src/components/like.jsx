import React from "react";

export default ({ liked, onLike, id }) => (
	<i
		onClick={() => onLike(id)}
		className={liked ? "fa fa-heart" : "fa fa-heart-o"}
		aria-hidden="true"
		style={{ cursor: "pointer" }}
	></i>
);
