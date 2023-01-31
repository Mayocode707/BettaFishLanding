/**Se separa la URL de la API para tener un mejor manejo del código. */
const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCuak-ljvKqWzwwbXXHXvVsA&part=snippet%2Cid&order=date&maxResults=9';

const content = null || document.getElementById('content');//Se hace referencia a la etique a la uqe se le van a enviar los datos de la API


//Parte del código de la API de youtube
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '2bf2764574msh19d4f8e7c50c163p11e073jsna84707fef8e6',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

//FUnción asincrona para realizar la consulta a la API

async function fetchData(urlApi) {
    const response = await fetch(urlApi, options);
    const data = await response.json();
    return data;
}


/**Función anonima la cual va a enviar los datos obtenidos de la API y organizados en HTML para 
 * poder visualizarlos correctamente en la página principal. Las propiedades mostradas son las que 
 * pertenecen a la API de youtube y estan en la documentación de la misma.
 */
(async () => {
    try {
        const videos = await fetchData(API);
        let view = `
        ${videos.items.map(video => `
            <div class="group relative">
                <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                    <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
                </div>
            <div class="mt-4 flex justify-between">
                <h3 class="text-sm text-gray-200">
                <a href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank"><span aria-hidden="true" class="absolute inset-0"></span></a>
                ${video.snippet.title}
                </h3>
            </div>
            </div>
        `).slice(0,4).join('')}
            `;
            content.innerHTML = view; //Se envía la consulta organizada con HTML a la página principal.
    } catch (error){
        console.log(error);

    }
})();