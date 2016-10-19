import React, { Component } from 'react';
import TinyMCE from 'react-tinymce';

export const EditableField = ({ name, content, ...rest }) => {
  return <TinyMCE
    name={name}
    content= {content}
    config={{
    	menu: {
			file: {title: 'File', items: 'newdocument'},
			edit: {title: 'Edit', items: 'undo redo | cut copy paste pastetext | selectall'},
			insert: {title: 'Insert', items: 'link media | template hr'},
			// view: {title: 'View', items: 'visualaid'},
			format: {title: 'Format', items: 'bold italic underline strikethrough superscript subscript | removeformat'},
			table: {title: 'Table', items: 'inserttable tableprops deletetable | cell row column'},
			tools: {title: 'Tools', items: 'spellchecker code'}
		},
		plugins: 'link image media imagetools autoresize',
		toolbar: 'fontselect fontsizeselect | undo redo | bold italic | alignleft aligncenter alignright | link image',
		fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
    }}
    {...rest} />
};