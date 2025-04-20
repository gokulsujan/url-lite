import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const HomeComponent = () => {
    const navigate = useNavigate();
    if (localStorage.getItem("access_token") == null) {
        useEffect(() => {
            navigate('/signin');
          }, [navigate]);
    }
}
export default HomeComponent
