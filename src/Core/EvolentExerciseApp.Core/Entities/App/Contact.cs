using ContactManagerApp.Core.Entities.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace ContactManagerApp.Core.Entities.App
{
    public class Contact : BaseEntity
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Status { get; set; }
    }
}
