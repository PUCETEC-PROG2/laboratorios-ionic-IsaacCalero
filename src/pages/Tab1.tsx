import { IonContent, IonHeader, IonList, IonPage, IonText, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import './Tab1.css';
import RepoItem from '../components/RepoItem';
import React from 'react';
import { fetchRepositories } from '../services/GithubService';
import { Repository } from '../interfaces/Repository';
import LoadingSpinner from '../components/LoadingSpinner';

const Tab1: React.FC = () => {
  const [repositoryList, setRepositoryList] = React.useState<Repository[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [errorMsg, setErrorMsg] = React.useState('');

  const fetchRepos = async () => {
    setLoading(true);
    setErrorMsg(''); // Limpiamos errores previos al iniciar
    try {
      const repos = await fetchRepositories();
      setRepositoryList(Array.isArray(repos) ? repos : []);
    } catch (error) {
      console.error('Error obteniendo repositorios:', error);
      setErrorMsg('Error obteniendo repositorios: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useIonViewWillEnter(() => {
    fetchRepos();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Listas de Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Listas de Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>

        {loading && <LoadingSpinner />}
        {errorMsg !== '' && <IonText color="danger"><p>{errorMsg}</p></IonText>}

        {!loading && Array.isArray(repositoryList) && (
          <IonList>
            {repositoryList.map((repo) => (
              <RepoItem {...repo} key={repo.id} onDelete={fetchRepos}/>
            ))}
          </IonList>
        )}

      </IonContent>
    </IonPage>
  );
};

export default Tab1;