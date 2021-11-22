import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import { api, notifier, storage } from '../../lib';
import async from 'async';
import { useDropzone } from 'react-dropzone';
import { CustomButton } from "../../atoms";
import { Button } from 'reactstrap';
// import { ButtonBasic } from '../../atoms';

export const AppHome = (props) => {
  const { translate } = props;

  const { brandCopy, navByRoute, navByStep, next, setIsAuthenticated } = props;
  // // const { uid, autoCode, nonce } = queryParams;

  const formWrapper = useRef(null);
  const inputFile = useRef(null);
  const [ email, setEmail ] = useState();
  const [ disableEmail, setDisableEmail ] = useState();
  const [ registered, setRegistered ] = useState(false);
  const [ uploadedFile, setUploadFile ] = useState('');

  // useEffect(() => {
  //   if (storage.get('token')) {
  //     navByRoute('capture');
  //   }
  // }, [ navByRoute ]);

  const onDrop = (acceptedFiles) => {
    // setIsUploading(true);
    // const attachments = [];
    // const fileNames = [];

    async.each(acceptedFiles, (file, next) => {
      const uploadPath = file.name;
      setUploadFile(uploadPath);
      // storageRef.child(uploadPath).put(file).then(() => {
      //   attachments.push({
      //     fileName: file.name,
      //     fileSize: file.size,
      //     fileType: file.type,
      //     filePath: uploadPath
      //   });
      //   fileNames.push(file.name);
      //   next();
      // }).catch(next);
    }, (err) => {
      if (err) {
        console.warn('unable to upload file', err);
      }
    });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const updateEmail = (value) => {
    setEmail(value ? value.toLowerCase() : '');
  };

  const registerUser = useCallback(() => {
    if (email) {
      const payload = { email };

      Object.keys(payload).forEach(key => {
        if (typeof payload[key] === 'string' && payload[key].trim() === '') {
          delete payload[key];
        }
      });

      console.log('Submit registerUser form', payload);
      setRegistered(true);

      // api.post('users', payload).then(({ data }) => {
      //   console.log('User registered with', data);
      //   return api.post('users/login', data).then(({ data }) => {
      //     console.log('Code validated with', data);
      //     storage.set('token', data.token);
      //     setIsAuthenticated(true);
      //     navByStep(next);
      //   });
      // }).catch((err) => {
      //   const msg = err.data && err.data.message;
      //   if (msg && msg.includes('body.email')) {
      //     notifier.error('Please enter a valid email address.');
      //   } else if (msg && msg.includes('body.phone')) {
      //     notifier.error('Please enter a valid phone number.');
      //   } else {
      //     notifier.bad(err);
      //   }
      // });
    } else {
      notifier.error('Please provide email.');
    }
  }, [ email, setIsAuthenticated, navByStep, next ]);

  const upload = (video) => {
    console.log('uploading file', uploadedFile);
    // const fullname = `${Date.now()}.${videoExtension(video.type)}`;

    // setIsUploading(true);

    // // Reset notifier msgs before continuing with upload
    // notifier.reset();

    // if (filter) {
    //   api.post('posts', {
    //     filter: filter._id,
    //     filename: fullname,
    //     filetype: video.type,
    //     filesize: video.size
    //   }).then(({ data }) => {
    //     const { _id, signedPutUrl, signedGetUrl } = data;

    //     setPostId(_id);
    //     storage.set('postId', _id);

    //     fetch(signedPutUrl, {
    //       method: 'PUT',
    //       body: video,
    //       headers: {
    //         'Content-Type': video.type,
    //         'Content-Length': video.size,
    //         'Content-Disposition': `inline; filename="${fullname}"`,
    //       }
    //     }).then((resp) => {
    //       setIsUploading(false);
    //       setVideo(signedGetUrl);
    //       navByStep(next);
    //     }).catch(err => {
    //       setIsUploading(false);
    //       console.error(err);
    //       notifier.bad(err);
    //     });
    //   }).catch(err => {
    //     setIsUploading(false);
    //     console.error(err);
    //     notifier.bad(err);
    //   });
    // }
  };

  return (
    <section id="RegistrationPage">
      { registered ? 
        <Container className="registration-container">
          <div className="form-wrapper" ref={formWrapper}>
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
                  value={uploadedFile}
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

              <div class="submit-file">
                <CustomButton
                  type="submit"
                  name="Submit"
                  onClick={upload}
                />
              </div>
            </Container>
          </div>
        </Container>
        :
        <Container className="registration-container">
          <div className="form-wrapper" ref={formWrapper}>
            <Container className="form-container">
              <h3>Sign Up</h3>

              <Form>
                <FormGroup>
                  <Label className={'hidden'} for='email'>Email</Label>
                  <Input 
                    key='email' 
                    type='email' 
                    name='email' 
                    id='email' 
                    placeholder='Email' 
                    autoComplete='email' 
                    disabled={disableEmail}  
                    onChange={(e) => updateEmail(e.target.value)}
                  />
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
      }
    </section>
  );
};
