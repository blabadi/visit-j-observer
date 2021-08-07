const fetch = require('node-fetch').default;
const jsdom = require("jsdom");

async function main() {
  const resp = await fetch('https://www.visitjordan.gov.jo/landplatform/ar');
  const content = await resp.text();
  const dom = new jsdom.JSDOM(content);
  const jq = require("jquery")(dom.window);
  const cp = jq("#ddlCrossingpoint").html();
  console.log(cp);
  const count = jq("#ddlCrossingpoint option").length;
  if (count <= 4) {
    console.log('not yet');
  } else {
    console.log('NOW !!!!!!!');
    fetch(process.env.SLACK_URL, {
      method: 'POST',
      body: JSON.stringify({
        "text": " <@basharlabadi> فتحت يا كبيير"
      })
    })
  }
}

main()
