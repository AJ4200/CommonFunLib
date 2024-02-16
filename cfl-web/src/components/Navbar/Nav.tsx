import React from'react';
 
interface NavProps{
label: string
}
 
const Nav: React.FC<NavProps> = ({label,}) => 
{
    return (<a>{label}</a>);
}
export default Nav;