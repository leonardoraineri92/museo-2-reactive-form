import { Component, OnDestroy, OnInit } from '@angular/core';
import { MuseumService } from '../service/museum.service';
import { Museum } from 'src/app/models/museum';
import { Observable, Subscription } from 'rxjs';
import { Nullish } from 'src/app/models/nullish';
import { Painting } from 'src/app/models/painting';
import { Gallery } from 'src/app/models/gallery';
import { DataParams, ValueFilter } from 'src/app/models/interface';

@Component({
  selector: 'app-museum-page',
  templateUrl: './museum-page.component.html',
  styleUrls: ['./museum-page.component.scss'],
})
export class MuseumPageComponent implements OnInit, OnDestroy {
  museumData: Nullish<Museum>;
  museumDataFiltered: Nullish<Museum>;
  observable: Observable<Museum> = this.museumService.loadMuseum();
  subscription: Subscription = new Subscription();

  filters: ValueFilter | undefined;

  constructor(private museumService: MuseumService) {}

  ngOnInit(): void {
    this.subscription = this.observable.subscribe((museumSub) => {
      this.museumData = museumSub;
      this.museumDataFiltered = museumSub;
    });

    //non ha senzo farlo cosi, ma mi attengo all'esercizio,
    //ho richiamato la funzione get nell'OnInit per non farlo triggherare in continuazione
    this.filters = this.loadFilters;
  }

  //richiamare la funzione anche onsearch nei filtri
  get loadFilters(): ValueFilter {
    return {
      artistsName: this.loadFilterArtists(),
      paintingsName: this.loadFilterPaintingsName(),
    };
  }

  loadFilterArtists(): string[] {
    if (!this.museumData) {
      return [];
    }
    return this.museumData.galleries.reduce<string[]>((artists, gallery) => {
      gallery.paintings.forEach((painting) => {
        const fullName = `${painting.details.artist?.name} ${painting.details.artist?.surname}`;
        if (!artists.includes(fullName)) {
          artists = [...artists, fullName];
        }
      });
      return artists;
    }, []);
  }

  loadFilterPaintingsName(): string[] {
    if (!this.museumData) {
      return [];
    }
    return this.museumData.galleries.reduce<string[]>((paintings, gallery) => {
      gallery.paintings.forEach((painting) => {
        if (!paintings.includes(painting.name)) {
          paintings = [...paintings, painting.name];
        }
      });
      return paintings;
    }, []);
  }

  onChangeStatus(event: DataParams): void {
    this.updateMuseumData(
      (museum: Museum): Museum => this.onChangeStatusMuseum(museum, event),
    );
  }

  onEditArtist(event: DataParams): void {
    this.updateMuseumData(
      (museum: Museum): Museum => this.onEditArtistMuseum(museum, event),
    );
    this.filters = this.loadFilters;
  }

  updateMuseumData(fx: (museum: Museum) => Museum) {
    if (!this.museumData || !this.museumDataFiltered) {
      return;
    }
    this.museumData = fx(this.museumData);
    this.museumDataFiltered = fx(this.museumDataFiltered);
  }

  onChangeStatusMuseum(museum: Museum, event: DataParams): Museum {
    return {
      ...museum,
      galleries: [...museum.galleries].map((gallery) => {
        return this.editPaintingGallery(event, gallery, this.changeStatus);
      }),
    };
  }

  onEditArtistMuseum(museum: Museum, event: DataParams): Museum {
    return {
      ...museum,
      galleries: [...museum.galleries].map((gallery) => {
        return this.editPaintingGallery(
          event,
          gallery,
          this.changeDetailsArtist,
        );
      }),
    };
  }

  editPaintingGallery(
    event: DataParams,
    gallery: Gallery,
    fx: (event: DataParams, paintings: Painting[]) => Painting[],
  ): Gallery {
    if (gallery.id === event.gallery?.idGallery) {
      return {
        ...gallery,
        paintings: fx(event, gallery.paintings),
      };
    }
    return gallery;
  }

  changeStatus(event: DataParams, paintings: Painting[]): Painting[] {
    return paintings.map((painting) => {
      if (painting.id === event.painting?.idPainting) {
        return { ...painting, status: !painting.status };
      }
      return painting;
    });
  }

  changeDetailsArtist(event: DataParams, paintings: Painting[]) {
    return paintings.map((painting) => {
      if (painting.id === event.painting?.idPainting) {
        return {
          ...painting,
          details: {
            ...painting.details,
            artist: {
              name: `${event.artist?.name}`,
              surname: `${event.artist?.surname}`,
            },
          },
        };
      }
      return painting;
    });
  }

  onSearch(event: Partial<ValueFilter>): void {
    this.museumDataFiltered = this.searchControl(event);
  }

  searchControl(filters?: Partial<ValueFilter>): Museum {
    let newMuseum: any = { ...this.museumData };
    debugger;
    if (filters) {
      if (filters?.artistsName?.length) {
        newMuseum = { ...newMuseum, ...this.findArtists(newMuseum, filters) };
      }

      if (filters.paintingsStatus != null) {
        newMuseum = { ...newMuseum, ...this.findByStatus(newMuseum, filters) };
      }

      if (filters?.paintingsName?.length) {
        newMuseum = { ...newMuseum, ...this.findPaintings(newMuseum, filters) };
      }
    }
    return newMuseum;
  }

  findArtists(museum: Museum, data: Partial<ValueFilter>): Museum {
    debugger;
    return {
      ...museum,
      galleries: museum.galleries
        .map((gallery) => {
          return {
            ...gallery,
            paintings: gallery.paintings.filter((painting) => {
              return data.artistsName?.some(
                (artistName) =>
                  this.replaceString(artistName) ===
                  this.replaceString(
                    `${painting.details.artist?.name}${painting.details.artist?.surname}`,
                  ),
              );
            }),
          };
        })
        .filter((gallery) => gallery.paintings.length),
    };
  }

  findByStatus(museum: Museum, data: Partial<ValueFilter>) {
    return {
      ...museum,
      galleries: museum.galleries
        .map((gallery) => {
          return {
            ...gallery,
            paintings: gallery.paintings.filter((painting) => {
              return data.paintingsStatus === painting.status;
            }),
          };
        })
        .filter((gallery) => gallery.paintings.length),
    };
  }

  findPaintings(museum: Museum, data: Partial<ValueFilter>) {
    return {
      ...museum,
      galleries: museum.galleries
        .map((gallery) => {
          return {
            ...gallery,
            paintings: gallery.paintings.filter((painting) =>
              data.paintingsName?.some(
                (paintingName) =>
                  this.replaceString(paintingName) ===
                  this.replaceString(painting.name),
              ),
            ),
          };
        })
        .filter((gallery) => gallery.paintings.length),
    };
  }

  replaceString(value: string) {
    return value.replace(/\s+/g, '').toLowerCase();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
