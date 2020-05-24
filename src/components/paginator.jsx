import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

class Paginator extends Component {
	state = {};

	renderPages() {
		const { itemsCount, pageSize, currentPage } = this.props;
		const pagesCount = Math.ceil(itemsCount / pageSize);
		if (pagesCount == 0) return null;

		return _.range(1, pagesCount + 1).map((p, i) => (
			<li
				key={i}
				className={p == currentPage ? "page-item active" : "page-item"}
			>
				<a
					className="page-link"
					href="#"
					onClick={(event) => this.props.onPaginate(event, p)}
				>
					{p}
				</a>
			</li>
		));
	}

	render() {
		return (
			<nav aria-label="Page navigation example">
				<ul className="pagination">{this.renderPages()}</ul>
			</nav>
		);
	}
}

Paginator.propTypes = {
	itemsCount: PropTypes.number.isRequired,
	pageSize: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	onPaginate: PropTypes.func.isRequired,
};

export default Paginator;
