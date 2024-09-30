using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class RegisterDTO
{
    [Required]
    public required string Username {get; set;}
    public required string Password { get; set; }
}
