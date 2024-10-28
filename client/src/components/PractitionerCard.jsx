// import React from "react";

// export const PractitionerCard = (props) => {
//   const {
//     firstName,
//     lastName,
//     title,
//     location,
//     imgURL,
//     phone,
//     email,
//     website,
//   } = props;

//   return (

//   <div
//   className={`flex flex-col w-[49%] h-[280px] items-start gap-2 p-6 relative bg-[#ececec] rounded shadow-[0px_4px_4px_#00000040] `}
// >
//   <div className="inline-flex h-56 w-full gap-10 items-start relative">
//     <img className="relative  w-[200px] h-[200px]" alt="Rectangle" src={imgURL} />
//     <div className="flex flex-col w-full h-full gap-4 pt-0 pb-[13px] px-0 items-start relative">
//       <div className="flex flex-col h-[189px] items-start justify-end gap-4 relative self-stretch w-full">
//         <div className="flex flex-col  h-[38px] items-start gap-4 relative self-stretch w-full">
//           <div className="relative w-full mt-[-1.00px] [font-family:'Fira_Sans-Bold',Helvetica] font-bold text-black text-2xl text-start tracking-[-0.48px] leading-[normal]">
//             {firstName} {lastName}
//           </div>
//         </div>
//         <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
//           <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
//             <div className="relative self-stretch mt-[-1.00px] [font-family:'Fira_Sans-Regular',Helvetica] font-normal text-black text-base tracking-[-0.32px] leading-[normal]">
//               {title}
//             </div>
//             <div className="relative w-fit [font-family:'Fira_Sans-Regular',Helvetica] font-normal text-black text-base text-center tracking-[-0.32px] leading-[normal] whitespace-nowrap">
//               {location}
//             </div>
//           </div>
//           <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
//             <div className="relative self-stretch mt-[-1.00px] opacity-80 [font-family:'Fira_Sans-Medium',Helvetica] font-medium text-[#4f72af] text-base tracking-[-0.32px] leading-[normal]">
//               {phone}
//             </div>
//             <div className="relative self-stretch opacity-80 [font-family:'Fira_Sans-Medium',Helvetica] font-medium text-[#4f72af] text-base tracking-[-0.32px] leading-[normal]">
//             {email}
//             </div>
//             {(website !== undefined) && <div className="relative self-stretch opacity-80 [font-family:'Fira_Sans-Medium',Helvetica] font-medium text-[#4f72af] text-base tracking-[-0.32px] leading-[normal]">
//               <a href = {website}>Website</a>
//             </div>}
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>

//   );
// };

import React from 'react';

export const PractitionerCard = (props) => {
    const {
        firstName,
        lastName,
        title,
        location,
        imgURL,
        phone,
        email,
        website,
    } = props;

    return (
        <div className="flex flex-col sm:flex-row w-full sm:w-[49%] h-auto items-start gap-2 p-6 bg-[#ececec] rounded shadow-[0px_4px_4px_#00000040]">
            <div className="flex flex-col sm:flex-row gap-4 items-center w-full">
                <img
                    className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] rounded-full object-cover"
                    alt={`${firstName} ${lastName}`}
                    src={imgURL}
                />
                <div className="flex flex-col w-full sm:w-auto gap-2">
                    <div className="text-black text-2xl font-bold tracking-[-0.48px] leading-normal">
                        {firstName} {lastName}
                    </div>
                    <div className="text-black text-base font-normal tracking-[-0.32px] leading-normal">
                        {title}
                    </div>
                    <div className="text-black text-base font-normal tracking-[-0.32px] leading-normal">
                        {location}
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="text-[#4f72af] text-base font-medium tracking-[-0.32px] leading-normal">
                            {phone}
                        </div>
                        <div className="text-[#4f72af] text-base font-medium tracking-[-0.32px] leading-normal">
                            {email}
                        </div>
                        {website && (
                            <div className="text-[#4f72af] text-base font-medium tracking-[-0.32px] leading-normal">
                                <a
                                    href={website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Website
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
