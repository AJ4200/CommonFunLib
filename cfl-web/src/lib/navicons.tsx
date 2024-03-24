import { FaCog, FaTools, FaExchangeAlt, FaLock } from 'react-icons/fa';
import NavIcon from "@/models/NavIcon";

const navIcons: NavIcon[] = [
  {
    icon: <FaCog />,
    label: 'CommonFunctions'
  },
  {
    icon: <FaTools />, 
    label: 'Generators'
  },
  {
    icon: <FaExchangeAlt />,
    label: "Convertors"
  }, 
  {
    icon: <FaLock />,
    label: "Hashing"
  }
];

export default navIcons;
