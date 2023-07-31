import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataParams } from 'src/app/models/interface';
import { Painting } from 'src/app/models/painting';

@Component({
  selector: 'app-museum-painting',
  templateUrl: './museum-painting.component.html',
  styleUrls: ['./museum-painting.component.scss'],
})
export class MuseumPaintingComponent {
  @Input() museum: Painting[] | undefined;
  @Output() changeStatus: EventEmitter<DataParams> = new EventEmitter();
  @Output() editArtist: EventEmitter<DataParams> = new EventEmitter();

  onChangeStatus(idPainting: number): void {
    this.changeStatus.emit({ painting: { idPainting } });
  }

  onEditArtist(event: DataParams, idPainting: number): void {
    const data = { ...event, painting: { idPainting } };
    this.editArtist.emit(data);
  }
}
