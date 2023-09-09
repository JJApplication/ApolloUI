import Layout from './Layout';
import { Outlet } from 'react-router-dom';

export default function() {
  return (
    <>
      <div>
        <Layout>
          <Outlet />
        </Layout>
      </div>
    </>
  );
}