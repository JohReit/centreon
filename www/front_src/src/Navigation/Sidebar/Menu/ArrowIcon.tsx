import React from 'react';

import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/NavigateNext';

interface ExpandProps {
  className?: string;
  isOpen: boolean;
  size?: 'inherit' | 'large' | 'medium' | 'small';
}

const ArrowIcon = ({ isOpen, size, className }: ExpandProps): JSX.Element => {
  return isOpen ? (
    <ExpandMore className={className} fontSize={size} />
  ) : (
    <ExpandLess className={className} fontSize={size} />
  );
};

export default ArrowIcon;