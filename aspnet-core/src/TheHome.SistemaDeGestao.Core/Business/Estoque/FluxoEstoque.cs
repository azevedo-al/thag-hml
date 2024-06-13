using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace TheHome.SistemaDeGestao.Business.Estoque
{
    public abstract class FluxoEstoque : Entity<long>
    {
        [Required]
        public virtual int ItemId { get; set; }
        [ForeignKey("ItemId")]
        public virtual ItemEstoque Item { get; set; }

        [Required]
        public virtual DateTime DataCadastroFluxo { get; set; }

        [Required, Range(0, 10000)]
        public virtual float Qtd { get; set; }

        [MaxLength(500)]
        public virtual string Desc { get; set; }

        public virtual DateTime? DataRetirado { get; set; }
        public virtual long? SubstitutoId { get; set; }
        [ForeignKey("SubstitutoId")]
        public virtual FluxoEstoque Substituto { get; set; }


        public virtual bool IsReal => DataRetirado is null;
        public virtual bool WasDeletado => !IsReal && Substituto is null;
        public virtual bool WasSubstituido => !IsReal && !WasDeletado;
    }

    public class UsoEstoque : FluxoEstoque { }
    public class AbastecimentoEstoque : FluxoEstoque { }
}
