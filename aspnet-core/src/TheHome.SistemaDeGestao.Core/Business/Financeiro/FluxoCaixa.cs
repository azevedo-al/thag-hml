using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheHome.SistemaDeGestao.Business.Arquivos;
using TheHome.SistemaDeGestao.Business.Clientes;
using TheHome.SistemaDeGestao.Business.FormasPagamento;
using TheHome.SistemaDeGestao.Business.Fornecedores;

namespace TheHome.SistemaDeGestao.Business.Financeiro
{
    public abstract class FluxoCaixa : Entity<long>
    {
        [Required, DataType(DataType.Currency)]
        public virtual decimal Montante { get; set; }
        [Required]
        public virtual DateTime DataRegistro { get; set; }
        [Required]
        public virtual DateTime DataVencimento { get; set; }

        [MaxLength(300)]
        public virtual string Desc { get; set; }

        public virtual FormaPagamentoGeral FormaPagamento { get; set; }
        public virtual DateTime DataPagamento { get; set; }
        public virtual PDF Comprovante { get; set; }
    }

    public class Despesa : FluxoCaixa 
    {
        public virtual Fornecedor Fornecedor { get; set; }
    }
    public class Receita : FluxoCaixa 
    {
        public virtual Cliente Cliente { get; set; }
    }
}
