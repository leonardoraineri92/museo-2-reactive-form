import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Gallery } from 'src/app/models/gallery';
import { DataParams } from 'src/app/models/interface';
import { Museum } from 'src/app/models/museum';
import { Nullish } from 'src/app/models/nullish';

@Component({
  selector: 'app-galleries-list',
  templateUrl: './galleries-list.component.html',
  styleUrls: ['./galleries-list.component.scss'],
})
export class GalleriesListComponent {
  @Input() museum: Gallery[] | undefined;
  @Output() changeStatus: EventEmitter<DataParams> = new EventEmitter();
  @Output() editArtist: EventEmitter<DataParams> = new EventEmitter();

  onChangeStatus(event: DataParams, idGallery: number): void {
    this.changeStatus.emit({ ...event, gallery: { idGallery } });
  }

  onEditArtist(event: DataParams, idGallery: number): void {
    const data = { ...event, gallery: { idGallery } };
    this.editArtist.emit(data);
  }
}
