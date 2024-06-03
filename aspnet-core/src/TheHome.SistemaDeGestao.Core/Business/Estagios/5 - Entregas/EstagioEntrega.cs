using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheHome.SistemaDeGestao.Business.Financeiro;

namespace TheHome.SistemaDeGestao.Business.Estagios.Entregas
{
    public class EstagioEntrega : EstagioNaoFinal<EstagioFinal>
    {
        public virtual ICollection<Receita> Pagamentos { get; set; }
    }
}
