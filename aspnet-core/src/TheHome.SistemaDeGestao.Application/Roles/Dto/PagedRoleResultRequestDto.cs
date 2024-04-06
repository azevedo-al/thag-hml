using Abp.Application.Services.Dto;

namespace TheHome.SistemaDeGestao.Roles.Dto
{
    public class PagedRoleResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
    }
}

