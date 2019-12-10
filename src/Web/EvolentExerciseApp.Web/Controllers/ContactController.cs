using System;
using System.Threading.Tasks;
using ContactManagerApp.Core.Entities.App;
using ContactManagerApp.Core.Entities.Common;
using ContactManagerApp.Core.Interfaces.Specific;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ContactManagerApp.Web.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v.{version:apiVersion}.0/[controller]")]
    public class ContactController : Controller
    {
        //===||
        private IContactRepository<Contact> _contact;
        private ILogger<ContactController> _logger;
        private ApiResponse apiResponse;

        //===|| 
        public ContactController(IContactRepository<Contact> contact, ILogger<ContactController> logger)
        {
            _contact = contact;
            _logger = logger;
        }

        //===|| GetList
        [HttpGet("[action]")]
        public async Task<IActionResult> GetList()
        {            
            try
            {
                var contactList = await _contact.GetList();
                apiResponse = new ApiResponse(true, ApiMessage.Success, contactList);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                apiResponse = new ApiResponse(false, ApiMessage.Error, null);
            }
            finally
            {

            }           
            return Ok(apiResponse);
        }       
    }
}
