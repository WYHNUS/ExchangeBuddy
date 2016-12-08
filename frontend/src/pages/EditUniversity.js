import React from 'react';

import IdentifyUniForm from 'components/IdentifyUniForm';

export default () => (
  <div style={{ padding: 30 }}>
    <h1>Edit your profile</h1>
    <h3>Note that changing your universities will change your default groups!</h3>
    
    <IdentifyUniForm/>
  </div>
);