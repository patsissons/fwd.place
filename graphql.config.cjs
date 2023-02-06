const kitqlConfig = require('@kitql/all-in/cjs.cjs')

const scalars = {
  DateTime: 'Date',
}

/** @type {import('@kitql/all-in').KitQLProjects} */
const config = {
  projects: {
    default: kitqlConfig({
      scalars,
    }),
  },
}

module.exports = config
