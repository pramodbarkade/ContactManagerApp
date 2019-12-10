using System;
using System.Collections.Generic;
using System.Text;

namespace ContactManagerApp.Core.Entities.Common
{
    public sealed class ApiResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public dynamic Data { get; set; }
        public ApiResponse(bool status, string message, dynamic data)
        {
            Status = status;
            Message = message;
            Data = data;
        }
    }
}
