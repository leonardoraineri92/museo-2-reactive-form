import { FormControl } from '@angular/forms';
import { Nullish } from './nullish';

export interface ValueFilter {
  artistsName: string[];
  paintingsStatus?: boolean | null;
  paintingsName: string[];
}

export interface FormArtists {
  artistsName: FormControl<string[]>;
  paintingsStatus: FormControl<Nullish<boolean>>;
  paintingsName: FormControl<string[]>;
}

export interface DetailsArtistForm {
  name: FormControl<Nullish<string>>;
  surname: FormControl<Nullish<string>>;
}

export interface DataParams {
  artist?: { name: Nullish<string>; surname: Nullish<string> };
  painting?: { idPainting: number };
  gallery?: { idGallery: number };
}
