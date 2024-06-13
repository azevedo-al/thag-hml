using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TheHome.SistemaDeGestao.Business.Estoque.Dto
{
    public class CreateItemEstoqueDto
    {
        [Required, MaxLength(200)]
        public virtual string Nome { get; set; }
        [MaxLength(500)]
        public virtual string Desc { get; set; }
        [Required, MaxLength(200)]
        public virtual string Unidade { get; set; }

        public float Total { get; set; } = 0;
    }
}
