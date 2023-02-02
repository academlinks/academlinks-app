export function windowLocation() {
  const { pathname } = window.location;
  const urlFragments = pathname.split('/');
  const root = urlFragments[1];
  const identifier = urlFragments[2];
  const path = pathname;

  return { root, identifier, path };
}

export function allowNewPostSet(activeUserId) {
  const { root, identifier, path } = windowLocation();
  if (
    root === 'feed' ||
    (root === 'profile' && path.endsWith('posts') && identifier === activeUserId)
  )
    return true;
}

export function isRoute(route) {
  const { pathname } = window.location;
  const urlFragments = pathname.split('/');
  const endPoint = urlFragments[urlFragments.length - 1];
  return endPoint === route;
}
