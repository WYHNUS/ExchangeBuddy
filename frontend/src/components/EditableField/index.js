import React, { Component } from 'react';
import TinyMCE from 'react-tinymce';

export const EditableField = ({ name, content, ...rest }) => {
  return <TinyMCE
    name={name}
    content= {content}
    config={{
      plugins: 'link image code media imagetools fullscreen autoresize',
      toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
    }}
    {...rest} />
};