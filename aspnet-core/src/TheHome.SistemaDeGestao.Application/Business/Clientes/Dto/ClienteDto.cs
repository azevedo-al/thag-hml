using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheHome.SistemaDeGestao.Business.Enderecos;
using Abp.AutoMapper;

namespace TheHome.SistemaDeGestao.Business.Clientes.Dto
{
    [AutoMapFrom(typeof(Cliente))]
    [AutoMapTo(typeof(Cliente))]
    public class ClienteDto : EntityDto
    {
        [Required]
        [MaxLength(100)]
        public string Nome { get; set; }

        [Required]
        [EmailAddress]
        [MaxLength(100)]
        public string Email { get; set; }

        [Required]
        [MaxLength(20)]
        public string Telefone1 { get; set; }

        [Required]
        [MaxLength(20)]
        public string Telefone2 { get; set; }

        [Required]
        public int EnderecoResidenciaId { get; set; }
        [ForeignKey("EnderecoResidenciaId")]
        public Endereco EnderecoResidencia { get; set; }
    }
}
