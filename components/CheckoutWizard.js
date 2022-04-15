import { Step, StepLabel, Stepper } from '@mui/material';
import React from 'react';
import classes from '../utils/classes';

export default function CheckoutWizard({ activeStep = 0 }) {
  return (
    <Stepper
      sx={classes.transparentBackground}
      activeStep={activeStep}
      alternativeLabel
    >
      {['login', 'Shipping Address', 'Payment Method', 'Place Order'].map(
        (step) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        )
      )}
    </Stepper>
  );
}
