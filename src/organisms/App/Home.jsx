import React, { useState, useCallback } from 'react';
import { api, notifier, storage } from '../../lib';
import async from 'async';
import { useDropzone } from 'react-dropzone';
import { AppRegister, AppUpload, AppThankYou, AppPreview } from '../../organisms';

export const AppHome = (props) => {
  const { isAuthenticated, setIsAuthenticated } = props;
  const [ name, setName ] = useState();
  const [ email, setEmail ] = useState();
  const [ isUploading, setIsUploading ] = useState(false);
  const [ isUploaded, setIsUploaded ] = useState(false);
  const [ isSubmitted, setIsSubmitted ] = useState(false);
  const [ uploadedFile, setUploadFile ] = useState('');
  const [ post, setPost ] = useState();

  const onDrop = (acceptedFiles) => {
    async.each(acceptedFiles, (file, next) => {
      const uploadPath = file;
      setUploadFile(uploadPath);
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

  const redirectToUpload = () => {
    setUploadFile('');
    setIsUploaded(false);
  };

  const approve = () => {
    api.post(`posts/${post.id}/submit`).then(({ data }) => {
      console.log('User submitted post', data);
      setIsSubmitted(false);
    }).catch((err) => {
      console.error(err);
    });
  };

  const registerUser = useCallback(() => {
    if (email && name) {
      const payload = { email, name };

      Object.keys(payload).forEach(key => {
        if (typeof payload[key] === 'string' && payload[key].trim() === '') {
          delete payload[key];
        }
      });

      api.post('users', payload).then(({ data }) => {
        console.log('User registered with', data);
        storage.set('userId', data.uid);
        return api.post('users/login', data).then(({ data }) => {
          console.log('Code validated with', data);
          storage.set('token', data.token);
          setIsAuthenticated(true);
        });
      }).catch((err) => {
        const msg = err.data && err.data.message;
        if (msg && msg.includes('body.email')) {
          notifier.error('Please enter a valid email address.');
        } else if (msg && msg.includes('body.phone')) {
          notifier.error('Please enter a valid phone number.');
        } else {
          notifier.bad(err);
        }
      });
    } else {
      notifier.error('Please provide email.');
    }
  }, [ email, setIsAuthenticated ]);

  const upload = () => {
    console.log('uploading file', uploadedFile);
    const fullname = `${Date.now()}.${uploadedFile.name}`;
    setIsUploading(true);

    if (uploadedFile) {
      api.post('posts', {
        filename: fullname,
        filetype: uploadedFile.type,
        filesize: uploadedFile.size
      }).then(({ data }) => {
        const { _id, signedPutUrl, signedGetUrl } = data;
        
        setPost({
          id: _id,
          filepath: storage.get('userId'),
          filename: fullname
        });
        setIsSubmitted(true);

        fetch(signedPutUrl, {
          method: 'PUT',
          body: uploadedFile,
          headers: {
            'Content-Type': uploadedFile.type,
            'Content-Length': uploadedFile.size,
            'Content-Disposition': `inline; filename="${fullname}"`,
          }
        }).then((resp) => {
          setIsUploading(false);
          setIsUploaded(true);
        }).catch(err => {
          setIsUploading(false);
          console.error(err);
        });
      }).catch(err => {
        setIsUploading(false);
        console.error(err);
      });
    }
  };

  const registerProps = { setName, updateEmail, registerUser};
  const uploadProps = { getRootProps, getInputProps, upload, uploadedFile};
  const previewProps = { post, approve, redirectToUpload };
  const thankYouProps = { redirectToUpload };

  return (
    <section id="RegistrationPage">
      { !isAuthenticated ? 
        <AppRegister {...registerProps} />
        : !isUploaded && !isUploading ? 
        <AppUpload {...uploadProps}/>
        : isSubmitted ?
        <AppPreview {...previewProps}/>
        :
        <AppThankYou {...thankYouProps} />
      }
    </section>
  );
};
