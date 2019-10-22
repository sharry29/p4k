// import * as d3 from 'd3'
// import autoComplete from 'autocomplete'

// document
// 	.querySelector('#autoComplete')
// 	.addEventListener('autoComplete', function(event) {
// 		console.log(event.detail)
// 		// console.log(autoCompletejs);
// 	})

// const acjs = autoComplete({
// 	data: {
// 		src: function() {
// 			console.log('hello')
// 		},
// 		//d3.csv(require('../data/artist_counts.csv'))
// 		key: ['artist']
// 	},
// 	// query: {
// 	//   // Query Interceptor               | (Optional)
// 	//   manipulate: query => {
// 	//     return query.replace('pizza', 'burger')
// 	//   }
// 	// },
// 	sort: (a, b) => {
// 		// Sort rendered results ascendingly | (Optional)
// 		if (a.artist < b.artist) return -1
// 		if (a.artist > b.artist) return 1
// 		return 0
// 	},
// 	placeHolder: 'Drake', // Place Holder text                 | (Optional)
// 	selector: '#autoComplete', // Input field selector              | (Optional)
// 	threshold: 2, // Min. Chars length to start Engine | (Optional)
// 	debounce: 300, // Post duration for engine to start | (Optional)
// 	searchEngine: 'strict', // Search Engine type/mode           | (Optional)
// 	// resultsList: {
// 	//   // Rendered results list object      | (Optional)
// 	//   render: true,
// 	//   container: source => {
// 	//     const resultsListID = 'food_List'
// 	//     return resultsListID
// 	//   },
// 	//   destination: document.querySelector('#artistSelect'),
// 	//   position: 'afterend',
// 	//   element: 'ul'
// 	// },
// 	maxResults: 5, // Max. number of rendered results | (Optional)
// 	highlight: true, // Highlight matching results      | (Optional)
// 	// resultItem: {
// 	//   // Rendered result item            | (Optional)
// 	//   content: (data, source) => {
// 	//     source.innerHTML = data.match
// 	//   },
// 	//   element: 'li'
// 	// },
// 	// noResults: () => {
// 	//   // Action script on noResults      | (Optional)
// 	//   const result = document.createElement('li')
// 	//   result.setAttribute('class', 'no_result')
// 	//   result.setAttribute('tabindex', '1')
// 	//   result.innerHTML = 'No Results'
// 	//   document.querySelector('#autoComplete_results_list').appendChild(result)
// 	// },
// 	onSelection: feedback => {
// 		// Action script onSelection event | (Optional)
// 		console.log(feedback.selection.value.image_url)
// 	}
// })
