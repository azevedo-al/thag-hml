using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TheHome.SistemaDeGestao.Business.Estoque
{
    public class ItemEstoque : AggregateRoot
    {
        [Required, MaxLength(200)]
        public virtual string Nome    { get; set; }
        [MaxLength(500)]
        public virtual string Desc { get; set; }
        [Required, MaxLength(200)]
        public virtual string Unidade { get; set; }

        [Required]
        public float Total { get; set; } = 0;

        public virtual ICollection<FluxoEstoque> Movimentos { get; set; } = new List<FluxoEstoque>();
    }
}
