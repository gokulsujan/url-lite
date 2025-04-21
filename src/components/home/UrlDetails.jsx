import { useParams } from 'react-router-dom';
import UrlComponent from "./UrlComponent";
import UrlLogsComponent from './UrlLogsComponent';

const UrlDetails = () => {
    const { id } = useParams();

    return (
        <>
            <UrlComponent id={id} />
            <UrlLogsComponent urlID={id} />
        </>

    )
}

export default UrlDetails
