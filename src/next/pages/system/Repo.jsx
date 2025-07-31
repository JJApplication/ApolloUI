import { Card, Dot, Grid, Modal, Spacer, Spinner, Text } from '@geist-ui/core';
import { useEffect, useState } from 'react';
import {getRequest, postRequest} from '../../../axios/axios';
import './Repo.css';
import {GitCommit, Github} from "@geist-ui/icons";
import {useNavigate} from "react-router-dom";

export default function() {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [repos, setRepos] = useState([]);
  const [total, setTotal] = useState(0);
  const [show, setShow] = useState(false);
  const [currentRepo, setCurrentRepo] = useState({});
  const [repoCommit, setRepoCommit] = useState([]);

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

    nav('/next/repo/' + fullname);
    // setCurrentRepo(repos.find((repo) => repo.full_name === fullname));
    // await getRepoCommits(fullname);
  };

  const getRepoCommits = async (fullname) => {
    const data = await postRequest(`/api/repo/commits/${fullname}`);
    if (data.data && data.data.commits) {
      setRepoCommit(data.data.commits);
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
                <Github size={18} /><Spacer w={0.5} inline/>{repo.name}
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

  const renderCommits = (list) => {
    if (!list) {
      return null;
    }
    return list.map((commit) => {
      return (
          <div key={commit?.id} className="repo-commits">
            <GitCommit /> 提交于 {commit?.commit_date?.seconds}
            <Card shadow width='100%'>
              <Card.Content style={{ width: 'unset' }}>
                <Text h3>{commit?.message}</Text>
              </Card.Content>
            </Card>
          </div>
      )
    })
  }
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
            <Text h3 my={0} className={'repo-title'}>
              {currentRepo.name}
            </Text>
            <div>
              {renderCommits(repoCommit)}
            </div>
          </Card.Content>
        </Card>
      </Modal>
    </>
  );
}
