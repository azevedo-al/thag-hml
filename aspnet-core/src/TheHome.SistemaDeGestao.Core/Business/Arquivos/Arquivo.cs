using Abp.Domain.Entities;
using JetBrains.Annotations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TheHome.SistemaDeGestao.Business.Arquivos
{
    public abstract class Arquivo : Entity<long>
    {
        [Required, PathReference]
        public virtual string Path {  get; set; } 
    }
    public class Foto : Arquivo { }
    public class PDF  : Arquivo { }
}
