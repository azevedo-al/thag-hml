import { Component, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ProjetoDetailsDialogComponent } from './projeto-details/projeto-details-dialog.component';
import { IEnderecoDto, EnderecoDto } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';

export class ProjetoNotaDto {
  data:  string = "01/01/2024";
  texto: string = "Lorem ipsum dolor sit...";
  constructor (
    data?:string, 
    texto?:string) {
    if (data)  this.data  = data;
    if (texto) this.texto = texto;
  }
}

class MockEndereco implements IEnderecoDto {
  constructor (
    public id: number = 0,
    public numero: string = "1",
    public logradouro: string = "R dos Exemplos",
    public bairro: string = "Vila Exemplar",
    public cidade: string = "São Luis",
    public uf: string = "MA",
    public cep: string | undefined = undefined,
    public complemento1: string | undefined = undefined,
    public complemento2: string | undefined = undefined) {  }
}

export class VisitaDto {
  public medidas   : string = "medidas medidas";
  public obs       : string = "";
  public fotos     : string[] = ["ex1.png"];
  public concluida : boolean = false;
  constructor(
    medidas?   : string,
    obs?       : string,
    fotos?     : string[],
    concluida? : boolean) { 
      if (medidas)   this.medidas   = medidas;
      if (obs)       this.obs       = obs;
      if (fotos)     this.fotos     = fotos;
      if (concluida) this.concluida = concluida;
    }
}

export class ProjetoDto { 
  cliente: string = "Arthur";
  tipo: string = "Tipo1";
  status: string = "Visita";
  prazo: string = "01/01/2025";
  endereco: EnderecoDto = new EnderecoDto(new MockEndereco());
  notas: ProjetoNotaDto[] = [];
  visita: VisitaDto = new VisitaDto();

  constructor (
    cliente?:string, 
    tipo?:string, 
    status?:string, 
    prazo?:string,
    endereco?:EnderecoDto,
    notas?:ProjetoNotaDto[],
    visita?:VisitaDto) {
    if (cliente)  this.cliente  = cliente;
    if (tipo)     this.tipo     = tipo;
    if (status)   this.status   = status;
    if (prazo)    this.prazo    = prazo;
    if (endereco) this.endereco = endereco;
    if (notas)    this.notas    = notas;
    if (visita)   this.visita   = visita;
  }
}

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html'
})
export class ProjetosComponent {
  public pageSize = 10;
  public pageNumber = 1;
  totalItems:number = 7;
  projetos: ProjetoDto[] = [
    new ProjetoDto(),
    new ProjetoDto("Heitor",  "Tipo2", "Projeto", undefined, undefined, [new ProjetoNotaDto()], new VisitaDto(undefined, undefined, ["foto1.png", "foto2.png"])),
    new ProjetoDto("Leandro", "Tipo3", "Orçamento", undefined, undefined, [new ProjetoNotaDto(), new ProjetoNotaDto()]),
    new ProjetoDto("Davi",    "Tipo1", "Contrato"),
    new ProjetoDto("Aluisio", "Tipo3", "Em produção"),
    new ProjetoDto("Arthur",  "Tipo2", "Entregue"),
    new ProjetoDto("Aluisio", "Tipo2", "Pago", "-")
  ];
  keyword = '';
  isTableLoading: boolean = false;
  isActive: boolean | null;
  advancedFiltersVisible = false;
  
  constructor(
    injector: Injector,
    private _modalService: BsModalService
  ) { }
  
  createProjeto() { }
  detailsProjeto(projeto: ProjetoDto) {
    let ProjetoDetailsDialog: BsModalRef;
    ProjetoDetailsDialog = this._modalService.show(
      ProjetoDetailsDialogComponent,
      {
        class: 'modal-lg',
        initialState: {
          projeto: projeto,
        },
      }
    );

    ProjetoDetailsDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
  getDataPage(pageNumber: number) { }
  clearFilters() { }
  refresh() { }
}
