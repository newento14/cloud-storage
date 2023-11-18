import cl from './homeNotAuth.module.css'
import hero from '../assets/hero.png'
import {useNavigate} from "react-router-dom";

const HomeNotAuth = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className={cl.main_content}>
                <div className={cl.hero}>
                    <div className={cl.card}>
                        <p>Secure cloud platform</p>
                    </div>
                    <p className={cl.main_text}>Manage your cloud files with out Cloud Service</p>
                    <button onClick={() => navigate('/login')} className={cl.btn}>Get Started</button>
                </div>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <img className={cl.img} src={hero} alt=""/>
                </div>
            </div>
        </>
    );
};

export default HomeNotAuth;