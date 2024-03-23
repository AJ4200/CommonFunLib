import React from'react';
 
interface IconNavProps{
}
 
const IconNav: React.FC<IconNavProps> = ({...props}) => 
{
return (<div {...props}>IconNav</div>);
}
export default IconNav;