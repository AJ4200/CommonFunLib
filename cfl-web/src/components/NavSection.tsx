import React from'react';
 
interface NavSectionProps{
    heading: string,
    
}
 
const NavSection: React.FC<NavSectionProps> = ({...props}) => 
{
    return (<div {...props}>
    
</div>);
}
export default NavSection;