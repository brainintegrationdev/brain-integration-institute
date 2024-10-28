import { useContext, useEffect, useState } from 'react';
import { UserContext } from "../contexts";
import { CloudinaryContext } from '../contexts';


export const ProfileCard = () => {

    const {profileData} = useContext(UserContext)
    const { imageUrl } = useContext(CloudinaryContext);


    return (
        <div
            className={`flex flex-col w-[49%] h-[280px] items-start gap-2 p-6 relative bg-[#ececec] rounded shadow-[0px_4px_4px_#00000040] `}
        >
            <div className="inline-flex h-56 w-full gap-10 items-start relative">
                <img
                    className="relative  w-[200px] h-[200px]"
                    alt="Rectangle"
                    src={imageUrl}
                />
                <div className="flex flex-col w-full h-full gap-4 pt-0 pb-[13px] px-0 items-start relative">
                    <div className="flex flex-col h-[189px] items-start justify-end gap-4 relative self-stretch w-full">
                        <div className="flex flex-col  h-[38px] items-start gap-4 relative self-stretch w-full">
                            <div className="relative w-full mt-[-1.00px] [font-family:'Fira_Sans-Bold',Helvetica] font-bold text-black text-2xl text-start tracking-[-0.48px] leading-[normal]">
                                {profileData.firstName} {profileData.lastName}
                            </div>
                        </div>
                        <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
                            <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
                                {/* <div className="relative self-stretch mt-[-1.00px] [font-family:'Fira_Sans-Regular',Helvetica] font-normal text-black text-base tracking-[-0.32px] leading-[normal]">
                                    {title}
                                </div> */}
                                <div className="relative w-fit [font-family:'Fira_Sans-Regular',Helvetica] font-normal text-black text-base text-center tracking-[-0.32px] leading-[normal] whitespace-nowrap">
                                    {profileData.city}{' '}{profileData.state}
                                </div>
                            </div>
                            <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
                                <div className="relative self-stretch mt-[-1.00px] opacity-80 [font-family:'Fira_Sans-Medium',Helvetica] font-medium text-[#4f72af] text-base tracking-[-0.32px] leading-[normal]">
                                    {profileData.phone}
                                </div>
                                <div className="relative self-stretch opacity-80 [font-family:'Fira_Sans-Medium',Helvetica] font-medium text-[#4f72af] text-base tracking-[-0.32px] leading-[normal]">
                                    {profileData.email}
                                </div>
                                {/* {website !== undefined && (
                                    <div className="relative self-stretch opacity-80 [font-family:'Fira_Sans-Medium',Helvetica] font-medium text-[#4f72af] text-base tracking-[-0.32px] leading-[normal]">
                                        <a href={website}>Website</a>
                                    </div>
                                )} */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard
