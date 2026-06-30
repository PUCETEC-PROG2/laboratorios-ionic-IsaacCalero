import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonText, IonTextarea, IonTitle, IonToolbar, useIonToast, useIonViewWillEnter } from '@ionic/react';
import './EditRepo.css';
import { useHistory, useParams } from 'react-router-dom';
import React from 'react';
import { RepositoryPayload } from '../interfaces/RepositoryPayload';
import { updateRepository } from '../services/GithubService';
import LoadingSpinner from '../components/LoadingSpinner';

const EditRepo: React.FC = () => {
  const history = useHistory();
  const { owner, repoName } = useParams<{ owner: string; repoName: string }>();
  const [repositoryData, setRepositoryData] = React.useState<RepositoryPayload>({
    name: '',
    description: '',
  });

  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');
  const [present] = useIonToast();

  const updateRepo = async () => {
    if (repositoryData.name.trim() === '') {
      setErrorMsg('El nombre del repositorio es obligatorio.');
      return;
    }
    setLoading(true);
    updateRepository(owner, repoName, repositoryData).then(() => {
      present({
        message: 'Repositorio actualizado exitosamente',
        duration: 2000,
        color: 'success'
      });
      history.push('/tab1');
    }).catch((error) => {
      setErrorMsg("Error al actualizar el repositorio: " + error);
      present({
        message: 'Error al actualizar el repositorio: ' + error,
        duration: 3000,
        color: 'danger'
      });
      console.error("Error al actualizar el repositorio:", error);
    }).finally(() => {
      setLoading(false);
    });
  };

  useIonViewWillEnter(() => {
    setRepositoryData({
      name: repoName,
      description: '',
    });
    setErrorMsg('');
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Editar Repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Editar Repositorio</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="form-container">
          <IonInput
            className="form-field"
            label="Nombre del Repositorio"
            placeholder="Ingrese el nombre del repositorio"
            labelPlacement="floating"
            value={repositoryData.name}
            onIonInput={(e) => setRepositoryData({ ...repositoryData, name: e.detail.value! })}
          />

          <IonTextarea
            className="form-field"
            label="Descripción"
            placeholder="Ingrese la descripción del repositorio"
            labelPlacement="floating"
            value={repositoryData.description}
            onIonInput={(e) => setRepositoryData({ ...repositoryData, description: e.detail.value! })}
            rows={4}
          />

          {errorMsg && <IonText color="danger">{errorMsg}</IonText>}

          <IonButton
            className="submit-button"
            expand="block"
            fill="solid"
            color="primary"
            onClick={updateRepo}
          >
            Actualizar
          </IonButton>
        </div>

        {loading && <LoadingSpinner />}

      </IonContent>
    </IonPage>
  );
};

export default EditRepo;
