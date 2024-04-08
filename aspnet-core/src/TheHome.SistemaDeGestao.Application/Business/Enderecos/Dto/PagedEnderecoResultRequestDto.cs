using Abp.Application.Services.Dto;
using System;

namespace TheHome.SistemaDeGestao.Business.Enderecos.Dto
{
    //custom PagedResultRequestDto
    public class PagedEnderecoResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
        public bool? IsActive { get; set; }
    }
}
