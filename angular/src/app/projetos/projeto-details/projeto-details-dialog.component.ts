import { Component } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CommonModule } from '@angular/common';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ProjetoDto, ProjetoNotaDto } from '../projetos.component';
import * as moment from 'moment';


@Component({
  selector: 'app-projeto-details-dialog',
  templateUrl: './projeto-details-dialog.component.html'
})
export class ProjetoDetailsDialogComponent {
  projeto: ProjetoDto = new ProjetoDto();
  saving: boolean = false;
  constructor (public bsModalRef: BsModalRef) { }
  save() {}

  public enderecoDtoComplementoToString(complemento: string | undefined) : string {
    return complemento ? complemento + '<br>' : ''
  }

  creatingNewNote: boolean = false;
  hoje = moment();
  newNoteText:string = "";
  newNote() { this.creatingNewNote = true; }
  submitNote() { 
    this.projeto.notas.push(new ProjetoNotaDto(this.hoje.format("DD/mm/yyyy"), this.newNoteText));
    this.creatingNewNote = false; 
    this.newNoteText = "";
  }

  photos: number = 0;
  annexPhoto() {
    this.photos++;
    this.projeto.visita.fotos.push("AdditionalEx"+this.photos+".png");
  }
  finalizeVisit() { }
}
