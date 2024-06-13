using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheHome.SistemaDeGestao.Business.Estoque;

namespace TheHome.SistemaDeGestao.Business.Financeiro
{
    public class Compra : Entity<long>
    {
        [Required]
        public virtual Despesa Despesa { get; set; }
        public virtual ICollection<AbastecimentoEstoque> AdicoesAoEstoque {  get; set; }
        [MaxLength(300)]
        public virtual string Descricao { get; set; }
    }
}
