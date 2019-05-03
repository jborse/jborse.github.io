if('serviceWorker' in navigator)
{
	//console.log('Service Worker Supported');
	window.addEventListener('load',()=>{
		navigator.serviceWorker
			.register('sw_page_cache.js')
			.then(reg => console.log('Service Worker: Registered'))
			.catch(err => console.log(`Service Worker: Error: ${err}`))
	})
}