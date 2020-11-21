import React from 'react';

// Importing style
import './style.css';

// Form Button

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


















