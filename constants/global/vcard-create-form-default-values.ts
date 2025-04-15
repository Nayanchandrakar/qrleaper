import { templateCarouselData } from "@/constants/pages/design/vcard/template-carousel-data";
import { colorsList } from "@/constants/qr/colors";

export const vcardCreateDefaultValues = {
	title: "",
	firstName: "Alex",
	lastName: "Smith",
	middleName: "Taylor",
	prefix: "Dr.",
	suffix: "Ph.D.",
	mobileNumber: "+1234567890",
	workNumber: "+0987654321",
	homeNumber: "+1122334455",
	whatsappNumber: "+1234567890",
	faxNumber: "+5678901234",

	personalEmail: "alex.smith@example.com",
	workEmail: "alex.smith@techinnovators.com",

	homeStreet: "789 Innovation Drive",
	homeCity: "TechTown",
	homeState: "InnovateState",
	homeZip: "98765",
	homeCountry: "TechCountry",

	workStreet: "456 Corporate Parkway",
	workCity: "BusinessCity",
	workState: "CorporateState",
	workZip: "54321",
	workCountry: "BusinessCountry",

	website: "https://alexsmith.com",

	company: "Tech Innovators Inc.",
	jobTitle: "Chief Technology Officer",
	department: "Research and Development",

	linkedin: "https://linkedin.com/in/alexsmith",
	twitter: "https://twitter.com/alexsmith",
	instagram: "https://instagram.com/alexsmith",
	facebook: "https://facebook.com/alexsmith",

	templateId: templateCarouselData[0].templateId,
	style: {
		bottomInput: "",
		image: "",
		topInput: "",
		colors: [colorsList[0]],
		colorType: "linear",
		rotation: 0,
		hasFrame: false,
		shape: "square",
	},

	note: "An accomplished technology leader with 15+ years of experience driving innovation, leading diverse teams, and delivering cutting-edge solutions.",
};
