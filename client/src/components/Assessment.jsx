/* eslint-disable react/prop-types */
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import AccordionDropDown from '../assets/icons/AccordionDropdown.png';
import AccordionUpArrow from '../assets/icons/AccordionUpArrow.png';
import AccordionRadioUnfilled from '../assets/icons/AccordionRadioUnfilled.png';
import  { useState } from 'react';


function Assessment(props) {
    const [isExpanded, setIsExpanded] = useState(false);

    function toggleExpand() {
        setIsExpanded(!isExpanded);
    }
    return (
        <AccordionItem>
            <AccordionItemHeading>
                <AccordionItemButton>
                    <div
                        onClick={toggleExpand}
                        className="flex h-[80px] rounded-lg border border-black flex-shrink-0 bg-gray justify-between items-center pl-9 pt-6 pr-4 pb-6 my-4"
                    >
                        <div className="flex items-center gap-2">
                            {!isExpanded && <img src={AccordionRadioUnfilled} />}

                            <h1 className="font-fira text-xl text-black font-bold tracking-tight pl-12">
                                {props.title}
                            </h1>
                            
                        </div>
                        {isExpanded ? (
                            <button>
                                <img
                                    src={AccordionUpArrow}
                                    alt="Dropdown Arrow"
                                    className="ml-auto"
                                />
                            </button>
                        ) : (
                            <button onClick={toggleExpand}>
                                <img src={AccordionDropDown} />
                            </button>
                        )}
                    </div>
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
                
                {props.children}
            </AccordionItemPanel>
        </AccordionItem>
    );
}

export default Assessment;
