import React from'react';
 
interface HeaderProps{
}
 
const Header: React.FC<HeaderProps> = ({...props}) => 
{
return (<header className='z-9999'{...props}>Header</header>);
}
export default Header;