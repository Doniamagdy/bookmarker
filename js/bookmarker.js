var bookmarkArray = [];

var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");

if (localStorage.getItem("bookmark") != null) {
  bookmarkArray = JSON.parse(localStorage.getItem("bookmark"));
  displayBookMarker();
}

function getBookmark() {
  var bookMarkObject = {
    Name: siteName.value,
    Url: siteUrl.value,
  };

  if (check1(siteName.value) == true && check2(siteUrl.value) == true) {
    bookmarkArray.push(bookMarkObject);
    clearBookmark();
    localStorage.setItem("bookmark", JSON.stringify(bookmarkArray));
    displayBookMarker();
  } else {
    document.getElementById("alert-box").innerHTML = `
    <div class="alert shadow w-50 p-5 m-auto p-absolute z-3 top-0 ">
            <p class="closebtn" onclick="this.parentElement.style.display='none';">&times;</p> 
            <h4>Site Name or Url is not valid, Please follow the rules below :</h4>
            <ul>
            <li>Site name must contain at least 3 characters</li>
            <li>Site URL must be a valid one</li>
            <li>Kindly close the box and refresh the page</li>
            </ul>
            <div class="d-flex justify-content-end">
            <img src="chameleon.png" class="w-25">
            </div>
          </div>
    
    `;
  }
}

function displayBookMarker() {
  var addNewBookmark = ` `;
  for (var i = 0; i < bookmarkArray.length; i++) {
    addNewBookmark += `<div class="col-sm-6 col-md-6 col-lg-3 my-2 ">
        <div class="shadow text-center p-4 "> 
        <img src="feather.png" class="w-25 m-auto">
<h3 class="p-4 text-white">${bookmarkArray[i].Name}</h3>
<div class="btns p-1">
<button><a href="${bookmarkArray[i].Url}" target="blank">Visit</a></button>
<button  onclick="deleteBookmark(${i})">Delete</button>
    </div>
</div>

</div>`;
  }
  document.getElementById("addNewCard").innerHTML = addNewBookmark;
}

function clearBookmark() {
  siteName.value = " ";
  siteUrl.value = " ";
}

function deleteBookmark(index) {
  bookmarkArray.splice(index, 1);
  localStorage.setItem("bookmark", JSON.stringify(bookmarkArray));
  displayBookMarker();
}

function visitWebsite() {}

function search(search) {
  var addNewBookmark = ` `;
  for (var i = 0; i < bookmarkArray.length; i++) {
    if (bookmarkArray[i].Name.toLowerCase().includes(search.toLowerCase())) {
      addNewBookmark += `<div class="col-sm-6 col-md-6 col-lg-3 my-2 ">
        <div class="shadow text-center p-4"> 
        <img src="feather.png" class="w-25 m-auto">

<h3 class="p-4 text-white">${bookmarkArray[i].Name.replace(
        search,
        `<span>${search}</span>`
      )}</h3>
<div class="btns p-1">
    <button ><a href="${bookmarkArray[i].Url}" target="blank">Visit</a></button>
    <button  onclick="deleteBookmark(${i})">Delete</button>
    </div>
</div>
</div>`;
    }
    document.getElementById("addNewCard").innerHTML = addNewBookmark;
  }
}

function check1(siteName) {
  var regex = /[a-zA-Z0-9]{3,}/;
  if (regex.test(siteName) == true) {
    return true;
  } else {
    return false;
  }
}

function check2(siteUrl) {
  var regax2 =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

  if (regax2.test(siteUrl) == true) {
    return true;
  } else {
    return false;
  }
}
