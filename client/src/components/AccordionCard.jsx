
import AccordionDropDown from '../assets/icons/AccordionDropdown.png';
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
                <AccordionItemButton><div>{title} <img src={AccordionDropDown} /></div></AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
                <p>{text}</p>
            </AccordionItemPanel>
        </AccordionItem>
    );
    
};

export default AccordionCard;