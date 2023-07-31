import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataParams } from 'src/app/models/interface';
import { Painting } from 'src/app/models/painting';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent {
  @Input() museum: Painting[] | undefined;
  @Output() changeStatus: EventEmitter<DataParams> = new EventEmitter();
  @Output() editArtist: EventEmitter<DataParams> = new EventEmitter();

  onChangeStatus(event: DataParams): void {
    this.changeStatus.emit(event);
  }

  onEditArtist(event: DataParams): void {
    this.editArtist.emit(event);
  }
}
