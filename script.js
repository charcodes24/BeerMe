let findBrew = document.getElementById('find-brew');
let pageOne = document.querySelector('.page-one')
let pageTwo = document.querySelector(".page-two")
let pageThree = document.querySelector(".page-three")
let pageFour = document.querySelector(".page-four")
let pageFive = document.querySelector(".page-five")

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
    alert(`Sorry! Might wanna find something else to do. You won't be able to enjoy a delicious beer anyways.`)
})

//event listener for if yes is clicked on are you 21 or over?
let yesButton = document.getElementById('yes');
yesButton.addEventListener('click', () => {
    pageTwo.style.display = 'none';
    pageThree.style.display = 'block';
})


//PAGE 3
//create function to pass into fetch that creates html elements for each brewery and appends to page
let listContainer = document.querySelector('.list-container')
function createBreweryElements(element) {
    let breweryList = document.createElement('li');
    breweryList.innerHTML = element.name
    listContainer.append(breweryList);
}
let form = document.getElementById('zip-code-form');
let zipcodeInput = document.getElementById('zip-code')
form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(`i've been submitted`)
    pageThree.style.display = 'none'
    pageFour.style.display = 'block'
    let postalCode = zipcodeInput.value
    console.log(postalCode)
    fetch(`https://api.openbrewerydb.org/breweries?by_postal=${postalCode}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            for (element of data) {
                createBreweryElements(element)
            }

        })
    
});
