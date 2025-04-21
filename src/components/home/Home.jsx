import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import NewurlComponent from './NewUrl';
import MyUrlComponent from './MyUrls';

const HomeComponent = () => {
    const navigate = useNavigate();
    if (localStorage.getItem("access_token") == null) {
        useEffect(() => {
            navigate('/signin');
        }, [navigate]);
    }

    return (
        <>
            <NewurlComponent />
            <MyUrlComponent />
        </>
    )
}
export default HomeComponent
