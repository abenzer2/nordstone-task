import React, {useCallback, useState} from 'react';
import VerifyCodeSentForm from './VerifyCodeSentForm';
import ResetEmailForm from './ResetEmailForm';

export default function ForgotPasswordForm() {
  const [codeSent, setCodeSent] = useState(false);

  const handleSetCodeSent = useCallback(value => {
    setCodeSent(value);
  }, []);

  if (codeSent) {
    return <VerifyCodeSentForm setCodeSent={handleSetCodeSent} />;
  } else return <ResetEmailForm setCodeSent={handleSetCodeSent} />;
}
