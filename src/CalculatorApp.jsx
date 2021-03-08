import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
  Button
} from '@material-ui/core';
import NumberFormat from 'react-number-format';

import { media } from './utils/media';
import { NumberFormatPrice, NumberFormatPercentage } from './components/NumberFormatCustom';
import { SavingPeriodSlider } from './components/SavingPeriodSlider';
import { getInterestRate, getMonthlyPayment } from './services/api';

const Wrapper = styled.div`
  padding-top: 50px;
  width: 100%;
  height: 100vh;
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
  > * {
    flex: 0 1 calc(50% - 20px);
  }
  ${media.SMALL_SCREEN`
    flex-flow: column;
    > :first-child {
      margin-right: 0;
    }
    > :nth-child(2) {
      width: 80%;
      align-self: center;
      }
    `}
`;

const StyledFormControl = styled(FormControl)`
  && {
    margin-bottom: 20px;
  }
`;

const StyledButton = styled(Button)`
  && {
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
  }
`;

const MonthlyPayment = styled.h2`
  margin-top: 50px;
  padding-bottom: 30px;
  font-size: 32px;
  font-weight: 400;
  ${media.SMALL_SCREEN`
    align-self: center;
  `}
  height: 100px;
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
`;

export const CalculatorApp = () => {
  // fetch current interest rate on component mount
  useEffect(async () => {
    try {
      const interestRate = await getInterestRate();
      if (!Number.isNaN(interestRate)) {
        updateState('rate', interestRate);
      }
    } catch (e) {
      // handle server failure response
    }
  }, []);

  const [monthlyPayment, setMonthlyPayment] = useState();
  const [errors, setErrors] = useState({
    rate: false,
    principal: false
  });
  const [inputValues, setInputValues] = useState({
    rate: 0,
    principal: 100000,
    monthlySaving: 0,
    savePeriod: 0,
    term: 10
  });

  const updateState = (name, value) => {
    setInputValues({
      ...inputValues,
      [name]: value
    });
  };

  const handleSliderChange = (event, value) => {
    updateState('savePeriod', value || 0);
  };

  const handleTextInputChange = (event) => {
    updateState(event.target.name, event.target.value);
    if (['principal', 'rate'].includes(event.target.name)) {
      setErrors({ ...errors, [event.target.name]: false });
    }
  };

  const handleFormSubmit = async () => {
    const { rate, principal } = inputValues;
    setErrors({ rate: !rate, principal: !principal });

    try {
      const monthlyPayment = await getMonthlyPayment(inputValues);
      setMonthlyPayment(monthlyPayment);

      // scroll few px down to see the result when user clicks Submit button that's located right at the bottom edge
      const element = document.getElementById('monthly-payment-value');
      if (element) {
        element.scrollIntoView();
      }
    } catch (e) {
      // handle server failure response
    }
  };

  return (
    <Wrapper>
      <Content>
        <Title>Mortgage Payments Calculator</Title>
        <StyledTextField
          label="Principal Amount"
          value={inputValues.principal}
          onChange={handleTextInputChange}
          name="principal"
          id="principal-amount"
          InputProps={{
            inputComponent: NumberFormatPrice
          }}
          variant="outlined"
          error={errors.principal}
          helperText={errors.principal && 'Incorrect entry.'}
        />
        <StyledFormControl variant="outlined">
          <InputLabel id="mortgage-term-label">Mortgage Term</InputLabel>
          <Select
            labelId="mortgage-term-label"
            id="mortgage-term"
            value={inputValues.term}
            name="term"
            onChange={handleTextInputChange}
            label="Mortgage Term"
            data-testid="term-select">
            <MenuItem value={10}>10 yrs</MenuItem>
            <MenuItem value={15}>15 yrs</MenuItem>
            <MenuItem value={20}>20 yrs</MenuItem>
            <MenuItem value={30}>30 yrs</MenuItem>
            <MenuItem value={50}>50 yrs</MenuItem>
          </Select>
        </StyledFormControl>
        <StyledTextField
          label="Rate"
          value={inputValues.rate}
          onChange={handleTextInputChange}
          name="rate"
          id="rate-percentage"
          InputProps={{
            inputComponent: NumberFormatPercentage
          }}
          variant="outlined"
          error={errors.rate}
          helperText={errors.rate && 'Incorrect entry.'}
        />
        <Typography variant="body1" gutterBottom paragraph>
          How much can you set aside a month for a down payment?
        </Typography>
        <TwoColumns>
          <StyledTextField
            label="Monthly savings"
            value={inputValues.monthlySaving}
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
              handleSliderChange={handleSliderChange}
              value={inputValues.savePeriod}
              name="savePeriod"
            />
          </div>
        </TwoColumns>
        <StyledButton variant="contained" color="primary" onClick={handleFormSubmit}>
          Calculate Monthly Payments
        </StyledButton>
        <MonthlyPayment isVisible={!!monthlyPayment} id="monthly-payment-value">
          <NumberFormat
            value={monthlyPayment}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
            decimalScale={2}
          />{' '}
          / month
        </MonthlyPayment>
      </Content>
    </Wrapper>
  );
};
