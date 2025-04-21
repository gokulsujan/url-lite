import { useParams } from 'react-router-dom';
import UrlComponent from "./UrlComponent";

const UrlDetails = () => {
    const { id } = useParams();

    return (
        <>
            <UrlComponent id={id} />
        </>

    )
}

export default UrlDetails
