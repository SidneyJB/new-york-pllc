export function wrapEmailHtml(content: string): string {
  const leftAlignedContent = content
    .replace(/<p>/g, '<p style="text-align: left; margin: 0 0 1em 0;">')
    .replace(/<ul>/g, '<ul style="text-align: left; margin: 0 0 1em 0; padding-left: 20px;">')
    .replace(/<ol>/g, '<ol style="text-align: left; margin: 0 0 1em 0; padding-left: 20px;">')
    .replace(/<li>/g, '<li style="text-align: left; margin-bottom: 0.5em;">')

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email</title>
  <style>html,body{margin:0!important;padding:0!important}</style>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f1f5f9;">
  <tr>
    <td align="center" style="padding:24px 12px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:640px;">
        <tr>
          <td style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;line-height:1.6;color:#334155;text-align:left;">
${leftAlignedContent}
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`
}
