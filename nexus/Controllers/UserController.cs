using Microsoft.AspNetCore.Mvc;
using nexus.Helpers;
using nexus.Models;

namespace nexus.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private static readonly List<User> Users = JsonDeserializer.LoadData<List<User>>("users.json");

        private readonly ILogger<UserController> _logger;

        public UserController(ILogger<UserController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<User> Get(
            int? age = null,
            bool? active = null,
            string? sortBy = null,
            string? searchName = null)
        {
            // Filter users based on specific criteria
            var filteredUsers = FilterUsers(Users, age, active, searchName);

            // Sort users
            if (!string.IsNullOrEmpty(sortBy))
            {
                filteredUsers = SortUsers(filteredUsers, sortBy);
            }

            return filteredUsers;
        }

        private List<User> FilterUsers(List<User> users, int? age, bool? active, string? searchName)
        {
            return users.Where(u =>
                (!age.HasValue || u.Age == age) &&
                (!active.HasValue || u.Active == active) &&
                (string.IsNullOrEmpty(searchName) || u.Name.ToLower().Equals(searchName, StringComparison.OrdinalIgnoreCase))
            ).ToList();
        }

        private List<User> SortUsers(List<User> users, string sortBy)
        {
            switch (sortBy.ToLower())
            {
                case "lastlogin":
                    return users.OrderBy(u => u.LastLogin).ToList();
                case "active":
                    return users.OrderBy(u => u.Active).ToList();
                case "name":
                    return users.OrderBy(u => u.Name).ToList();
                case "age":
                    return users.OrderBy(u => u.Age).ToList();


                // Add more sorting options if needed
                default:
                    return users;
            }
        }
    }
}
