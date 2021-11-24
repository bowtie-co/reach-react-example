import React from 'react';
import { Container } from 'reactstrap';

export const AppThankYou = (props) => {
  const { redirectToUpload } = props;

  return (
    <section id="ThankYouPage">
      <Container className="registration-container">
        <div className="form-wrapper">
          <Container className="form-container">
            <h3>Thank You!</h3>

            <p>
              Check your email for a link to your uploaded file.
            </p>

            <div>
              <p className={'subtext'} onClick={redirectToUpload}>
                <button className={'btn-link'}>Upload Again</button>
              </p>
            </div>
          </Container>
        </div>
      </Container>
    </section>
  );
};
