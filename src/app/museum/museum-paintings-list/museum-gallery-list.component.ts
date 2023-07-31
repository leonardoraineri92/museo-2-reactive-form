import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataParams } from 'src/app/models/interface';
import { Painting } from 'src/app/models/painting';

@Component({
  selector: 'app-museum-paintings-list',
  templateUrl: './museum-gallery-list.component.html',
  styleUrls: ['./museum-gallery-list.component.scss'],
})
export class MuseumPaintingListComponent {
  @Input() museum: Painting[] | undefined;
  @Output() changeStatus: EventEmitter<DataParams> = new EventEmitter();
  @Output() editArtist: EventEmitter<DataParams> = new EventEmitter();

  onChangeStatus(event: DataParams) {
    this.changeStatus.emit(event);
  }

  onEditArtist(event: DataParams): void {
    this.editArtist.emit(event);
  }
}
