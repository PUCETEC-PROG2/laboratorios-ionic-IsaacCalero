import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonThumbnail, useIonToast } from '@ionic/react';
import { Repository } from '../interfaces/Repository';
import './RepoItem.css';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { pencil, trash } from 'ionicons/icons';
import { deleteRepository } from '../services/GithubService';

const RepoItem: React.FC<Repository & { onDelete?: () => void }> = (repository) => {
    const [present] = useIonToast();
    const history = useHistory();

    const handleDelete = async () => {
        try {
            await deleteRepository(repository.owner.login, repository.name);
            present({
                message: 'Repositorio eliminado exitosamente',
                duration: 2000,
                color: 'success'
            });
            if (repository.onDelete) {
                repository.onDelete();
            }
        } catch (error) {
            present({
                message: 'Error al eliminar el repositorio: ' + (error as Error).message,
                duration: 3000,
                color: 'danger'
            });
        }
    };

    const handleEdit = () => {
        history.push(`/edit/${repository.owner.login}/${repository.name}`);
    };

    return (
        <IonItemSliding>
            <IonItem>
              <IonThumbnail slot="start">
                <img src = {repository.owner.avatar_url}
                 alt="Avatar" 
                 />
              </IonThumbnail>
              <IonLabel>  
                <h3>{repository.name}</h3>
                {repository.description && (
                  <p>{repository.description}</p>
                )}
                {repository.language && (
                  <p><strong>Lenguaje:</strong> {repository.language}</p>
                )}
              </IonLabel>
            </IonItem>
            <IonItemOptions>

              <IonItemOption color="primary" onClick={handleEdit}>
                <IonIcon icon= {pencil} slot= "icon-only"/>
              </IonItemOption>

            <IonItemOption color="danger" onClick={handleDelete}>
              <IonIcon icon= {trash} slot= "icon-only"/>
            </IonItemOption>

            </IonItemOptions>
          </IonItemSliding>
    );
}


export default RepoItem;