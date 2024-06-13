using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TheHome.SistemaDeGestao.Business.Estoque.Dto
{
    public class PagedItemEstoqueResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
    }
}
