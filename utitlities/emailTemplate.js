exports.createWelcomeEmailTemplate = (name,client_url)=>{
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
     <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Desserts Factory</title>
    </head>
    <body style="
    font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;"
    >
    <main style="background-color: #ded6e9ff">
    <h1>Welcome to Desserts Fcatory</h1>
    <div>
    <h1>Hello ${name},</h1>
    <p>We are thrilled to have you join us!</p>
     <div style="text-align: start; margin: 30px 0">
          <a
            href="${client_url}"
            style="
              background-color: #9747ff;
              color: white;
              padding: 14px 38px;
              text-decoration: none;
              border-radius: 10px;
              font-weight: bold;
              font-size: 16px;
              transition: background-color 0.3s;
            "
            >log in</a
          >
        </div>
    </div>
    </main>
    </body>
    </html>`
}