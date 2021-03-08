
## Mortgage Monthly Payments Calculator

The project is a proof of concept application that allows users to budget how much they need to save to make a down payment on a property. Application collects user inputs such as principal amount, term of loan, and expected interest rate. To help to plan their savings the users are offered two additional fields: field with $ amount for how much they can set aside monthly, and a slider that allows to set how many months they are willing to save before they put the down payment. 

<p align="center">
  <img width="900" src="https://i.ibb.co/z80Ym6Q/Screen-Shot-2021-03-07-at-2-47-40-PM.png" alt="Mortgage Calculator">
</p>

## Constraints

Project doesn't currently have API support and all the interactions with the server, which are:
- fetching the current federal interest rate;
- letting the server to return the calculated monthly payments; 
are stubbed in the service layer of the app.

Default interest rate in the form field is populated based on the hardcoded value for the federal interest of `0.25%` plus the `2.5%`.

By clicking the "Calculate Monthly Payments" button users will be able to see the client-side calculated value based on the formula:<br>
`M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]`.

Where<br>
`P` = Principal amount (the total amount borrowed),<br>
`i` = Monthly interest rate on the mortgage,<br>
`n` = Number of months (term of the mortgage).<br>


## Implementation Details

This is a [Next.js](https://nextjs.org/)-based project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Due to the freedom of choice for platform and tools, Next.js was selected along with [`Material-UI`](https://github.com/mui-org/material-ui/) and [`Styled Components`](https://github.com/styled-components/styled-components) for app implementation.
Material-UI offers React components for faster and easier web development, including variety of form input components. Material-UI was also chosen simply because it's cool and popular, and author wanted to learn a new technology while working on this PoC app.

During the process of the implementation it was revealed that the combination of Material-UI, Styled Components and Next.js (its server side rendering in particular) is not the most optimal solution for a quick PoC, as the way how stylesheets are delivered to client for this set requires a sophisticated configuration (see `/pages/_document.js` for one part of it). Moreover there were observed conflicts of specificity order for CSS between Styled Components and Material-UI, which additionally complicated and delayed development process.

Assuming the findings, the recommendation would be to not use the selected UI libraries in combination with SSR. For a quick PoC the fully client side rendered app, e.g. based on React Create App, could be chosen as a bootstrap alternative.
## Running the application in development mode

Application can be downloaded as ZIP archive or cloned with `git`.
This guide assumes that the LTS Node version is installed on the computer.

The instructions provided have `npm` used, but `yarn` can be used as well.

Install the dependencies by running:
```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Generating assets and deployment

Ideal deployment solution for Next.JS application would be Vercel cloud platform, as it takes care about the most of the CI/CD troubles in the initial stage of application growth and provides zero config deployments.

Vercel connects directly to Github repository, listens to `push` commands on a configured branches and automatically builds and deploys applications to either staging server or to production.

Find the deployed to Vercel version of the **Mortgage Monthly Payments Calculator** by the link - https://payments-calculator.vercel.app/

If a different cloud platform is used, find the instructions on how to deploy generated assets and launch the app under those conditions.

1) To generate assets follow the guide (e.g. for NodeJS server) https://nextjs.org/docs/deployment#other-hosting-options
2) For more fine tuning - https://nextjs.org/docs/advanced-features/custom-server

## Testing

Application has the basic testing coverage for the interest of time implemented with a few unit test cases only. Testing infrastructure includes [`React Testing Library`](https://testing-library.com/) and [`Jest`](https://jestjs.io/en/) runner.
If end to end test were to be implemented, the [`Cypress`](https://www.cypress.io/) framework would be a tool of choice for the app PoC.

Test suite can be launched using `npm` command
```bash
npm run test
```

or if `jest` is installed globally, then directly via 
```bash
jest
```

Current list of scenarios includes:
```
 PASS  test/src/CalculatorApp.test.js
  CalculatorApp
    ✓ renders without crash (332 ms)
    ✓ calculates monthly payment based on default input values (172 ms)
    ✓ calculates monthly payment for updated principal (169 ms)
```
