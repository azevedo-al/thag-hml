using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheHome.SistemaDeGestao.Business.Enderecos;
using TheHome.SistemaDeGestao.Business.Contatos;
using TheHome.SistemaDeGestao.Business.Clientes;
using TheHome.SistemaDeGestao.Business.Fornecedores;

namespace TheHome.SistemaDeGestao.Business.Pessoas
{
    public class Pessoa : AggregateRoot<long>
    {
        [Required, MaxLength(500)]
        public virtual string Nome { get; set; }
        [Required]
        public virtual bool IsPJ { get; set; }
        [Required, MaxLength(20)]
        public virtual string CPF_CNPJ { get; set; }
        [Required]
        public virtual DateTime? DataNascimento { get; set; }

        [Required]
        public virtual InfoContato InfoContato { get; set; }

        [Required]
        public virtual long EnderecoResidenciaId { get; set; }
        [ForeignKey("EnderecoResidenciaId")]
        public virtual Endereco EnderecoResidencia { get; set; }

        public virtual Cliente    Cliente { get; set; }
        public virtual Fornecedor Fornecedor  { get; set; }
    }
}
