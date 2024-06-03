using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TheHome.SistemaDeGestao.Business.Estagios
{
    public abstract class Estagio : Entity<long>
    {
        [Required]
        public virtual DateTime DataInicio { get; set; }
    }
    public class EstagioFinal : Estagio { }
    public abstract class EstagioNaoFinal<T> : Estagio
        where T : Estagio
    {
        [Required]
        public virtual DateTime PrevisaoConclusao { get; set; }
        public virtual T ProximoEstagio { get; set; }
        public virtual DateTime? DataCancelamento { get; set; }
        [NotMapped]
        public virtual bool Cancelado => DataCancelamento != null;
    }
}
