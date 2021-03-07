import { Slider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { useContext } from 'react';

import { MEDIA_QUERIES } from '../utils/media';
import { Context } from '../provider/ContextProvider';

const sliderTicks = (isShrink) => [
  {
    value: 0
  },
  {
    value: 12,
    label: isShrink ? '1Y' : '1 Year'
  },
  {
    value: 36,
    label: isShrink ? '3Y' : '3 Years'
  },
  {
    value: 60,
    label: isShrink ? '5Y' : '5 Years'
  }
];

const SliderInput = withStyles({
  root: {
    color: '#586174',
    height: 2
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: '#ccc',
    border: '2px solid #777',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit'
    }
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 12px)',
    top: -16,
    '& *': {
      background: 'transparent',
      color: 'rgba(0, 0, 0, 0.8)',
      whiteSpace: 'nowrap'
    }
  },
  track: {
    height: 2
  },
  rail: {
    height: 2
  },
  mark: {
    backgroundColor: '#777',
    height: 8,
    width: 1,
    marginTop: -3
  }
})(Slider);

const savePeriodValueFormat = (months) => {
  if (!months) return '';

  let label = `${months} months`;
  if (months > 11) {
    const monthsRemainder = months % 12;
    const years = Math.trunc(months / 12);
    label =
      `${years}yr` +
      (years > 1 ? 's' : '') +
      (monthsRemainder > 0 ? ` ${monthsRemainder}mths` : '');
  }
  return label;
};

export const SavingPeriodSlider = (props) => {
  const { screenWidth } = useContext(Context);
  const isShrink = screenWidth <= MEDIA_QUERIES.SMALL_SCREEN.size;

  const { handleSliderChange, value, name } = props;

  return (
    <SliderInput
      value={value}
      name={name}
      onChange={handleSliderChange}
      getAriaValueText={savePeriodValueFormat}
      valueLabelFormat={savePeriodValueFormat}
      valueLabelDisplay="on"
      step={1}
      marks={sliderTicks(isShrink)}
      min={0}
      max={60}
    />
  );
};
