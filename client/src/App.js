import { useState } from 'react';
import { useRSA } from 'hooks/useRSA';
import './App.css';
import 'normalize.css';

function App() {
  const { encrypt, decrypt } = useRSA();
  const [privateKey, setPrivateKey] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [plaintext, setPlaintext] = useState('');
  const [encrypted, setEncrypted] = useState('');
  const [decrypted, setDecrypted] = useState('');

  // 產生金鑰
  async function handleGenerateKey() {
    const keys = await fetch('http://localhost:3001/generate-key').then((res) =>
      res.json(),
    );
    if (keys) {
      alert('金鑰產生成功');
      setPrivateKey(keys.privateKey);
      setPublicKey(keys.publicKey);
    }
  }

  // 公鑰加密
  async function handleEncrypt() {
    if (!plaintext) {
      alert('請輸入欲加密的內容');
      return;
    } else {
      const encrypted = await encrypt(plaintext, publicKey);
      setEncrypted(encrypted);
    }
  }

  // 私鑰解密
  async function handleDecrypt() {
    const decrypted = await decrypt(encrypted, privateKey);
    setDecrypted(decrypted);
  }

  return (
    <main className='app'>
      <h1>非對稱式加密</h1>
      <button onClick={handleGenerateKey}>Generate Key</button>
      <section>
        <h2>執行加密</h2>
        <textarea
          placeholder='Enter Plaintext(輸入欲加密的內容)'
          value={plaintext}
          onChange={(e) => setPlaintext(e.target.value)}
        />
        <textarea
          placeholder='Encrypted(內容加密後的結果)'
          readOnly
          disabled
          value={encrypted}
          onChange={(e) => setEncrypted(e.target.value)}
        />
        <br />
        <button onClick={handleEncrypt}>Encrypt</button>
      </section>
      <section>
        <h2>執行解密</h2>
        <textarea
          placeholder='Enter Encrypted(輸入欲解密的內容)'
          readOnly
          disabled
          value={decrypted}
          onChange={(e) => setDecrypted(e.target.value)}
        />
        <br />
        <button onClick={handleDecrypt}>Decrypt</button>
      </section>
    </main>
  );
}

export default App;
