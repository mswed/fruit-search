const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];
let selectedIdx = -1;

function search(str) {
    // Convert search string to lowercase
    const lowerCaseSearch = str.toLowerCase()

    return fruit.filter((item) => {
        // Convert fruit item to lowercase
        const lowerCaseItem = item.toLowerCase();
        // Add fruit to result if the search string is found
        return lowerCaseItem.indexOf(lowerCaseSearch) !== -1 && lowerCaseSearch !== '';
    });
}

function searchHandler(e) {
    if (e.code === 'ArrowDown') {
        highlightItemWithKeys('down');
    } else if (e.code === 'ArrowUp') {
        highlightItemWithKeys('up');
    } else if (e.code === 'Enter' && selectedIdx !== -1) {
        useSuggestion('enter')
    } else {
        // Filter the fruit list
        let results = search(input.value)
        // Add the results to the dropdown
        showSuggestions(results, input.value)
    }
}

function clearHighlights() {
    // Remove the highlights from the list
    for (let child of [...suggestions.children]) {
        child.id = '';
    }
}

function highlightItemWithMouse(e) {
    // Highlight  the item under the cursor
    if (suggestions.childElementCount > 0) {
        clearHighlights()
        selectedIdx = [...suggestions.children].indexOf(e.target)
        e.target.id = 'highlight';
    }

}

function highlightItemWithKeys(direction) {
    // Highlight an item based on keyboard selection
    // We only run if we actually have something in the list
    if (suggestions.childElementCount > 0) {
        if (direction === 'down') {
            if (selectedIdx < suggestions.childElementCount - 1) {
                selectedIdx++;
            } else {
                selectedIdx = 0;
            }

        } else if (direction === 'up') {
            if (selectedIdx > 0) {
                selectedIdx--
            } else {
                selectedIdx = suggestions.childElementCount - 1
            }
        }
        clearHighlights()
        suggestions.children[selectedIdx].id = 'highlight';
    }

}

function showSuggestions(results) {
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
    // Move the selection into the input
    if (suggestions.childElementCount > 0) {
        input.value = suggestions.children[selectedIdx].innerText
        selectedIdx = 0;
    }

    input.blur()
    // Clear the suggestions list
    suggestions.innerHTML = '';
}


input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);
suggestions.addEventListener('mouseover', highlightItemWithMouse)