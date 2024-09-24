import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { ExampleFileList } from "../components/ExampleFileList";
import { ExampleFileUploadForm } from "../components/ExampleFileUploadForm";
import { Cloudinary} from '@cloudinary/url-gen'
import { AdvancedImage} from '@cloudinary/react'
// import { About } from "../components/About";

export const Profile = withAuthenticationRequired(() => {
    const { user } = useAuth0();
    
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dw1ktiayz'
        }
    })

    return (
        <div>
            <h3>Welcome, {user.name}</h3>
            <ExampleFileUploadForm />
            <ExampleFileList />
            {
            /* Profile Photo */
            <AdvancedImage cldImg={cld.image(`profilePics/${localStorage.getItem('userId')}`)}/>
            }
        </div>
    )
})