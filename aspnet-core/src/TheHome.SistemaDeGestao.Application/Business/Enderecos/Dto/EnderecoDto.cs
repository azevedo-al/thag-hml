using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TheHome.SistemaDeGestao.Business.Enderecos.Dto
{
    [AutoMapFrom(typeof(Endereco))]
    [AutoMapTo(typeof(Endereco))]
    public class EnderecoDto : EntityDto<long>
    {
        [Required]
        [MaxLength(10)]
        public string Numero { get; set; }

        [Required]
        [MaxLength(50)]
        public string Logradouro { get; set; }

        [Required]
        [MaxLength(50)]
        public string Bairro { get; set; }

        [Required]
        [MaxLength(50)]
        public string Cidade { get; set; }

        [Required]
        [MaxLength(2)]
        public string UF { get; set; }

        [MaxLength(10)]
        public string CEP { get; set; }

        [MaxLength(100)]
        public string Complemento1 { get; set; }

        [MaxLength(100)]
        public string Complemento2 { get; set; }
    }
}
