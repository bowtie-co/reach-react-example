import React from 'react';
import { Label, Input, Container } from 'reactstrap';
import { CustomButton } from "../../atoms";

export const AppUpload = (props) => {
  const { getRootProps, getInputProps, upload, uploadedFile } = props;

  return (
    <section id="RegistrationPage">
      <Container className="registration-container">
        <div className="form-wrapper">
          <Container className="form-container">
            <h3>Upload File</h3>

            <div>
              <Label className={'hidden'} for='email'>File:</Label>
              <Input 
                key='attachment' 
                type='attachment' 
                name='attachment' 
                id='attachment' 
                placeholder='attachment' 
                autoComplete='attachment'
                disabled={true}
                value={uploadedFile.name}
              />
            </div>

            <div {...getRootProps()}
              className="input"
              id="messageAttachment"
            >
              <input {...getInputProps()} />

              <div className="message-attachment">
                <CustomButton
                  iconName='attachment'
                  type="file"
                  name="Attachment"
                  btnClass="icon-attachment"
                />
              </div>
            </div>

            <div className="submit-file">
              <CustomButton
                type="submit"
                name="Submit"
                onClick={upload}
              />
            </div>
          </Container>
        </div>
      </Container>
    </section>
  );
};
