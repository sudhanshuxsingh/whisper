import CodeWindow, { CodeWindowCode } from '@/components/ui/code-window';
import React from 'react';
const codeBlock = `var myHeaders = new Headers();
myHeaders.append("X-API-KEY-WHISPER", "at43sds5usggsre4g");
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "content": "I loved it",
  "name": "Sudhanshu Singh",
  "email": "sudhanshu.iem2k18@gmail.com",
  "rating": 5
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:3000/api/v1/feedback", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));`;
const APICodeBlock = () => {
  return (
    <CodeWindow>
      <CodeWindowCode language="tsx" overflow={false}>
        {codeBlock}
      </CodeWindowCode>
    </CodeWindow>
  );
};

export default APICodeBlock;
