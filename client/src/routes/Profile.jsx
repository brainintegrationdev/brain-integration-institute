import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { ExampleFileList } from "../components/ExampleFileList";
import { ExampleFileUploadForm } from "../components/ExampleFileUploadForm";

export const Profile = withAuthenticationRequired(() => {
    const { user } = useAuth0();
    return (
        <div>
            <h3>Welcome, {user.name}</h3>
            <ExampleFileUploadForm />
            <ExampleFileList />
        </div>
    )
})