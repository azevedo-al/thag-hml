using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheHome.SistemaDeGestao.Business.Enderecos;
using TheHome.SistemaDeGestao.Business.Pessoas;
using TheHome.SistemaDeGestao.Business.Projetos;

namespace TheHome.SistemaDeGestao.Business.Clientes
{
    public class Cliente : Entity<long>
    {
        [Required]
        public virtual long PessoaId { get; set; }
        [ForeignKey("PessoaId")]
        public virtual Pessoa Pessoa { get; }
        [Required]
        public virtual ICollection<long> ProjetosId { get; set; }
        [ForeignKey("ProjetosId")]
        public virtual ICollection<Projeto> Projetos { get; }
    }
}
