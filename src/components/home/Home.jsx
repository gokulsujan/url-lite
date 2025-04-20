import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import NewurlComponent from './NewUrl';

const HomeComponent = () => {
    const navigate = useNavigate();
    if (localStorage.getItem("access_token") == null) {
        useEffect(() => {
            navigate('/signin');
          }, [navigate]);
    }

    return(
        <NewurlComponent />
    )
}
export default HomeComponent
