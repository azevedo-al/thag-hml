using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheHome.SistemaDeGestao.Business.Clientes;
using TheHome.SistemaDeGestao.Business.Enderecos;
using TheHome.SistemaDeGestao.Business.Estagios;
using TheHome.SistemaDeGestao.Business.Estagios.Contratos;
using TheHome.SistemaDeGestao.Business.Estagios.Entregas;
using TheHome.SistemaDeGestao.Business.Estagios.Orcamentos;
using TheHome.SistemaDeGestao.Business.Estagios.Producoes;
using TheHome.SistemaDeGestao.Business.Estagios.Visitas;

namespace TheHome.SistemaDeGestao.Business.Projetos
{
    public class Projeto : AggregateRoot<long>
    {
        [Required]
        public virtual Cliente Cliente { get; set; }
        [Required, MaxLength(100)]
        public virtual string Tipo { get; set; }
        [Required]
        public virtual ICollection<NotaProjeto> Notas { get; set; }

        [Required]
        public virtual long LocalId { get; set; }
        [ForeignKey("LocalId")]
        public virtual Endereco Local { get; set; }

        [Required]
        public virtual EstagioVisita Visita { get; set; }
        public EstagioOrcamento Orcamento => Visita    .ProximoEstagio;
        public EstagioContrato  Contrato  => Orcamento?.ProximoEstagio;
        public EstagioProducao  Producao  => Contrato? .ProximoEstagio;
        public EstagioEntrega   Entrega   => Producao? .ProximoEstagio;
        public EstagioFinal     Encerrado => Entrega?  .ProximoEstagio;
        public string Status
        {
            get
            {
                if (Orcamento is null) return nameof(Visita);
                if (Contrato  is null) return nameof(Orcamento);
                if (Producao  is null) return nameof(Contrato);
                if (Entrega   is null) return nameof(Producao);
                if (Encerrado is null) return nameof(Entrega);
                return nameof(Encerrado);
            }
        }
    }
}
