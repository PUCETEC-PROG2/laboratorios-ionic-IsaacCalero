import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import './Tab1.css';
import RepoItem from '../components/RepoItem';
import React from 'react';
import { fetchRepositories } from '../services/GithubService';
import { Repository } from '../interfaces/Repository';

const Tab1: React.FC = () => {
  const[repositoryList, setRepositoryList] = React.useState<Repository []>([]);

  const fetchRepos = async () => {
    try{
      const repos = await fetchRepositories();
      setRepositoryList(repos);
    } catch (error) {
      console.error('Error obteniendo repositorios:', error);
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
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Listas de Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>

          {repositoryList.map((repo) => (
            <RepoItem {...repo} key={repo.id}/>
          ))}
          
        </IonList>

      </IonContent>
    </IonPage>
  );
};

export default Tab1;
