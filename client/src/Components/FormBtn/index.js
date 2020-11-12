import React from 'react';

export default function FormBtn(props) {
	return (
		<button
			{...props}
			style={{ float: 'center', marginBottom: 0, marginTop: 10 }}
			className="btn btn-primary"
		>
			{props.children}
		</button>
	);
}
