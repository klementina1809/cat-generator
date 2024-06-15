import React from "react";

function Select({ onChange, value, data }) {
	return (
		<select name="cat-tag" id="cat-tag" onChange={onChange} value={value}>
			<option value="" disabled hidden>
				Choose category
			</option>
			{data.map((tag) => (
				<option key={tag} value={tag}>
					{tag}
				</option>
			))}
		</select>
	);
}

export default Select;
