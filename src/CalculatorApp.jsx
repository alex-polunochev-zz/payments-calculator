import { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import {
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Slider,
  Typography,
  Button
} from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import NumberFormat from 'react-number-format';

import { media, MEDIA_QUERIES } from './utils/media';
import { NumberFormatPrice, NumberFormatPercentage } from './formats/NumberFormatCustom';
import { getInterestRate, getMonthlyPayment } from './services/api';
import { Context } from './provider/ContextProvider';

const Wrapper = styled.div`
  padding-top: 50px;
  width: 100%;
  height: 100vh;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  min-width: 200px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 50%;
  margin: 0 15px;
  ${media.MEDIUM_SCREEN`
      width: 85%;
    `}
  ${media.SMALL_SCREEN`
      width: 100%;
    `}
`;

const Title = styled.h1`
  color: #586174;
  font-size: 24px;
  font-family: Roboto;
  font-weight: 200;
  margin-bottom: 40px;
  ${media.LARGE_SCREEN`
    font-size: 32px;
  `};
`;

const StyledTextField = styled(TextField)`
  && {
    margin-bottom: 20px;
  }
`;

const TwoColumns = styled.div`
  width: 100%;
  display: flex;
  > :first-child {
    margin-right: 40px;
  }
  * {
    flex: 0 1 calc(50% - 20px);
  }
  ${media.SMALL_SCREEN`
    flex-direction: column;
    > :first-child {
      margin-right: 0;
    }
    > :nth-child(2) {
      width: 80%;
      align-self: center;
      }
    `}
`;

const useStyles = makeStyles(() => ({
  formControl: {
    marginBottom: 20
  }
}));

const SavingPeriodSlider = withStyles({
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

const StyledButton = styled(Button)`
  width: fit-content;
  margin-top: 20px;
  text-transform: none;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0.35px;
  ${media.SMALL_SCREEN`
    align-self: center;
    font-size: 14px;
    font-weight: 500;
  `}
`;

const MonthlyPayment = styled.h2`
  margin-top: 50px;
  font-size: 32px;
  font-weight: 400;
  ${media.SMALL_SCREEN`
    align-self: center;
  `}
`;

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

export const CalculatorApp = () => {
  const { screenWidth } = useContext(Context);
  const classes = useStyles();

  // fetch current interest rest on component mount
  useEffect(async () => {
    try {
      const interestRate = await getInterestRate();
      if (!Number.isNaN(interestRate)) {
        // set default interest rate to federal interest + 2.5%
        updateState('rate', interestRate + 2.5);
      }
    } catch (e) {
      // handle server failure response
    }
  }, []);

  const [monthlyPayment, setMonthlyPayment] = useState();
  const [inputs, setinputs] = useState({
    rate: 0,
    principal: 100000,
    monthlySaving: 0,
    savePeriod: 0,
    term: 10
  });

  const updateState = (name, value) => {
    setinputs({
      ...inputs,
      [name]: value
    });
  };

  const handleSliderChange = (event, value) => {
    updateState('savePeriod', value || 0);
  };

  const handleTextInputChange = (event) => {
    updateState(event.target.name, event.target.value);
  };

  const savePeriodValueFormat = (months) => {
    if (!months) return '';

    let label = `${months} months`;
    if (months > 11) {
      const monthsRemainder = months % 12;
      label =
        `${Math.trunc(months / 12)} yrs ` + (monthsRemainder > 0 ? ` ${monthsRemainder} mths` : '');
    }
    return label;
  };

  const handleFormSubmit = async () => {
    try {
      const monthlyPayment = await getMonthlyPayment(inputs);
      setMonthlyPayment(monthlyPayment);
    } catch (e) {
      // handle server failure response
    }
  };

  const isShrink = screenWidth <= MEDIA_QUERIES.SMALL_SCREEN.size;

  return (
    <Wrapper>
      <Content>
        <Title>Mortgage Payments Calculator</Title>
        <StyledTextField
          label="Principal Amount"
          value={inputs.principal}
          onChange={handleTextInputChange}
          name="principal"
          id="principal-amount"
          InputProps={{
            inputComponent: NumberFormatPrice
          }}
          variant="outlined"
        />
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="downpayment-saving-period-label">Mortgage Term</InputLabel>
          <Select
            labelId="downpayment-saving-period-label"
            id="downpayment-saving-period"
            value={inputs.term}
            name="term"
            onChange={handleTextInputChange}
            label="Mortgage Term">
            <MenuItem value={10}>10 yrs</MenuItem>
            <MenuItem value={15}>15 yrs</MenuItem>
            <MenuItem value={20}>20 yrs</MenuItem>
            <MenuItem value={30}>30 yrs</MenuItem>
            <MenuItem value={50}>50 yrs</MenuItem>
          </Select>
        </FormControl>
        <StyledTextField
          label="Rate"
          value={inputs.rate}
          onChange={handleTextInputChange}
          name="rate"
          id="rate-percentage"
          InputProps={{
            inputComponent: NumberFormatPercentage
          }}
          variant="outlined"
        />
        <Typography variant="body1" gutterBottom paragraph>
          How much can you set aside a month for a down payment?
        </Typography>
        <TwoColumns>
          <StyledTextField
            label="Monthly savings"
            value={inputs.monthlySaving}
            onChange={handleTextInputChange}
            name="monthlySaving"
            id="monthlySaving"
            InputProps={{
              inputComponent: NumberFormatPrice
            }}
            variant="outlined"
          />
          <div>
            <Typography id="savePeriodLabel" gutterBottom>
              Keep saving for
            </Typography>
            <SavingPeriodSlider
              value={inputs.savePeriod}
              name="savePeriod"
              onChange={handleSliderChange}
              getAriaValueText={savePeriodValueFormat}
              valueLabelFormat={savePeriodValueFormat}
              aria-labelledby="savePeriodLabel"
              valueLabelDisplay="on"
              step={1}
              marks={sliderTicks(isShrink)}
              min={0}
              max={60}
            />
          </div>
        </TwoColumns>
        <StyledButton variant="contained" color="primary" onClick={handleFormSubmit}>
          Calculate Monthly Payments
        </StyledButton>
        {monthlyPayment && (
          <MonthlyPayment>
            <NumberFormat
              value={monthlyPayment}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'$'}
              decimalScale={2}
            />{' '}
            / month
          </MonthlyPayment>
        )}
      </Content>
    </Wrapper>
  );
};
