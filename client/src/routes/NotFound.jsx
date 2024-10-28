import { Link } from 'react-router-dom';

export const NotFound = () => {
    return (
        <>
            <h1>Oops! It looks like you took a detour</h1>

            <h2>
                This page isn’t where your neurons were heading. Let’s get you
                back on track! Return to the homepage and reconnect the dots.
            </h2>
            <Link to='/'>Home</Link>
        </>
    );
};

export default NotFound
