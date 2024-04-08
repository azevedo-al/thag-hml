using Abp.Application.Services.Dto;
using System;

namespace TheHome.SistemaDeGestao.Business.Clientes.Dto
{
    //custom PagedResultRequestDto
    public class PagedClienteResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
        public bool? IsActive { get; set; }
    }
}
