import React, { useEffect, useState, useCallback } from 'react';
import { useWindowDimensions } from '../../lib';
import { CustomButton } from "../../atoms";

const { REACT_APP_AWS_BUCKET } = process.env;

export const AppPreview = (props) => {
  const { post, approve, redirectToUpload } = props;

  const getPostUploadUrl = useCallback((post) => {
    return `https://s3.amazonaws.com/${REACT_APP_AWS_BUCKET}/${post.filepath}/${post.filename}`;
  }, [ post ]);

  const dimensions = useWindowDimensions();
  const maxWidth = 750;
  const [ width, setWidth ] = useState(dimensions.width);
  const [ height, setHeight ] = useState(dimensions.height);

  useEffect(() => {
    const newWidth = dimensions.width - 40;
    setWidth(newWidth < maxWidth ? newWidth : maxWidth);
    setHeight(width / 16 * 9);
  }, [ width, dimensions ]);

  return (
    <div className={'SharePostImage'}>
      <img
        className={'share-frame'}
        src={getPostUploadUrl(post)}
        width={width}
        height={height}
        frameBorder={'0'}
        allowFullScreen
      ></img>

      <div className={'mb-3'}>
        <CustomButton
          type="submit"
          name="Approve"
          onClick={approve}
        />
        <CustomButton
          type="submit"
          name="Back"
          onClick={redirectToUpload}
        />
      </div>
    </div>
  );
};
