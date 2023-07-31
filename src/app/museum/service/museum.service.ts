import { Observable, of } from 'rxjs';
import { Museum } from 'src/app/models/museum';

export class MuseumService {
  museum: Museum = {
    id: 1,
    name: 'Museo del Louvre',
    galleries: [
      {
        id: 1,
        name: 'Nome Galleria 1',
        paintings: [
          {
            id: 1,
            name: 'Nome Quadro 1',
            price: 300,
            img: 'https://www.irenedurbano.it/wp-content/uploads/2021/02/eco-lestate-che-se-ne-va-60x60-1.jpg',
            status: true,
            details: {
              artist: {
                name: 'Leonardo',
                surname: 'Da Vinci',
              },
              year: '1600',
              heigth: 30,
              width: 60,
            },
          },
          {
            id: 2,
            name: 'Nome Quadro 2',
            price: 400,
            img: 'https://www.irenedurbano.it/wp-content/uploads/2021/02/eco-levare-del-sole-105x70-1.jpg',
            status: true,
            details: {
              artist: {
                name: 'Picasso',
                surname: '',
              },
              year: '1600',
              heigth: 30,
              width: 60,
            },
          },
          {
            id: 3,
            name: 'Nome Quadro 3',
            price: 700,
            img: 'https://www.pitturiamo.com/it/immagine/quadro-moderno/quadri-moderni-dipinti-a-mano-fiori-albero-vita-astratto-su-tela-artigianale-146570.jpg',
            status: true,
            details: {
              artist: {
                name: 'Monet',
                surname: '',
              },
              year: '1600',
              heigth: 30,
              width: 60,
            },
          },
        ],
      },
      {
        id: 2,
        name: 'Nome Galleria 2',
        paintings: [
          {
            id: 1,
            name: 'Nome Quadro 4',
            price: 600,
            img: 'https://agavequadri.it/wp-content/uploads/2020/01/AG110044.jpg',
            status: false,
            details: {
              artist: {
                name: 'Munch',
                surname: '',
              },
              year: '1600',
              heigth: 30,
              width: 60,
            },
          },
          {
            id: 2,
            name: 'Nome Quadro 5',
            price: 1000,
            img: 'https://www.pitturiamo.com/it/immagine/quadro-moderno/quadri-moderni-dipinti-a-mano-fiori-albero-vita-astratto-su-tela-artigianale-146570.jpg',
            status: true,
            details: {
              artist: {
                name: 'Riccardo',
                surname: 'Petralia',
              },
              year: '2023',
              heigth: 40,
              width: 70,
            },
          },
          {
            id: 3,
            name: 'Nome Quadro 6',
            price: 1000,
            img: 'https://www.irenedurbano.it/wp-content/uploads/2021/02/eco-lestate-che-se-ne-va-60x60-1.jpg',
            status: true,
            details: {
              artist: {
                name: 'Van gogh',
                surname: '',
              },
              year: '1600',
              heigth: 30,
              width: 60,
            },
          },
        ],
      },
    ],
  };

  loadMuseum(): Observable<Museum> {
    return of(this.museum);
  }
}
