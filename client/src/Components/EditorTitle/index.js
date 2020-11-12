import React from 'react';

export default function Input(props) {
	return (
		<div className="form-group">
			<input
				className="form-control"
				rows="20"
				{...props}
			/>
		</div>
	);
}
