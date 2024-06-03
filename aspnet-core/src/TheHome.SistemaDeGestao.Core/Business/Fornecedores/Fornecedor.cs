using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheHome.SistemaDeGestao.Business.Pessoas;

namespace TheHome.SistemaDeGestao.Business.Fornecedores
{
    public class Fornecedor : Entity<long>
    {
        [Required]
        public virtual long PessoaId { get; set; }
        [ForeignKey("PessoaId")]
        public virtual Pessoa Pessoa { get; }
    }
}
