import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import { api, notifier, storage } from '../../lib';
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
  const [ file, setFile ] = useState('');

  // useEffect(() => {
  //   if (storage.get('token')) {
  //     navByRoute('capture');
  //   }
  // }, [ navByRoute ]);

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
    console.log('uploading file', file);
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

  const onButtonClick = (e) => {
    // `current` points to the mounted file input element
    inputFile.current.click();
    console.log('input file', inputFile);
    setFile(inputFile.current.value);
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
                  value={file}
                />
                <span className={'subtext'}>
                  <input type='file' id='file' ref={inputFile} style={{display: 'none'}}/>
                  <button onClick={onButtonClick}>Select File</button>
                  <button className={'btn-link'} onClick={upload}>Submit File</button>
                </span>
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
                  <button className={'btn-link'}>Next</button>
                </p>
              </div>
            </Container>
          </div>
        </Container>
      }
    </section>
  );
};
