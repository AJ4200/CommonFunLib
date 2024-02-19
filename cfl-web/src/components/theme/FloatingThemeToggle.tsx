import React from'react';
 
interface FloatingThemeToggleProps{
}
 
const FloatingThemeToggle: React.FC<FloatingThemeToggleProps> = ({...props}) => 
{
return (<div {...props}>FloatingThemeToggle</div>);
}
export default FloatingThemeToggle;