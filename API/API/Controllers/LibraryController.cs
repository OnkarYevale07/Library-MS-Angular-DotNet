using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LibraryController : ControllerBase
    {
        public LibraryController(Context context,EmailService emailService,JwtService jwtService) {
            Context = context;
            EmailService = emailService;
            JwtService = jwtService;
        }
        public Context Context { get; }
        public EmailService EmailService { get; }
        public JwtService JwtService { get; }

        [HttpPost("Register")]
        public ActionResult Register(User user)
        {
            user.AccountStatus = AccountStatus.UNAPPROVED;
            user.UserType = UserType.STUDENT;
            user.CreatedOn = DateTime.Now;
            Context.Users.Add(user);
            Context.SaveChanges();

            const string subject = "Account Created";
            var body = $"""
                <html>
                <body>
                <h2>Hello, {user.FirstName} {user.LastName}</h2>
                <h3>
                Your account has been created and we have sent approval request to admin.
                Once the request is approved by admin you will receive email, and you will be able to login in to your account.
                </h3>
                <h4>Thanks</h4>
                </body>
                </html>
                """;

            EmailService.SendEmail(user.Email, subject, body);

            return Ok(@"Thank you for registering.
Your account has been sent for approval.
Once it is approved, you will get an email.");
        }

        [HttpGet("Login")]
        public ActionResult Login(string email, string password) {
            if(Context.Users.Any(u=>u.Email.Equals(email) && u.Password.Equals(password)))
            {
                var user = Context.Users.Single(user => user.Email.Equals(email) && user.Password.Equals(password));
                if(user != null)
                {
                    if (user.AccountStatus == AccountStatus.UNAPPROVED)
                    {
                        return Ok("unapproved");
                    }
                    return Ok(JwtService.GenerateToken(user));
                }
            }
            return Ok("Not Found");
        }


    }
}
