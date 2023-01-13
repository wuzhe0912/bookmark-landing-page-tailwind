import React from 'react';

function RsaForm() {
  return (
    <form>
      <label>
        Input Message：
        <input type='text' name='message' />
      </label>
      <br />
      <button type='submit'>Submit</button>
    </form>
  );
}

export default RsaForm;
