using GeomappingDemo.TopographyModel;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var policyName = "_myAllowSpecificOrigins";

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddAutoMapper(typeof(Program));
builder.Services.AddDbContext<TopographyDemoContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("TopographyDemoContext")));
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: policyName,
    builder =>
    {
        builder
        .WithOrigins("http://localhost:5001"
        )
        .AllowAnyOrigin()
        .WithMethods("*")
        .AllowAnyHeader()
        .AllowAnyMethod()
        .SetIsOriginAllowed(origin => true);
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
}
app.UseStaticFiles();

app.UseRouting();

//app.UseAuthorization();
app.MapControllers();
app.UseCors(policyName);
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
