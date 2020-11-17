import React from 'react';
import './style.css';

export default function FormBtn(props) {
	return (
		<button
			{...props}
			style={{ float: 'center', marginBottom: 0, marginTop: 10,marginRight:5 }}
			className="btn btnColor"
		>
			{props.children}
		</button>
	);
}


















