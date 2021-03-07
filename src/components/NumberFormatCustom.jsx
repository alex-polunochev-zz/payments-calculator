import { NumberFormatWithPrefix } from './NumberFormatWithPrefix';

export const NumberFormatPrice = (props) => {
  return <NumberFormatWithPrefix prefix="$" {...props} />;
};

export const NumberFormatPercentage = (props) => {
  return <NumberFormatWithPrefix suffix="%" {...props} />;
};
