const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

function search(str) {
	// Convert search string to lowercase
	const lowerCaseSearch = str.toLowerCase()

	let results =  fruit.filter((item) => {
		// Convert fruit item to lowercase
		const lowerCaseItem = item.toLowerCase();
		// Add fruit to result if the search string is found
		return lowerCaseItem.indexOf(lowerCaseSearch) !== -1 && lowerCaseSearch !== '';
	});
	// console.log('new results', results)
	return results;
}

function searchHandler(e) {
	console.log('Calling searchHandler()')
	// Filter the fruit list
	let results = search(input.value)
	// Add the results to the dropdown
	showSuggestions(results, input.value)


}

function showSuggestions(results, inputVal) {
	// Clear the list
	suggestions.innerHTML = '';
	for (let fruit of results) {
		// Create list item
		const li = document.createElement('li');
		li.innerText = fruit;
		suggestions.append(li)
	}
	if (suggestions.childElementCount > 0) {
		suggestions.classList.add('has-suggestions')
	} else {
		suggestions.classList.remove('has-suggestions')
	}
}

function useSuggestion(e) {
	input.value = e.target.innerText;
	suggestions.innerHTML = '';
}

input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);