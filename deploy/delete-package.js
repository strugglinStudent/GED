const https = require('https');

const version = 'VERSION-CI';
if(version){
  const options = {
    hostname: 'gitlab.com',
    port: 443,
    path: `/api/v4/projects/${process.env.CI_PROJECT_ID}/packages?per_page=100&sort=desc`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'PRIVATE-TOKEN': `${process.env.ACCESS_TOKEN}`,
    },
  };
  const req = https.request(options, (res) => {
    console.info(`statusCode: ${res.statusCode}`);
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      if (res.statusCode !== 200) {
        console.error(data);
        throw new Error(`res.statusCode: ${res.statusCode}`);
      }
      const packages = JSON.parse(data);
      console.info(version);
      const pack = packages.find((e) => e.version === version);
      console.info(pack ? pack.id : null);
      if (pack && pack.id) {
        options.path = `/api/v4/projects/${process.env.CI_PROJECT_ID}/packages/${pack.id}`;
        options.method = 'DELETE';
        const reqDelete = https.request(options, (resDelete) => {
          console.info(`statusCode: ${resDelete.statusCode}`);
          if (resDelete.statusCode === 204) {
            console.info(`Deleted ${pack.id} done of ${version}`);
          }
        });

        reqDelete.on('error', (error) => {
          console.error(error);
        });

        return reqDelete.end();
      }
    });
  });

  req.on('error', (error) => {
    console.error(error);
  });

  req.end();

}
