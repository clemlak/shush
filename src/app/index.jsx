import React, { useEffect, useState } from 'react';
import AES from 'crypto-js/aes';
import Enc from 'crypto-js/enc-utf8';

export default function App() {
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const [isDecrypted, setIsDecrypted] = useState(false);

  useEffect(() => {
    console.log(localStorage.getItem('shush'));

    if (localStorage.getItem('shush') === null) {
      setIsDecrypted(true);
    } else {
      setMessage(localStorage.getItem('shush'));
    }
  }, []);

  function handleButton() {
    if (isDecrypted) {
      const temp = AES.encrypt(message, password).toString();
      localStorage.setItem('shush', temp);
      setIsDecrypted(false);
      setMessage(temp);
    } else {
      const temp = AES.decrypt(message, password);

      if (temp.length !== 0) {
        setMessage(temp.toString(Enc));
        setIsDecrypted(true);
      }
    }
  }

  return (
    <>
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
      <br />
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Private key"
      />
      <br />
      <button
        type="button"
        disabled={password.length === 0}
        onClick={() => {
          handleButton();
        }}
      >
        {isDecrypted ? 'Encrypt and save' : 'Decrypt'}
      </button>
    </>
  );
}
