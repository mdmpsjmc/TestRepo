info: Microsoft.AspNetCore.DataProtection.KeyManagement.XmlKeyManager[0]
      User profile is available. Using 'C:\Users\user\AppData\Local\ASP.NET\DataProtection-Keys' as key repository and Windows DPAPI to encrypt keys at rest.
info: Microsoft.EntityFrameworkCore.Infrastructure[10403]
      Entity Framework Core 2.0.1-rtm-125 initialized 'ApplicationDbContext' using provider 'Microsoft.EntityFrameworkCore.SqlServer' with options: RowNumberPaging 
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (32ms) [Parameters=[@__normalizedName_0='?' (Size = 256)], CommandType='Text', CommandTimeout='30']
      SELECT TOP(1) [r].[Id], [r].[ConcurrencyStamp], [r].[CreatedAt], [r].[Description], [r].[IPAddress], [r].[Name], [r].[NormalizedName]
      FROM [AspNetRoles] AS [r]
      WHERE [r].[NormalizedName] = @__normalizedName_0
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (1ms) [Parameters=[@__normalizedName_0='?' (Size = 256)], CommandType='Text', CommandTimeout='30']
      SELECT TOP(1) [r].[Id], [r].[ConcurrencyStamp], [r].[CreatedAt], [r].[Description], [r].[IPAddress], [r].[Name], [r].[NormalizedName]
      FROM [AspNetRoles] AS [r]
      WHERE [r].[NormalizedName] = @__normalizedName_0
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (0ms) [Parameters=[@__normalizedName_0='?' (Size = 256)], CommandType='Text', CommandTimeout='30']
      SELECT TOP(1) [r].[Id], [r].[ConcurrencyStamp], [r].[CreatedAt], [r].[Description], [r].[IPAddress], [r].[Name], [r].[NormalizedName]
      FROM [AspNetRoles] AS [r]
      WHERE [r].[NormalizedName] = @__normalizedName_0
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (0ms) [Parameters=[@__normalizedName_0='?' (Size = 256)], CommandType='Text', CommandTimeout='30']
      SELECT TOP(1) [r].[Id], [r].[ConcurrencyStamp], [r].[CreatedAt], [r].[Description], [r].[IPAddress], [r].[Name], [r].[NormalizedName]
      FROM [AspNetRoles] AS [r]
      WHERE [r].[NormalizedName] = @__normalizedName_0
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (0ms) [Parameters=[@__normalizedName_0='?' (Size = 256)], CommandType='Text', CommandTimeout='30']
      SELECT TOP(1) [r].[Id], [r].[ConcurrencyStamp], [r].[CreatedAt], [r].[Description], [r].[IPAddress], [r].[Name], [r].[NormalizedName]
      FROM [AspNetRoles] AS [r]
      WHERE [r].[NormalizedName] = @__normalizedName_0
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (0ms) [Parameters=[@__normalizedEmail_0='?' (Size = 256)], CommandType='Text', CommandTimeout='30']
      SELECT TOP(1) [u].[Id], [u].[AccessFailedCount], [u].[ConcurrencyStamp], [u].[Email], [u].[EmailConfirmed], [u].[FirstName], [u].[LastName], [u].[LockoutEnabled], [u].[LockoutEnd], [u].[NormalizedEmail], [u].[NormalizedUserName], [u].[PasswordHash], [u].[PhoneNumber], [u].[PhoneNumberConfirmed], [u].[SecurityStamp], [u].[TwoFactorEnabled], [u].[UserName]
      FROM [AspNetUsers] AS [u]
      WHERE [u].[NormalizedEmail] = @__normalizedEmail_0
info: Microsoft.EntityFrameworkCore.Infrastructure[10403]
      Entity Framework Core 2.0.1-rtm-125 initialized 'ApplicationDbContext' using provider 'Microsoft.EntityFrameworkCore.SqlServer' with options: RowNumberPaging 
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (1ms) [Parameters=[@__normalizedName_0='?' (Size = 256)], CommandType='Text', CommandTimeout='30']
      SELECT TOP(1) [r].[Id], [r].[ConcurrencyStamp], [r].[CreatedAt], [r].[Description], [r].[IPAddress], [r].[Name], [r].[NormalizedName]
      FROM [AspNetRoles] AS [r]
      WHERE [r].[NormalizedName] = @__normalizedName_0
info: Microsoft.EntityFrameworkCore.Infrastructure[10403]
      Entity Framework Core 2.0.1-rtm-125 initialized 'AspergillosisContext' using provider 'Microsoft.EntityFrameworkCore.SqlServer' with options: RowNumberPaging 
ALTER TABLE [CaseReportForms] ADD [IsLocked] bit NOT NULL DEFAULT 0;

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20180327114317_AddIsLockedToCaseReportForms', N'2.0.1-rtm-125');

GO


