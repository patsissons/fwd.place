export function hostParts(url: URL) {
  return url.host.split('.')
}

export function isStaging(url: URL) {
  return (
    hostParts(url).shift() === 'staging' ||
    Boolean(url.searchParams.get('staging'))
  )
}
