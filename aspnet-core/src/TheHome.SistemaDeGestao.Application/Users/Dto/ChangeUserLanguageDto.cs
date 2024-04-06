using System.ComponentModel.DataAnnotations;

namespace TheHome.SistemaDeGestao.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}