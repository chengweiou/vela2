const host = process.env.VUE_APP_HOST
const wsHost = process.env.VUE_APP_HOST_WS

const site = {

  carina: `${host}:55555/carina`,
  carinaWs: `${wsHost}:55555/carina`,
}

export default site
