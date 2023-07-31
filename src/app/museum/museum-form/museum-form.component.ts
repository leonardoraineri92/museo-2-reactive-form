import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  Validators,
  NonNullableFormBuilder,
  FormControl,
} from '@angular/forms';
import { DataParams, DetailsArtistForm } from 'src/app/models/interface';
import { PaintingDetailArtist } from 'src/app/models/painting';

@Component({
  selector: 'app-museum-form',
  templateUrl: './museum-form.component.html',
  styleUrls: ['./museum-form.component.scss'],
})
export class MuseumFormComponent implements OnChanges {
  @Input() detailsArtist: PaintingDetailArtist | undefined = {
    name: '',
    surname: '',
  };

  @Output() editArtist: EventEmitter<DataParams> = new EventEmitter();

  form = this.fb.group<DetailsArtistForm>({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
  });

  constructor(private fb: NonNullableFormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { detailsArtist: detailsArtistChange } = changes;
    if (this.detailsArtist && detailsArtistChange) {
      return this.form.patchValue(this.detailsArtist);
    }
  }

  onEditArtist(): void {
    const data: DataParams = {
      artist: {
        name: this.form.value.name,
        surname: this.form.value.surname,
      },
    };
    this.editArtist.emit(data);

    //form.value restituisce l'oggetto e tiene conto delle validazioni impostando il form come touched
    //form.getRawValue() restituisce il valore grezzo non tiene conto delle validazioni
    //form.valueChanges() Observable
  }
}
