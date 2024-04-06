using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheHome.SistemaDeGestao.Business.Enderecos;

namespace TheHome.SistemaDeGestao.Business.Clientes
{
    public class Cliente : Entity
    {
        [Required]
        [MaxLength(200)]
        public virtual string Nome { get; set; }

        [Required]
        [EmailAddress]
        [MaxLength(100)]
        public virtual string Email { get; set; }

        [Required]
        [MaxLength(20)]
        public virtual string Telefone1 { get; set; }

        [MaxLength(20)]
        public virtual string Telefone2 { get; set; }

        [Required]
        public virtual int EnderecoResidenciaId { get; set; }
        [ForeignKey("EnderecoResidenciaId")]
        public virtual Endereco EnderecoResidencia { get; set; }
    }
}
