using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheHome.SistemaDeGestao.Business.Estagios.Entregas;
using TheHome.SistemaDeGestao.Business.Estoque;
using TheHome.SistemaDeGestao.Business.Financeiro;

namespace TheHome.SistemaDeGestao.Business.Estagios.Producoes
{
    public class EstagioProducao : EstagioNaoFinal<EstagioEntrega>
    {
        public virtual ICollection<ChecklistItem> Checklist { get; set; }
        public virtual ICollection<UsoEstoque>    UsosEstoque { get; set; }
        public virtual ICollection<Compra>        Compras { get; set; }
    }

    public class ChecklistItem : Entity<long>
    {
        [Required, MaxLength(300)]
        public virtual string Desc { get; set; }
        [Required]
        public virtual bool IsChecked { get; set; }
    }
}
