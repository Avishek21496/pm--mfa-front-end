
import '../../../src/styles/styles.css'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import PasswordStrengthChecker from "./PasswordStrengthChecker";



const Home = () => {
    return (
        <div>
           <h1 className="italic text-[50px] text-green-600 text-center py-10">Welcome to Password Manager</h1> 
           <PasswordStrengthChecker />
        </div>
    );
};

export default Home;