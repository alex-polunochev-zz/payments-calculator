
## Mortgage Monthly Payments Calculator

The project is a proof of concept application that allows users to budget how much they need to save to make a down payment on a property. Application collects user inputs such as principal amount, term of loan, and expected interest rate. To help to plan their savings the users are offered two additional fields: field with $ amount for how much they can set aside monthly, and a slider that allows to set how many months they are willing to save before they put the down payment. 

<p align="center">
  <img width="500" src="https://i.ibb.co/z80Ym6Q/Screen-Shot-2021-03-07-at-2-47-40-PM.png" alt="Mortgage Calculator">
</p>

## Constraints

Project doesn't currently have API support and all the interactions with the server, which are:
- fetching the current federal interest rate;
- letting the server to return the calculated monthly payments; 
are stubbed in the service layer of the app.

Default interest rate in the form field is populated based on the hardcoded value for the federal interest of `0.25%` plus the `2.5%`.

By clicking the "Calculate Monthly Payments" button users will be able to see the client-side calculated value based on the formula:
`M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]`.

Where
`P` = Principal amount (the total amount borrowed),
`i` = Monthly interest rate on the mortgage,
`n` = Number of months (term of the mortgage).


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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


