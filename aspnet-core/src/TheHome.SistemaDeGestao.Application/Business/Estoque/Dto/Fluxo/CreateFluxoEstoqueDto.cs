using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TheHome.SistemaDeGestao.Business.Estoque.Dto
{
    public abstract class CreateFluxoEstoqueDto
    {
        public virtual int? ItemId { get; set; }

        [Required, Range(0, 10000)]
        public virtual float Qtd { get; set; }

        [MaxLength(500)]
        public virtual string Desc { get; set; }
    }
    public class CreateUsoEstoqueDto : CreateFluxoEstoqueDto { }
    public class CreateAbastecimentoEstoqueDto : CreateFluxoEstoqueDto { }
}
