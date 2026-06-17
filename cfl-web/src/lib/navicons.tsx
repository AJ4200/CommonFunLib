import { FaCog, FaTools, FaExchangeAlt, FaLock, FaCompass } from 'react-icons/fa';
import NavIcon from "@/models/NavIcon";
import CommonFunctions from '@/components/nasec/CommonFunctions/CommonFunctions';
import Generators from "@/components/nasec/Generators/Generators";
import Converters from "@/components/nasec/Converters/Converters";
import Hashing from "@/components/nasec/Hashing/Hashing";
import MainPage from "@/components/nasec/MainPage";

const navIcons: NavIcon[] = [
  {
    icon: <FaCompass />,
    label: "Overview",
    content:<MainPage/>
  },
  {
    icon: <FaCog />,
    label: 'CommonFunctions',
    content:<CommonFunctions/>
  },
  {
    icon: <FaTools />, 
    label: 'Generators',
    content:<Generators/>
  },
  {
    icon: <FaExchangeAlt />,
    label: "Converters",
    content:<Converters/>
  }, 
  {
    icon: <FaLock />,
    label: "Hashing",
    content:<Hashing/>
  }
];

export default navIcons;
