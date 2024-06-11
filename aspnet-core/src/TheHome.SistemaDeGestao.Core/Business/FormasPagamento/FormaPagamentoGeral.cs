using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TheHome.SistemaDeGestao.Business.FormasPagamento
{
    public class FormaPagamentoGeral : Entity
    {
        [Required, MaxLength(100)]
        public virtual string Nome { get; set; }
    }
}
