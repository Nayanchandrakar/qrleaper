export const MaskBackground = () => {
	return (
		<div className="fixed inset-0 overflow-hidden bg-white opacity-60 transition-opacity duration-300">
			{/* Background gradient with mask */}
			<div className="absolute top-0 left-0 aspect-square w-full overflow-hidden opacity-15 [mask-image:radial-gradient(70%_100%_at_50%_0%,_black_70%,_transparent)] sm:aspect-[2/1]">
				<div
					className="absolute inset-0 saturate-150"
					style={{
						backgroundImage:
							"conic-gradient(from -45deg at 50% -10%, rgb(34, 197, 94) 0deg, rgb(16, 185, 129) 120deg, rgb(132, 204, 22) 180deg, rgb(34, 197, 94) 360deg)",
					}}
				></div>
				<div className="absolute inset-0 backdrop-blur-[100px]" />
			</div>

			{/* Overlay with gradient and blur */}
			<div className="absolute top-0 left-0 aspect-square w-full overflow-hidden opacity-100 mix-blend-soft-light [mask-image:radial-gradient(70%_100%_at_50%_0%,_black_70%,_transparent)] sm:aspect-[2/1]">
				<div
					className="absolute inset-0 saturate-150"
					style={{
						backgroundImage:
							"conic-gradient(from -45deg at 50% -10%, rgb(34, 197, 94) 0deg, rgb(16, 185, 129) 120deg, rgb(132, 204, 22) 180deg, rgb(34, 197, 94) 360deg)",
					}}
				/>
				<div className="absolute inset-0 backdrop-blur-[100px]" />
			</div>
		</div>
	);
};
