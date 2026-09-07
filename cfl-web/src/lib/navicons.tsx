import { FaCog, FaTools, FaExchangeAlt, FaLock, FaCompass } from 'react-icons/fa';
import NavIcon from "@/models/NavIcon";
import CommonFunctions from '@/components/nasec/CommonFunctions/CommonFunctions';
import Generators from "@/components/nasec/Generators/Generators";
import Converters from "@/components/nasec/Converters/Converters";
import Hashing from "@/components/nasec/Hashing/Hashing";
import MainPage from "@/components/nasec/MainPage";
import { commonTools } from '@/lib/commonTools';
import { converterTools, generatorTools, hashingTools } from '@/lib/utilityTools';

const navIcons: NavIcon[] = [
  {
    icon: <FaCompass />,
    label: "Overview",
    description: "Explore the CommonFunLib catalog and choose a utility section.",
    content:<MainPage/>
  },
  {
    icon: <FaCog />,
    label: 'Functions',
    description: "Check numbers, transform strings, and run everyday utility functions.",
    tools: commonTools.map((tool) => tool.label),
    content:<CommonFunctions/>
  },
  {
    icon: <FaTools />, 
    label: 'Generators',
    description: "Create realistic sample values, identifiers, credentials, and placeholders.",
    tools: generatorTools.map((tool) => tool.label),
    content:<Generators/>
  },
  {
    icon: <FaExchangeAlt />,
    label: "Converters",
    description: "Convert measurements, data sizes, currencies, and other common formats.",
    tools: converterTools.map((tool) => tool.label),
    content:<Converters/>
  }, 
  {
    icon: <FaLock />,
    label: "Hashing",
    description: "Hash, encode, decode, and sign text payloads with reusable API routes.",
    tools: hashingTools.map((tool) => tool.label),
    content:<Hashing/>
  }
];

export default navIcons;
