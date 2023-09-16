import { Link, Text, useToasts } from '@geist-ui/core';
import { useEffect } from 'react';
import store from '../store/store';
import { clearMessage } from '../store/actions';
import urls from '../urls';
import logger from '../logger/logger';

function Toast(props) {
  // 全局通知
  const { setToast } = useToasts({ maxHeight: 'auto' });
  const showToast = (text, t) => setToast({ text: text, type: t, delay: 4000 });

  const now = () => {
    let d = new Date();
    return `${d.getFullYear()}/${d.getMonth()}/${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
  };
  // 详细的通知
  const showMoreToast = (text, t) => setToast({
    text:
      <div>
        <Text h6>Apollo通知</Text>
        <Text b font='0.6rem' marginTop='0'>操作时间: <Text i>{now()}</Text></Text>
        <Text p marginBottom='0' marginTop='2px' font='0.9rem'>{text}</Text>
        <Link target='_blank' color block href={urls.JJApplication} style={{ fontSize: '.65rem', color: 'cyan' }}>powered
          by renj.io</Link>
      </div>,
    type: t,
    delay: 4000,
  });
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const data = store.getState();
      if (data.hasMessage && data.hasMessage.check) {
        logger.info('receive message', data.hasMessage);
        if (data.moreToast) {
          showMoreToast(data.hasMessage.message, data.hasMessage.t);
          store.dispatch(clearMessage());
        } else {
          showToast(data.hasMessage.message, data.hasMessage.t);
          store.dispatch(clearMessage());
        }
      }
    });
    return () => {
      unsubscribe();
    };
  });
  return (
    <>
    </>
  );
}

export default Toast;