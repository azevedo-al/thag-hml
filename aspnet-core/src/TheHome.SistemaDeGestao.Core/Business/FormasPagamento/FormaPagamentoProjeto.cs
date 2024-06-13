using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TheHome.SistemaDeGestao.Business.FormasPagamento
{
    public class FormaPagamentoProjeto : Entity
    {
        [MaxLength(250)]
        public virtual string Descricao { get; set; }

        [Range(0, 1)]
        public virtual float  Desconto  { get; set; }
        
        public virtual float  Juros     { get; set; }

        public virtual ICollection<FormaPagamentoGeral> FormasPagamentoAceitas { get; }
        public virtual ICollection<ParcelaProjeto> Parcelas { get; }
    }
    public class ParcelaProjeto : Entity
    {
        [Range(0, 1)]
        public virtual float ParteValor { get; set; }
        public virtual float ValorFixo { get; set; }
    }
}
