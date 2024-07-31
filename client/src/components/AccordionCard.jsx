
import {
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

 // eslint-disable-next-line react/prop-types
 const AccordionCard = ( { title, text}) => {


    return (
        <AccordionItem>
            <AccordionItemHeading>
                <AccordionItemButton>{title}</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
                <p>{text}</p>
            </AccordionItemPanel>
        </AccordionItem>
    );
    
};

export default AccordionCard;