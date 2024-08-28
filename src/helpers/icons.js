
import { 
    faTrash, 
    faSignOutAlt, 
    faEdit,
    faDeleteLeft, // for adding "delete" icon to  DropzoneComponent
    faSpinner,
    faPlusCircle,
    faPhone,
    faEnvelope,
    faMapMarkedAlt

} 
from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

const Icons = () => {

    return library.add(
        faTrash, faSignOutAlt, faEdit, faDeleteLeft, faSpinner, faPlusCircle,
        faPhone,
        faEnvelope,
        faMapMarkedAlt);
};

export default Icons;