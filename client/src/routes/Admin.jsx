import { useAuth0 } from '@auth0/auth0-react';
import paleBanner from '../assets/icons/PaleGreenPractitionerBackground.png';
import banner from '../assets/icons/PractitionerBackground.png';

export const Admin = () => {


    //colors: #e4b5c680 -rose
    // #BFDFDDD9 - sky blue
    //#c0e6d880 - ice blue
    //#d0b0db80 - lavender
    //#dadadf80 - lightest grey
    //#bdcbdd80 - greyish blue
    //#f0cabe80 - pinky pink 
    //#e4b5c680






    return (
        <div>
              <div
                className="w-full h-64 sm:h-80 md:h-96 relative bg-white"
                style={{
                    backgroundImage: `url(${banner}), url(${paleBanner})`,
                    backgroundSize: 'cover, cover',
                    backgroundPosition: 'center, center',
                    backgroundRepeat: 'no-repeat, no-repeat',
                }}
            >
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-white text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-fenix font-normal">
                        Admin Dashboard
                    </h1>
                </div>
            </div>
            <div className='flex gap-20 justify-around'>
                <div className='w-[189px] h-[102px] border-none border rounded-xl bg-sky-blue shadow-md font-fira flex p-4 justify-start items-end'>Video Presentation</div>
                <div className='w-[189px] h-[102px] border-none  border rounded-xl bg-mauve shadow-md font-fira flex p-4 justify-start items-end'>Brain Integration Training</div>
                <div className='w-[189px] h-[102px] border-none border rounded-xl bg-ice-blue shadow-md font-fira flex p-4 justify-start items-end'>Clinical Hours</div>
                <div className='w-[189px] h-[102px] border-none border rounded-xl bg-lavender shadow-md font-fira flex p-4 justify-start items-end'>First Aid Certification</div>
                <div className='w-[189px] h-[102px] border-none border rounded-xl bg-lightest-grey shadow-md font-fira flex p-4 justify-start items-end'>CPR Certification</div>
                <div className='w-[189px] h-[102px] border-none border rounded-xl bg-greyish-blue shadow-md font-fira flex p-4 justify-start items-end'>Insurance</div>
                <div className='w-[189px] h-[102px] border-none border rounded-xl bg-pinky-pink shadow-md font-fira flex p-4 justify-start items-end'>Assessment</div>
            </div>
        </div>
    )
}


export default Admin;