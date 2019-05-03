const cacheName = 'v1';

/* const cacheAssets = [
	'index.php',
	'test.html',
	'employee-grid-data.php',
	'/css/jquery.dataTables.css',
	'/js/jquery.dataTables.js',
	'/js/jquery.js',
	'main_js.js'
]; */
const cacheAssets = [
	'test.html',
	'about.html',
	'css/jquery.dataTables.css',
	'js/jquery.dataTables.js',
	'js/jquery.js',
	'main_js.js'
];

//Install
self.addEventListener('install',e => {
	console.log('Service Worker: Installed');
	
	e.waitUntil(
		caches
			.open(cacheName)
			.then(cache => {
				console.log('Service Worker: Caching Files');
				cache.addAll(cacheAssets);
			})
			.then(() => self.skipWaiting())
	);
});

//activate
self.addEventListener('activate',e => {
	console.log('Service Worker: Activated');
	
	//clear old chache
	e.waitUntil(
		caches.keys().then(cacheNames => {
			return Promise.all(
				cacheNames.map(cache => {
					if(cache !== cacheName){
						console.log('Service Worker: Clearing old Cache');
						return caches.delete(cache);
					}	
				})
			);
		})	
	);
});

//fetch events
self.addEventListener('fetch', e => {
	console.log('Service Worker: Fetching');
	e.respondWith(
		fetch(e.request).catch(() => caches.match(e.request))
	)
})