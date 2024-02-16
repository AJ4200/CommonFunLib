import React from'react';
 
interface HeaderProps{
prop: string
}
 
const Header: React.FC<HeaderProps> = ({prop}) => 
{
return (<header>Header</header>);
}
export default Header;