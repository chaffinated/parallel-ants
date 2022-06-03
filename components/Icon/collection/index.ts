import { ComponentType } from 'react';
import createStyledSVG, { StyledIconProps } from '../Icon';
import Hamburger from './Hamburger';
import Magnifier from './Magnifier';
import Instagram from './Instagram';
import LogoSmall from './LogoSmall';
import CartFull from './CartFull';
import Dropdown from './Dropdown';
import Location from './Location';
import Facebook from './Facebook';
import Twitter from './Twitter';
import TikTok from './TikTok';
import Arrow from './Arrow';
import Close from './Close';
import Crash from './Crash';
import Globe from './Globe';
import Cart from './Cart';
import Fall from './Fall';
import Logo from './Logo';
import SOS from './SOS';

const IconMap = {
  location: Location,
  crash: Crash,
  fall: Fall,
  sos: SOS,
  close: Close,
  dropdown: Dropdown,
  cart: Cart,
  'cart-full': CartFull,
  logo: Logo,
  'logo-small': LogoSmall,
  facebook: Facebook,
  twitter: Twitter,
  tiktok: TikTok,
  instagram: Instagram,
  hamburger: Hamburger,
  arrow: Arrow,
  magnifier: Magnifier,
  globe: Globe,
};

export type IconMapKeys = keyof typeof IconMap;

export default Object.entries(IconMap).reduce((memo, [key, icon]) => {
  memo[key as IconMapKeys] = createStyledSVG(icon as ComponentType<StyledIconProps>);
  return memo;
}, {} as { [key in IconMapKeys]: ComponentType<StyledIconProps> });
