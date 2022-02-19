import { useContext, useEffect } from "react"
import AuthContext from "../../context/auth/authContext"
import ContactForm from "../../context/contact/ContactForm"
import Contact from "../contacts/Contact"
import ContactFilter from "../contacts/ContactFilter"

const Home = () => {
    const authContext = useContext(AuthContext);
    useEffect(() => {
        authContext.loadUser();
        // eslint-disable-next-line
    }, [])
    return (
        <div className='grid-2'>
         <div>
             <ContactForm></ContactForm>
         </div>
         <div>
             <ContactFilter></ContactFilter>
             <Contact></Contact>
        </div>    
        </div>
    )
}

export default Home
