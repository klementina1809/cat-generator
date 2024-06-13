import React from "react";

function Image({ data, count }) {
	return <div>{data && <img src={data + "?a=" + count} alt="Cat" />}</div>;
}

export default Image;
