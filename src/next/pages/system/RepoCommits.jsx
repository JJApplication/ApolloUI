import { Avatar, Button, Card, Spacer, Spinner, Text } from '@geist-ui/core';
import { useEffect, useState } from 'react';
import { getRequest, postRequest } from '../../../axios/axios';
import './RepoCommits.css';
import { ArrowLeft, GitCommit, Github } from '@geist-ui/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../../../api/api';

export default function () {
  const nav = useNavigate();
  const { org, name } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [currentRepo, setCurrentRepo] = useState({});
  const [repoCommit, setRepoCommit] = useState([]);

  useEffect(() => {
    getRepo(`${org}/${name}`);
    getCommits(`${org}/${name}`);
  }, []);

  const getRepo = async (fullname) => {
    try {
      setIsLoading(true);
      const data = await getRequest(`${API.Repo.Get}/${fullname}`);
      if (data.data && data.data.repository) {
        setCurrentRepo(data.data.repository);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getCommits = async (fullname) => {
    await getRepoCommits(fullname);
  };

  const getRepoCommits = async (fullname) => {
    const data = await postRequest(`${API.Repo.Commits}/${fullname}`);
    if (data.data && data.data.commits) {
      setRepoCommit(data.data.commits);
    }
  };

  const formatTime = (t) => {
    return new Date(t * 1000).toLocaleString();
  };

  const renderCommits = (list) => {
    if (!list) {
      return null;
    }
    return list.map((commit) => {
      return (
        <div key={commit?.id} className='repo-commits'>
          <div className='commit-date'>
            <GitCommit />
            <Spacer w={0.5} inline /> 提交于 {formatTime(commit?.commit_date?.seconds)}
          </div>
          <Spacer h={0.5} />
          <Card width='100%'>
            <Card.Content style={{ width: 'unset' }}>
              <Text style={{ fontSize: '1rem', fontWeight: 'bold' }}>{commit?.message}</Text>
              <div className='commit-detail'>
                <div className='commit-detail'>
                  <Avatar text={commit?.author_name} />
                  <Spacer w={0.5} inline />
                  <span>{commit?.author_name}</span>
                </div>
                <div>
                  <Button
                    auto
                    scale={1 / 2}
                    onClick={() => open(`https://github.com/${org}/${name}/commit/${commit?.sha}`, '_blank')}>
                    {commit?.sha?.length > 10 ? commit?.sha?.slice(0, 10) : commit?.sha}
                  </Button>
                </div>
              </div>
            </Card.Content>
          </Card>
        </div>
      );
    });
  };
  return (
    <>
      <Text h2 style={{ display: 'flex', alignItems: 'center' }}>
        <Button auto scale={1 / 2} iconRight={<ArrowLeft />} onClick={() => nav(-1)} />
        <Spacer w={1} inline />
        {currentRepo?.name}
        <Spacer w={1} inline />
        <a href={currentRepo?.url} style={{ width: '18px', height: 'auto' }}>
          <Github size={18} />
        </a>
      </Text>
      <Spacer />
      <Card width={'100%'} className={'repo'}>
        {isLoading ? (
          <Spinner scale={2} style={{ margin: '0 auto' }} />
        ) : (
          <Card.Content style={{ width: 'unset' }}>
            <div>{renderCommits(repoCommit)}</div>
          </Card.Content>
        )}
      </Card>
    </>
  );
}
