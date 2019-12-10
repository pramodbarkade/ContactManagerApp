using ContactManagerApp.Core.Entities.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace ContactManagerApp.Core.Interfaces
{
    public interface IRepository<T> where T : BaseEntity
    {
        T GetById(int id);
        T GetSingleBySpec(ISpecification<T> spec);
        IEnumerable<T> GetAll();
        IEnumerable<T> Get(ISpecification<T> spec);
        T Add(T entity);
        void Update(T entity);
        void Delete(T entity);
    }
}
