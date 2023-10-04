const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];
let currentSelectionIdx = -1;
let currentSelectionValue = '';

function search(str) {
	// Convert search string to lowercase
	const lowerCaseSearch = str.toLowerCase()

	let results =  fruit.filter((item) => {
		// Convert fruit item to lowercase
		const lowerCaseItem = item.toLowerCase();
		// Add fruit to result if the search string is found
		return lowerCaseItem.indexOf(lowerCaseSearch) !== -1 && lowerCaseSearch !== '';
	});
	return results;
}

function searchHandler(e) {
	if (e.code === 'ArrowDown') {
		highlightItemWithKeys('down');
	} else if (e.code === 'ArrowUp') {
		highlightItemWithKeys('up');
	} else if (e.code === 'Enter' && currentSelectionIdx !== -1) {
		useSuggestion('enter')
	} else {
		// Filter the fruit list
		let results = search(input.value)
		// Add the results to the dropdown
		showSuggestions(results, input.value)
	}
}

function cleanHighlights() {
	for (let child of [...suggestions.children]) {
		child.id = '';
	}
}
function highlightItemWithMouse(e) {
	if (suggestions.childElementCount > 0) {
		cleanHighlights()
		currentSelectionIdx = [...suggestions.children].indexOf(e.target)
		e.target.id = 'key-hover';
	}

}
function highlightItemWithKeys(direction) {
	// We only run if we actually have something in the list
	if (suggestions.childElementCount > 0) {
		if (direction === 'down') {
			if (currentSelectionIdx < suggestions.childElementCount - 1) {
				currentSelectionIdx++;
			} else {
				currentSelectionIdx = 0;
			}

		} else if (direction === 'up') {
			if (currentSelectionIdx > 0) {
				currentSelectionIdx--
			} else {
				currentSelectionIdx = suggestions.childElementCount - 1
			}
		}
		cleanHighlights()
		suggestions.children[currentSelectionIdx].id = 'key-hover';
	}

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
	if (suggestions.childElementCount > 0) {
		if (typeof e === "object") {
			// Set the field input
			input.value = e.target.innerText;
		} else {
			input.value = suggestions.children[currentSelectionIdx].innerText
			currentSelectionIdx = 0;
		}

		// Clear the suggestions list
		suggestions.innerHTML = '';
	}

}

input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);
suggestions.addEventListener('mouseover', highlightItemWithMouse)