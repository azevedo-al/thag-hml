using Abp.AutoMapper;
using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TheHome.SistemaDeGestao.Business.Enderecos
{
    public class Endereco : Entity
    {
        [Required]
        [MaxLength(10)]
        public virtual string Numero { get; set; }

        [Required]
        [MaxLength(50)]
        public virtual string Logradouro { get; set; }

        [Required]
        [MaxLength(50)]
        public virtual string Bairro { get; set; }

        [Required]
        [MaxLength(50)]
        public virtual string Cidade { get; set; }

        [Required]
        [MaxLength(2)]
        public virtual string UF { get; set; }

        [MaxLength(10)]
        public virtual string CEP { get; set; }

        [MaxLength(100)]
        public virtual string Complemento1 { get; set; }

        [MaxLength(100)]
        public virtual string Complemento2 { get; set; }
    }
}
