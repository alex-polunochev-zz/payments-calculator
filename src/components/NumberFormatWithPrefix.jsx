import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

export const NumberFormatWithPrefix = (props) => {
  const { inputRef, onChange, prefix, suffix, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        });
      }}
      thousandSeparator
      isNumericString
      allowNegative={false}
      decimalScale={2}
      allowEmptyFormatting={true}
      prefix={prefix}
      suffix={suffix}
    />
  );
};

NumberFormatWithPrefix.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  prefix: PropTypes.string,
  suffix: PropTypes.string
};

NumberFormatWithPrefix.defaultProps = {
  prefix: '',
  suffix: ''
};
