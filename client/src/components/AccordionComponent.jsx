import AccordionCopy from '../AccordionCopy.json';
import AccordionCard from './AccordionCard.jsx';

import { Accordion } from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

export const AccordionComponent = () => {
    console.log(AccordionCopy);

    return (
        <div className="accordion-div">
            <Accordion allowZeroExpanded>
                {AccordionCopy.map((copy) => (
                    <AccordionCard {...copy} key={copy.title} />
                ))}
            </Accordion>
        </div>
    );
};
