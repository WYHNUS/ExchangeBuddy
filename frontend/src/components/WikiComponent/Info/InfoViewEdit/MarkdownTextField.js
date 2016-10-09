import React from 'react'
import { Field, reduxForm } from 'redux-form'
import ReactMarkdownMediumEditor from 'meteor/universe:react-markdown-wysiwyg/ReactMarkdownMediumEditor';

const options = {
  toolbar: {
    /* These are the default options for the toolbar,
    if nothing is passed this is what is used */
    allowMultiParagraphSelection: true,
    buttons: ['bold', 'italic', 'underline', 'image', 'anchor', 'h1', 'h2', 'orderedlist', 'unorderedlist', 'quote'],
    diffLeft: 0,
    diffTop: -10,
    firstButtonClass: 'medium-editor-button-first',
    lastButtonClass: 'medium-editor-button-last',
    standardizeSelectionStart: false,
    sticky: true,
    relativeContainer: null,
    buttonLabels: true
  },
  paste: {
    cleanAttrs: ['class', 'style', 'dir'],
    cleanTags: ['meta', 'span']
  },
  placeholder: {
      text: 'Information Content'
  }
};

// Note: 'input' is "curried" prop used by redux-form for .onChange to set form dirty
const MarkdownTextField = ({ input, markdown }) => (
  <ReactMarkdownMediumEditor
    className="md-info"
    markdown={ markdown }
    options={options}
    onChange={ value => input.onChange(value) }
  />
)

export default MarkdownTextField;
