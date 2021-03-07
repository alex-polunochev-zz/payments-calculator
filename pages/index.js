import Head from 'next/head';

import { CalculatorApp } from '../src/CalculatorApp';

export default function Home() {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" sizes="32x32" href="favicon-32x32.png" />
        <link rel="icon" sizes="16x16" href="favicon-16x16.png" />
        <title>Mortgage Monthly Payments Calculator</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Calculate monthly mortgage payments based on rate, principal, down-payment and other parameters."
        />
        <title>Mortgage Monthly Payments Calculator </title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>
      <CalculatorApp />
    </div>
  );
}
