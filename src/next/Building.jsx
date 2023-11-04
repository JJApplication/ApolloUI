import { Button, Text } from '@geist-ui/core';
import { Link } from 'react-router-dom';

export default function() {
  return (
    <>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1 style={{ fontSize: '5rem' }}>👻</h1>
        {/*<h1 style={{ fontSize: '5rem' }}>🫠</h1>*/}
        <Text h1>Error Page Not Found ~</Text>
        <Text p>👾 something went wrong 👾</Text>
        <Link to={'/next'}>
          <Button>返回主页</Button>
        </Link>
      </div>
    </>
  );
}