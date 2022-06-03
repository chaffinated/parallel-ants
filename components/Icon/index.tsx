import {
  SizeProps,
  SpaceProps,
  LayoutProps,
} from 'styled-system';
import LocalIcons, { IconMapKeys } from './collection';


/* === PROPS === */
interface StyledIconProps extends SizeProps, SpaceProps, LayoutProps {
  fill?: string;
  stroke?: string;
  height?: any;
  width?: any;
  transform?: any;
  [key: string]: any;
}

/* === COMPONENT === */
interface IconProps extends StyledIconProps {
  name: IconMapKeys;
  variant?: string;
}

function Icon(props: IconProps) {
  const { name, ...rest } = props;
  const LocalIcon = LocalIcons[name] || null;  
  return LocalIcon != null ? <LocalIcon {...rest} /> : null;
}

Icon.defaultProps = {
  variant: 'primary',
};

export default Icon;
