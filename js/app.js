/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

//#region ==============  Define Global Variables

// Make a variable to contain (AllSections)
const allMySections = document.querySelectorAll('section');

// make a variable to add links to the (ul) (id="navbar__list") using (getElementById())
const allMyUl = document.getElementById('navbar__list');


// Create the document fragment, append elements or (li) to the document fragment and then append the document fragment to the DOM tree, in order to maintain a good performance.
const docFragment = document.createDocumentFragment();

 //#endregion ==============  Define Global Variables


//#region  ================   Start Helper Functions



// Scroll to anchor ID using scrollTO event. Make an (Event Listener) using (scrollIntoView()) to allow us scroll smoothly to the appropriate Section when I "Click" its "Link". 
// When clicking an item from the navigation menu, the link should scroll smoothly to the  section.    
function scrollSmoothly(x, myLink){
    myLink.addEventListener("click", ()=> {
        x.scrollIntoView({behavior: "smooth"});
    });
}

// Suggestions to Make Your Project Stand Out! 
// 1- Add an active state to your navigation items when a section is in the viewport: 
// Using For Loop to examine each Link in the nav bar menu and using If Condition to check which one carries the same ("data-nav") of the currentActiveSec:
function activeStatetoNavBar(y){
    // Define Data Nav of the Active Section:
    const dataNavActiveSec = y.getAttribute("data-nav");
    // Make a variable to contain (AllLinks) in the Nav Bar
    const allMyLinks = document.querySelectorAll("a");
    // Use forEach to look inside each link of them
    allMyLinks.forEach( (oneLink)=>{
        if (oneLink.innerText === dataNavActiveSec){
            oneLink.classList.add("active-state");
        }
        else if (oneLink.classList.contains("active-state")) {
            oneLink.classList.remove("active-state");
        }
    });
}


//#endregion  ==============  End Helper Functions

//#region ==================  Begin Main Functions

//#region  build the nav
// ForEach section, I create a Link & li & change its Text to take the ('data-nav') of this section
allMySections.forEach( (x)=> {
    let myLink = document.createElement('a');
    let myText = x.getAttribute('data-nav');
    
    // Call a function to give this link a class with (padding, black color and block display), otherwise words appears with the color of the background and stick to each other without padding in between
    myLink.classList.add("menu__link");

    // Add the Text content to the Link
    //  //  // let myTextNode = document.createTextNode(myText);
    myLink.textContent = myText;
    let myLi = document.createElement('li');
    //  //  // Append this TextNode to the Link
    //  //  // myLink.appendChild(myTextNode);
    // Append (mylink) to (myli)
    myLi.appendChild(myLink);

    // Scroll to anchor ID using scrollTO event
    scrollSmoothly(x, myLink);

    // Append (myli) to Fragment to maintain a good performance.
    docFragment.appendChild(myLi);
});
// And Finally I append (Fragment) to (allMyUl)
allMyUl.appendChild(docFragment);

//#endregion  build the nav

//#region Active Section
// Add class 'active' to section when near top of viewport
// It should be clear which section is being viewed while scrolling through the page.
// I can determine the Active Section based on the (Scrolling) of the user= addEventListener(scroll), then I apply forEach on all sections and apply also (getBoundingClientRect) on each section, and explore if the Top of this section is my Active Section.
// 
window.addEventListener("scroll", ()=> {
    allMySections.forEach( (currentActiveSec)=>{
        const elementDimension = currentActiveSec.getBoundingClientRect();

        // When we find the Active Section, remove (class="your-active-class") from all sections, and give only the Active Section a (class="your-active-class")
        // Firstly, find the Active Section. I assumed that its Top Edge would be between 0 ~ 300 px so it would be responsive as we change our screen size it would be restricted to this condition.
        if (elementDimension.top> 0 && elementDimension.top< 30) {
            
            // Secondly, make a For Loop + If Condition to remove (class="your-active-class") if exists from all sections
            allMySections.forEach( ( sec)=>{
                if (sec.classList.contains("your-active-class")) {
                sec.classList.remove("your-active-class");
                }
            });
            
            // Lastly, Call a function to give only the Active Section a (class="your-active-class")
            currentActiveSec.classList.add("your-active-class");
            
            // Suggestions to Make Your Project Stand Out! 
            // 1- Add an active state to your navigation items when a section is in the viewport.
            activeStatetoNavBar(currentActiveSec);
            
        }
    });
});


//#endregion Active Section

//#endregion ==============  End Main Functions

//#region  Suggestions to Make Your Project Stand Out!
// 2- Add a scroll to top button on the page that’s only visible when the user scrolls below the fold of the page.
const btn = document.createElement("BUTTON");
btn.innerHTML = "Top";
// Add this btn to the body
document.body.appendChild(btn);
// Give id to this btn
btn.setAttribute("id", "upBtn");
// Make some styles for our btn
document.getElementById("upBtn").style.cssText = "display: none; position: fixed; background-color: red; cursor: pointer; bottom: 10px; right: 10px";
// If user scroll down we will show our button to allow him/her scroll Top again
window.addEventListener("scroll", ()=> {
    // We have to use Two conditions:  (document.body.scrollTop ==== For Safari    ||  document.documentElement.scrollTop === For Chrome, Firefox, IE and Opera)
    if (document.body.scrollTop > 35 || document.documentElement.scrollTop > 35){
    document.getElementById("upBtn").style.display = "block";
    }
    else {
        document.getElementById("upBtn").style.display = "none";
    }
})
// Tell btn to (Scroll Smoothly) to the Top when user clicks on it:
btn.addEventListener("click", ()=>{
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    
    // // // const chro = document.documentElement.scrollTop = 0;
    // // // scrollSmoothly(chro, btn);
    // // // const saf = document.body.scrollTop = 0;
    // // // scrollSmoothly(saf, btn);
})


//#endregion Suggestions to Make Your Project Stand Out!
