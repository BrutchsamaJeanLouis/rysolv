/* eslint-disable no-console */
/* eslint-disable arrow-body-style */
import React, { useState } from 'react';

import Markdown from 'components/Markdown';

const Test = () => {
  const [body, setBody] = useState('');

  if (body === '') {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      'https://api.github.com/repos/obsproject/obs-studio/issues/2675',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        setBody(result.body);
      })
      .catch(error => console.log('error', error));
  }

  const handleMarkdownInput = data => {
    setBody(data);
  };

  return (
    <div style={{ width: '50rem' }}>
      <Markdown edit body={body} handleInput={handleMarkdownInput} />
    </div>
  );
};

export default Test;
