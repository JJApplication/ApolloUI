import { Card, Dot, Grid, Modal, Spacer, Spinner, Text } from '@geist-ui/core';
import { useEffect, useState } from 'react';
import { getRequest } from '../../../axios/axios';
import './Repo.css';

export default function() {
  const [isLoading, setIsLoading] = useState(true);
  const [repos, setRepos] = useState([]);
  const [total, setTotal] = useState(0);
  const [show, setShow] = useState(false);
  const [repo, setRepo] = useState({});

  useEffect(() => {
    getRepos();
  }, []);

  const getRepos = async () => {
    try {
      setIsLoading(true);
      const data = await getRequest('/api/repo/list');
      if (data.data && data.data.repositories) {
        setRepos(data.data.repositories);
        setTotal(data.data.total);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const openRepo = async (fullname) => {
    await getRepo(fullname);
  };

  const getRepo = async (fullname) => {
    const data = await getRequest(`/api/repo/${fullname}`);
    if (data.data && data.data.repository) {
      setRepo(data.data.repository);
      setShow(true);
    }
  };

  const renderLanguage = (language) => {
    if (!language) {
      return null;
    }
    switch (language) {
      case 'Go':
      case 'React':
      case 'TypeScript':
        return (
          <Dot type={'success'}>{language}</Dot>
        );
      case 'JavaScript':
      case 'Java':
      case 'HTML':
      case 'Rust':
        return (
          <Dot type={'warning'}>{language}</Dot>
        );
      case 'Vue':
      case 'Python':
        return (
          <Dot className={'icon-green'}>{language}</Dot>
        );
      default:
        return (
          <Dot className={'icon-default'}>{language}</Dot>
        );
    }
  };

  const renderRepos = () => {
    if (!repos || repos.length === 0) {
      return null;
    }
    return repos.map((repo) => {
      return (
        <Grid xs={24} sm={12} md={8} lg={6} xl={4} direction={'column'} key={repo.name}>
          <Card shadow width='100%'>
            <Card.Content style={{ width: 'unset', paddingBottom: 0 }}>
              <Text h2 my={0} className={'repo-title'} onClick={() => openRepo(repo.full_name)}>
                {repo.name}
              </Text>
              <Text p className={'description'}>
                {repo.description || '-'}
              </Text>
              <Card.Footer style={{ padding: '0' }}>
                <Text span>{renderLanguage(repo.language)}</Text>
              </Card.Footer>
            </Card.Content>
          </Card>
        </Grid>
      );
    });
  };

  return (
    <>
      <Text h3>仓库管理</Text>
      <Spacer />
      <Card width={'100%'} className={'repo'}>
        {isLoading ? (
          <Spinner scale={2} style={{ margin: '0 auto' }} />
        ) : (
          <Card.Content width={'unset'}>
            <Grid.Container gap={2}>{renderRepos()}</Grid.Container>
          </Card.Content>
        )}
      </Card>
      <Modal
        visible={show}
        onClose={() => setShow(false)}
      >
        <Card>
          <Card.Content style={{ width: 'unset' }}>
            <Text h2 my={0} className={'repo-title'}>
              {repo.name}
            </Text>
          </Card.Content>
        </Card>
      </Modal>
    </>
  );
}
