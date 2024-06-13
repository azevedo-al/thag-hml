using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TheHome.SistemaDeGestao.Business.Estoque.Dto
{
    public class UpdateItemEstoqueDto : BaseItemEstoqueDto
    {
        public virtual ICollection<CreateUsoEstoqueDto> NovosUsos { get; set; } = new List<CreateUsoEstoqueDto>();
        public virtual ICollection<CreateAbastecimentoEstoqueDto> NovosAbastecimentos { get; set; } = new List<CreateAbastecimentoEstoqueDto>();
    }
}
