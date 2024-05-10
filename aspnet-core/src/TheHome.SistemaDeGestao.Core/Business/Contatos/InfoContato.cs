using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TheHome.SistemaDeGestao.Business.Contatos
{
    public class InfoContato : Entity<long>
    {
        [Required, EmailAddress, MaxLength(250)]
        public virtual string Email { get; set; }

        [Required, MaxLength(5)]
        public virtual string Telefone1_DDD { get; set; }
        [Required, MaxLength(10)]
        public virtual string Telefone1_Numero { get; set; }


        [MaxLength(5)]
        public virtual string Telefone2_DDD { get; set; }
        [MaxLength(10)]
        public virtual string Telefone2_Numero { get; set; }
    }
}
