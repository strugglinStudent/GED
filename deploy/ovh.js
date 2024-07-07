const argv = [];
process.argv.forEach((val, index) => {
  argv[index] = val;
});
const subDomain = argv[2];
const ovh = require('ovh')({
  appKey: process.env.OVH_APP_KEY,
  appSecret: process.env.OVH_APP_SECRET,
  consumerKey: process.env.OVH_CONSUMER_KEY
});

(async () => {
  try {
    const findDomainRecord = await ovh.requestPromised('GET', `/domain/zone/tic-nova.com/record?fieldType=A&subDomain=${subDomain}`);
    if(findDomainRecord && findDomainRecord.length === 0) {
      const domainRecord = await ovh.requestPromised('POST', `/domain/zone/tic-nova.com/record`, {
          target: process.env.VAR_SERVER,
          fieldType: 'A',
          subDomain: subDomain
        }
      );
      console.info(`${subDomain}: `, domainRecord);
      const refreshZone = await ovh.requestPromised('POST', '/domain/zone/tic-nova.com/refresh');
      console.info('tic-nova.com: ', refreshZone);
    } else {
      console.warn(`${subDomain} subdomain exists`)
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
})();
