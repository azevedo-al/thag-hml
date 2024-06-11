using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TheHome.SistemaDeGestao.Business.Estoque.Dto
{
    public class UpdateFluxoEstoqueDto : EntityDto<long>
    {
        [MaxLength(500)]
        public virtual string Desc { get; set; } = null;

        public virtual CreateFluxoEstoqueDto Substituto { get; set; } = null;

        public bool isDeletion => Substituto is null && Desc is null;
        public bool isDescUpdate => Substituto is null && Desc is not null;
        public bool isEdition => Substituto is not null && Desc is null;
    }
}
