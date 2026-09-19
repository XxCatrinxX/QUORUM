import { ContactBand } from '../../sections/ContactBand';
import { Hero } from '../../sections/Hero';
import { Services as ServicesSection } from '../../sections/Services';
import { Work } from '../../sections/Work';

export default function Home() {
	return (
		<>
			<Hero />
			<ServicesSection />
			<Work />
			<ContactBand />
		</>
	);
}
