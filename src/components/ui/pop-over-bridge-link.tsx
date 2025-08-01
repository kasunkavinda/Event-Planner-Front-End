import React, { forwardRef } from 'react';

const PopOverBridgeLink = forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ href, ...props }, ref) => {
  return <a href={href} ref={ref} {...props} />;
});

PopOverBridgeLink.displayName = 'PopOverBridgeLink';

export default PopOverBridgeLink;
