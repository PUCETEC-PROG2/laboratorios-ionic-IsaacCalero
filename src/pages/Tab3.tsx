import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil De Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perfil De Usuario</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="card-container">
          <IonCard className="card">
            <img src="https://avatars.githubusercontent.com/u/217294512?v=4&size=64" 
            alt="Avatar" className="avatar"/>

            <IonCardHeader>
              <IonCardTitle>Isaac Calero</IonCardTitle>
              <IonCardSubtitle>isaacalero</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
              <p>Estudiante de Desarrollo de Software, me gusta el desarrollo web y móvil</p>
              <p>Estudiante que le gusta el desarrollo y los videojuegos</p>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
