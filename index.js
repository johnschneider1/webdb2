const server = require("./api/server.js");

const port = process.env.PORT || 5250;
server.listen(port, () =>
  console.log(`\n** API Up and Running on port ${port} **\n`)
);
