import React, { ReactNode } from'react';
 
interface ComponentProps{
    children: ReactNode
}
 
const Component: React.FC<ComponentProps> = ({children, ...props}) => 
{
    return (<main {...props}>{children}</main>);
}
export default Component;