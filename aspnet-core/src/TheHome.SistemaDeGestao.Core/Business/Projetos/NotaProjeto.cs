using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TheHome.SistemaDeGestao.Business.Projetos
{
    public class NotaProjeto : Entity<long>
    {
        [Required]
        public virtual long ProjetoId { get; set; }
        [ForeignKey("ProjetoId")]
        public virtual Projeto Projeto { get; set; }
        [Required]
        public virtual DateTime Date {  get; set; }
        [Required]
        [StringLength(500)]
        public virtual string Corpo {  get; set; }
    }
}
