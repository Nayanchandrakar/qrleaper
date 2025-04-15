// Utility function to create an SVG rect element
const createRect = (): SVGRectElement =>
	document.createElementNS("http://www.w3.org/2000/svg", "rect");

// Enum for decoration positions
enum Position {
	top = "top",
	bottom = "bottom",
	left = "left",
	right = "right",
}

// Enum for decoration types
enum DecorationType {
	text = "text",
	image = "image",
}

// Attribute object type
interface Attributes {
	[key: string]: string | number;
}

// Border options type
interface BorderOptions {
	color: string;
	thickness: number;
	dasharray?: string;
	borderInner?: BorderOptions;
	borderOuter?: BorderOptions;
}

// Decoration object type
interface Decoration {
	type: DecorationType;
	value: string;
	style?: string;
}

// Main configuration type for borders
interface BorderConfig {
	width: number;
	height: number;
	round: number;
	thickness: number;
	decorations?: { [key in Position]?: Decoration };
}

// Function to set attributes on an SVG element
const setAttributes = <T extends SVGElement>(
	element: T,
	attributes: Attributes,
): T => {
	Object.keys(attributes).forEach((key) => {
		element.setAttribute(key, `${attributes[key]}`);
	});
	return element;
};

// Function to compute border attributes
const getBorderAttributes = ({
	width,
	height,
	options,
	round,
}: {
	width: number;
	height: number;
	options: BorderOptions;
	round: number;
}): Attributes => {
	const size = Math.min(width, height);
	return {
		fill: "none",
		x: (width - size + options.thickness) / 2,
		y: (height - size + options.thickness) / 2,
		width: size - options.thickness,
		height: size - options.thickness,
		stroke: options.color,
		"stroke-width": options.thickness,
		"stroke-dasharray": options.dasharray || "",
		rx: Math.max(0, (size / 2) * round - options.thickness / 2),
	};
};

// Add text decorations to the border
const addTextDecoration = ({
	thickness,
	value,
	svg,
	position,
	height,
	width,
	round,
	style,
}: {
	thickness: number;
	value: string;
	svg: SVGSVGElement;
	position: Position;
	height: number;
	width: number;
	round: number;
	style?: string;
}): void => {
	let rotate = 0;
	let flip = false;

	if (position === Position.right) rotate = 90;
	else if (position === Position.bottom) flip = true;
	else if (position === Position.left) {
		rotate = 90;
		flip = true;
	}

	svg.getElementsByTagName("defs")[0].appendChild(
		(({ position, rotate, flip, thickness, height, width, round }) => {
			const size = Math.min(width, height);
			const path = document.createElementNS(
				"http://www.w3.org/2000/svg",
				"path",
			);
			const cornerRadius = ((size - thickness) / 2) * round;
			let transform = "";

			if (rotate) transform += `rotate(${rotate},${width / 2},${height / 2}) `;
			if (flip) transform += `scale(1 -1) translate(0 ${-height}) `;

			path.setAttribute("id", `${position}-text-path`);
			path.setAttribute("transform", transform);
			path.setAttribute(
				"d",
				`
              M${(width - size + thickness) / 2},${
								(height - size + thickness) / 2 + cornerRadius
							}
              a${cornerRadius},${cornerRadius} 0 0 1 ${cornerRadius},${-cornerRadius}
              h${size - thickness - 2 * cornerRadius}
              a${cornerRadius},${cornerRadius} 0 0 1 ${cornerRadius},${cornerRadius}
            `,
			);

			return path;
		})({ position, rotate, flip, thickness, height, width, round }),
	);

	svg.appendChild(
		(({ value, rotate, position, style }) => {
			const textElement = document.createElementNS(
				"http://www.w3.org/2000/svg",
				"text",
			);
			const textPath = document.createElementNS(
				"http://www.w3.org/2000/svg",
				"textPath",
			);

			textPath.setAttribute("href", `#${position}-text-path`);
			textPath.setAttribute("text-anchor", "middle");
			textPath.setAttribute("startOffset", "50%");
			textPath.textContent = value;
			textPath.setAttribute("alignment-baseline", "central");

			textElement.setAttribute("rotate", `-${rotate}`);
			textElement.setAttribute("style", style || "");
			textElement.appendChild(textPath);

			return textElement;
		})({ position, rotate, value, style }),
	);
};

// Add image decorations to the border
const addImageDecoration = ({
	thickness,
	value,
	svg,
	position,
	height,
	width,
	style,
}: {
	thickness: number;
	value: string;
	svg: SVGSVGElement;
	position: Position;
	height: number;
	width: number;
	style?: string;
}): void => {
	const image = document.createElementNS("http://www.w3.org/2000/svg", "image");
	const size = Math.min(width, height);
	let x = (width - size + thickness) / 2;
	let y = (height - size + thickness) / 2;

	if (position === Position.top) x += (size - thickness) / 2;
	else if (position === Position.right) {
		x += size - thickness;
		y += (size - thickness) / 2;
	} else if (position === Position.bottom) {
		x += (size - thickness) / 2;
		y += size - thickness;
	} else if (position === Position.left) {
		y += (size - thickness) / 2;
	}

	image.setAttribute("href", value || "");
	image.setAttribute("x", `${x}`);
	image.setAttribute("y", `${y}`);
	image.setAttribute("style", style || "");
	svg.appendChild(image);
};

// Main function to create the border
export const createBorder = (
	options: BorderOptions & {
		round: number;
		decorations?: { [key in Position]?: Decoration };
	},
) => {
	return (svg: SVGSVGElement, config: BorderConfig): void => {
		const { width, height } = config;
		const rect = createRect();

		setAttributes(
			rect,
			getBorderAttributes({ width, height, options, round: options.round }),
		);
		svg.appendChild(rect);

		if (options.decorations) {
			for (const position in options.decorations) {
				const decoration = options.decorations[position as Position];
				if (decoration?.type === DecorationType.image) {
					addImageDecoration({
						svg,
						position: position as Position,
						thickness: options.thickness,
						value: decoration?.value!,
						style: decoration?.style!,
						height,
						width,
					});
				} else if (decoration?.type === DecorationType.text) {
					addTextDecoration({
						svg,
						position: position as Position,
						thickness: options.thickness,
						value: decoration?.value!,
						style: decoration?.style!,
						height,
						width,
						round: options.round,
					});
				}
			}
		}
	};
};
