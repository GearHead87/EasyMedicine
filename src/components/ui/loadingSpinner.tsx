import React from 'react';

const LoadingSpinner = ({ size = 24, color = 'white' }) => {
	const radius = size / 2 - 2; // Calculate radius based on size
	return (
		<svg
			width={size}
			height={size}
			viewBox={`0 0 ${size} ${size}`}
			xmlns="http://www.w3.org/2000/svg"
		>
			<g className="spinner_V8m1">
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					fill="none"
					strokeWidth={size / 12} // Adjust stroke width relative to size
					stroke={color} // Set stroke color to white
				></circle>
			</g>
		</svg>
	);
};

export default LoadingSpinner;
