import { FaCog, FaTools, FaExchangeAlt, FaLock } from 'react-icons/fa';
import NavIcon from "@/models/NavIcon";
import CommonFunctions from '@/components/nasec/CommonFunctions/CommonFunctions';

const navIcons: NavIcon[] = [
  {
    icon: <FaCog />,
    label: 'CommonFunctions',
    content:<CommonFunctions/>
  },
  {
    icon: <FaTools />, 
    label: 'Generators',
    content:""
  },
  {
    icon: <FaExchangeAlt />,
    label: "Convertors",
    content:""
  }, 
  {
    icon: <FaLock />,
    label: "Hashing",
    content:"Hashing"
  }
];

export default navIcons;
