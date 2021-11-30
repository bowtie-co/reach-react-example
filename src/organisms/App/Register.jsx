import React from 'react';
import { Form, FormGroup, Label, Input, Container } from 'reactstrap';

export const AppRegister = (props) => {
  const { setName, updateEmail, registerUser } = props;

  return (
    <section id="RegistrationPage">
      <Container className="registration-container">
        <div className="form-wrapper">
          <Container className="form-container">
            <h3>Register/Login</h3>

            <Form>
              <FormGroup>
                <Label className={'hidden'} for='name'>First Name</Label>
                <Input key='name' required type='text' name='name' id='name' placeholder='First Name' autoComplete='name' onChange={(e) => setName(e.target.value)} />
              </FormGroup>

              <FormGroup>
                <Label className={'hidden'} for='email'>Email</Label>
                <Input key='email' type='email' name='email' id='email' placeholder='Email' autoComplete='email' onChange={(e) => updateEmail(e.target.value)} />
              </FormGroup>
            </Form>

            <div>
              <p className={'subtext'} onClick={registerUser}>
                <button className={'btn-link'}>Submit</button>
              </p>
            </div>
          </Container>
        </div>
      </Container>
    </section>
  );
};
