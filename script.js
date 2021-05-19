let findBrew = document.getElementById('find-brew');
let pageOne = document.querySelector('.page-one')
let pageTwo = document.querySelector(".page-two")
let pageThree = document.querySelector(".page-three")
let pageFour = document.querySelector(".page-four")
let pageFive = document.querySelector(".page-five")

//BACK BUTTON FUNCTIONALITY
//declare variables for each back button
let backButtonTwo = document.getElementById('two');
let backButtonThree = document.getElementById('three');
let backButtonFour = document.getElementById('four');
//declare go back function
function goBack(e) {
    if (e.target.id === 'two') {
        pageOne.style.display = 'block';
        pageTwo.style.display = 'none';
    } else if (e.target.id === 'three') {
        pageTwo.style.display = 'block';
        pageThree.style.display = 'none';
    } else if (e.target.id === 'four') {
        pageThree.style.display = 'block';
        pageFour.style.display = 'none';
    }
};

//add event listeners to each back button
backButtonTwo.addEventListener('click', e => goBack(e));
backButtonThree.addEventListener('click', e => goBack(e));
backButtonFour.addEventListener('click', function(e) {
    goBack(e);
    clearPage(breweryContainer);
});

//clear page if back button is used and new zipcode is submitted
function clearPage(breweryContainer) {
    while (breweryContainer.firstChild) {
        breweryContainer.removeChild(breweryContainer.firstChild)
    }
}


//PAGE 1
//event listener for find brewery button
findBrew.addEventListener('click', () => {
    pageOne.style.display = 'none';
    pageTwo.style.display = 'block';

})



//PAGE 2
//event listener for if no is clicked on are you 21 or over?
let noButton = document.getElementById('no');
noButton.addEventListener('click', () => {
    alert(`No beer for you!`)
})

//event listener for if yes is clicked on are you 21 or over?
let yesButton = document.getElementById('yes');
yesButton.addEventListener('click', () => {
    pageTwo.style.display = 'none';
    pageThree.style.display = 'block';
})


//PAGE 3
//create function to pass into fetch that creates html elements for each brewery and appends to page
let breweryContainer = document.querySelector('.breweries-container')
function createBreweryElements(element) {
    let breweryCard = document.createElement('div');
    breweryCard.classList.add('card')
    let beerImage = document.createElement('img');
    beerImage.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGb4gL4R65-Z0ash_Bn-p2lwNSx4iFPTm6zw&usqp=CAU"
    beerImage.className = 'beer-bottle'
    let breweryName = document.createElement('h2');
    breweryName.innerHTML = element.name;
    let address = document.createElement('p');
    if (element.street === null) {
        address.innerHTML = `There is no address for this brewery in our database.`
    } else {
    address.innerHTML = element.street;
    };
    let cityState = document.createElement('p');
    cityState.innerHTML = `${element.city}, ${element.state}`
    breweryCard.append(beerImage, breweryName, address, cityState);
    breweryContainer.append(breweryCard);
}

//create elements to let user know there are no breweries in database for that zipcode
function noBreweriesForZipcode() {
    let noBreweries = document.createElement('h1');
    noBreweries.innerHTML = "Sorry there are no breweries for that zipcode in our database.";
    breweryContainer.append(noBreweries)
}

let form = document.getElementById('zip-code-form');
let zipcodeInput = document.getElementById('zip-code')
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let postalCode = zipcodeInput.value
    if (isNaN(postalCode)) {
        alert(`Please enter a valid 5-digit zipcode.`);
        form.reset();
    }else {
        fetch(`https://api.openbrewerydb.org/breweries?by_postal=${postalCode}`)
        .then(res => res.json())
        .then(data => {
            if (data.length === 0) {
                noBreweriesForZipcode();
        }
            for (element of data) {
                createBreweryElements(element)
            }
            pageThree.style.display = 'none';
            pageFour.style.display = 'block';
            form.reset();
        });
}});
