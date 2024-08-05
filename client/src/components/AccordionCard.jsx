
import AccordionDropDown from '../assets/icons/AccordionDropdown.png';
import AccordionRadioUnfilled from '../assets/icons/AccordionRadioUnfilled.png'
import {
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';


 // eslint-disable-next-line react/prop-types
 const AccordionCard = ( { title, text}) => {


    return (
        <div className="accordion-div">
        <AccordionItem>
            <AccordionItemHeading>
                <AccordionItemButton><div className='accordion-flexbox'><img src={AccordionRadioUnfilled} /><h1 className='accordion-title'>{title}</h1> <img src={AccordionDropDown} /></div></AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
                <p className='accordion-text'>{text}</p>
            </AccordionItemPanel>
        </AccordionItem>
        </div>
    );
    
    
};

export default AccordionCard;