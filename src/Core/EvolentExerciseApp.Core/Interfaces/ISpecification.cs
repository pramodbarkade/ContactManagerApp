using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace ContactManagerApp.Core.Interfaces
{
   public interface ISpecification<T>
    {
        Expression<Func<T, bool>> Criteria { get; }
        List<Expression<Func<T, object>>> Includes { get; }
        List<string> IncludeStrings { get; }
    }
}
