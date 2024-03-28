import { FaCog, FaTools, FaExchangeAlt, FaLock } from 'react-icons/fa';
import NavIcon from "@/models/NavIcon";

const navIcons: NavIcon[] = [
  {
    icon: <FaCog />,
    label: 'CommonFunctions',
    content:""
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
