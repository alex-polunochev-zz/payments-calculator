import axiosLib from 'axios';

const host = 'https://api.meettally.com'; // get API host from ENV variable

let axios;

// Creates a local shared instance of Axios if doesn't exist yet.
const checkAxiosInit = () => {
  if (!axios) {
    axios = axiosLib.create({
      withCredentials: true, // whether or not cross-site Access-Control requests should be made using credentials
      timeout: 60000, // number of milliseconds before the request times out (request will be aborted if takes longer)
      headers: {
        common: {
          Accept: 'application/json'
        }
      }
    });
  }
};

const sendGet = async (path, params) => {
  checkAxiosInit();
  return axios.get(host + path, params);
};

const sendPost = async (path, params) => {
  checkAxiosInit();
  return axios.post(host + path, params);
};

// XHR stubs
export const getInterestRate = () => {
  // set default interest rate to federal interest + 2.5%
  return Promise.resolve(0.25 + 2.5);
  // return sendGet('/federal-rate');
};

export const getMonthlyPayment = (params) => {
  // Formula to calculate monthly payments using monthly (not annual) rate:
  // M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]
  const { principal, rate, term, monthlySaving, savePeriod } = params;
  const updatedPrincipal = principal - monthlySaving * savePeriod;

  const months = term * 12;
  const monthlyInterest = rate / 100 / 12;
  const monthlyPayment =
    (updatedPrincipal * monthlyInterest * Math.pow(1 + monthlyInterest, months)) /
    (Math.pow(1 + monthlyInterest, months) - 1);

  return Promise.resolve(monthlyPayment);
  // return sendPost('/monthly-payment', { params });
};
