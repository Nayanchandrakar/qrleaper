import { Container } from "@/components/global/container";
import { NewQrCodeGrid } from "@/components/layouts/design/new-qr-codes-grid/new-qr-codes-grid";
import { TopNavigationBar } from "@/components/layouts/design/top-navigation-bar";

interface DesignLayoutProps {
	children: React.ReactNode;
}

const DesignLayout = ({ children }: DesignLayoutProps) => {
	return (
		<div className="relative size-full">
			<div className="design-mesh fixed z-[-1] size-full" />

			<Container>
				<div className="my-16 flex flex-col items-center justify-center gap-3 sm:my-20">
					<h2 className="text-center font-bold text-3xl text-black sm:text-4xl">
						Generate QR Code with{" "}
						<span className="bg-gradient-brand bg-clip-text text-transparent">
							Super Powers.
						</span>
					</h2>
					<p className="text-center font-semibold text-base text-zinc-600">
						Customize it with your color, shape and logo in 3 simple steps.
					</p>
				</div>

				<div className="mb-28 rounded-lg bg-gray-400/10 p-4 backdrop-blur-sm">
					<TopNavigationBar />
					<div className="mt-4 rounded-lg bg-white p-4 sm:p-6">{children}</div>
				</div>
				<NewQrCodeGrid />
			</Container>
		</div>
	);
};

export default DesignLayout;
