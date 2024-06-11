using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TheHome.SistemaDeGestao.Business.Estoque.Dto
{
    public abstract class FluxoEstoqueDto : EntityDto<long>
    {
        [Required]
        public virtual int ItemId { get; set; }

        [Required]
        public virtual DateTime DataCadastroFluxo { get; set; }

        [Required, Range(0, 10000)]
        public virtual float Qtd { get; set; }

        [MaxLength(500)]
        public virtual string Desc { get; set; }

        public virtual DateTime? DataRetirado { get; set; }
        public virtual FluxoEstoque Substituto { get; set; }

        public virtual bool IsReal => DataRetirado is null;
        public virtual bool Deletado => !IsReal && Substituto is null;
        public virtual bool Substituido => !IsReal && !Deletado;
    }

    public class UsoEstoqueDto : FluxoEstoqueDto { }
    public class AbastecimentoEstoqueDto : FluxoEstoqueDto { }
}
